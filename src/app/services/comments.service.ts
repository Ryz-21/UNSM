import { Injectable, signal } from '@angular/core';

export interface HelpComment {
  id: number;
  name: string;
  message: string;
  at: Date;
}

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private nextId = 4;
  readonly comments = signal<HelpComment[]>([
    {
      id: 1,
      name: 'María G.',
      message:
        '¿Alguien conoce recetas bajas en carbohidratos para el almuerzo? Acepto sugerencias.',
      at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      id: 2,
      name: 'Carlos R.',
      message:
        'Empecé a caminar 30 minutos al día y mis niveles de glucosa en ayunas bajaron 15 mg/dL en un mes.',
      at: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: 3,
      name: 'Lucía P.',
      message:
        '¿Cómo manejan la hipoglucemia nocturna? A veces me despierto con temblores y sudoración.',
      at: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
  ]);

  add(name: string, message: string): boolean {
    const cleanName = name.trim();
    const cleanMsg = message.trim();
    if (!cleanName || !cleanMsg) return false;

    this.comments.update((list) => [
      {
        id: this.nextId++,
        name: cleanName,
        message: cleanMsg,
        at: new Date(),
      },
      ...list,
    ]);
    return true;
  }
}
