import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
  id: number;
  author: 'user' | 'bot';
  text: string;
  at: Date;
}

@Injectable({ providedIn: 'root' })
export class AssistantService {
  private nextId = 2;
  readonly messages = signal<ChatMessage[]>([
    {
      id: 1,
      author: 'bot',
      text:
        'Hola, soy tu asistente sobre diabetes. Puedo orientarte sobre alimentación, ejercicio, medicación y señales de alerta. ¿En qué te ayudo?',
      at: new Date(),
    },
  ]);

  private readonly canned: Array<{ keywords: string[]; reply: string }> = [
    {
      keywords: ['hola', 'buenas', 'saludos'],
      reply: '¡Hola! ¿Quieres información sobre alimentación, ejercicio o síntomas de alerta?',
    },
    {
      keywords: ['aliment', 'comida', 'dieta', 'comer'],
      reply:
        'Una alimentación equilibrada para personas con diabetes prioriza verduras, legumbres, proteínas magras y cereales integrales. Reduce azúcares añadidos y controla las porciones de carbohidratos.',
    },
    {
      keywords: ['ejercicio', 'actividad', 'caminar', 'deporte'],
      reply:
        'Se recomienda al menos 150 minutos semanales de actividad moderada (caminatas, bicicleta, natación). Mide tu glucosa antes y después si usas insulina.',
    },
    {
      keywords: ['sinto', 'sintoma', 'síntoma', 'alerta', 'mareo', 'sed'],
      reply:
        'Síntomas de alerta: sed excesiva, orina frecuente, visión borrosa, fatiga, heridas que no cicatrizan. Si tienes glucosa muy alta o muy baja, acude a urgencias.',
    },
    {
      keywords: ['medic', 'insulina', 'metformina', 'pastilla'],
      reply:
        'Toma tus medicamentos según indicación médica. No ajustes dosis por tu cuenta. Si presentas hipoglucemia (sudor, temblor, hambre súbita), toma 15 g de azúcar rápida.',
    },
    {
      keywords: ['glucosa', 'azucar', 'azúcar', 'glucometro', 'glucometro'],
      reply:
        'Mide tu glucosa en ayunas y 2 horas después de comer. Registra los valores y compártelos con tu médico en cada control.',
    },
  ];

  send(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: this.nextId++,
      author: 'user',
      text: trimmed,
      at: new Date(),
    };

    this.messages.update((list) => [...list, userMsg]);

    const lower = trimmed.toLowerCase();
    const found = this.canned.find((entry) =>
      entry.keywords.some((k) => lower.includes(k)),
    );

    const reply = found
      ? found.reply
      : 'Aún estoy en fase de prueba. Pronto podré darte respuestas más completas. Por ahora te recomiendo consultar con tu médico o usar la calculadora de riesgo de la página.';

    const botMsg: ChatMessage = {
      id: this.nextId++,
      author: 'bot',
      text: reply,
      at: new Date(),
    };

    setTimeout(() => {
      this.messages.update((list) => [...list, botMsg]);
    }, 500);
  }
}
