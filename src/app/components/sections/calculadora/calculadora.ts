import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type RiskLevel = 'bajo' | 'moderado' | 'alto';

interface RiskResult {
  readonly level: RiskLevel;
  readonly label: string;
  readonly score: number;
  readonly maxScore: number;
  readonly advice: string;
}

@Component({
  selector: 'app-calculadora',
  imports: [FormsModule],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calculadora {
  protected readonly age = signal<number | null>(null);
  protected readonly heightCm = signal<number | null>(null);
  protected readonly weightKg = signal<number | null>(null);
  protected readonly familyHistory = signal<'no' | 'second' | 'first'>('no');
  protected readonly activity = signal<'regular' | 'low' | 'sedentary'>('regular');
  protected readonly bloodPressure = signal<'normal' | 'high' | 'unknown'>('normal');

  protected readonly bmi = computed<number | null>(() => {
    const h = this.heightCm();
    const w = this.weightKg();
    if (!h || !w || h <= 0) return null;
    const m = h / 100;
    return Number((w / (m * m)).toFixed(1));
  });

  protected readonly result = computed<RiskResult | null>(() => {
    const age = this.age();
    const bmi = this.bmi();
    if (age === null || bmi === null) return null;

    let score = 0;

    if (age < 45) score += 0;
    else if (age < 55) score += 2;
    else if (age < 65) score += 3;
    else score += 4;

    if (bmi < 25) score += 0;
    else if (bmi < 30) score += 1;
    else if (bmi < 35) score += 2;
    else score += 3;

    switch (this.familyHistory()) {
      case 'no':
        score += 0;
        break;
      case 'second':
        score += 2;
        break;
      case 'first':
        score += 4;
        break;
    }

    switch (this.activity()) {
      case 'regular':
        score += 0;
        break;
      case 'low':
        score += 1;
        break;
      case 'sedentary':
        score += 2;
        break;
    }

    switch (this.bloodPressure()) {
      case 'normal':
        score += 0;
        break;
      case 'high':
        score += 2;
        break;
      case 'unknown':
        score += 1;
        break;
    }

    const maxScore = 4 + 3 + 4 + 2 + 2;
    const ratio = score / maxScore;

    let level: RiskLevel;
    let label: string;
    let advice: string;

    if (ratio < 0.3) {
      level = 'bajo';
      label = 'Riesgo bajo';
      advice =
        'Tus hábitos parecen alineados con un riesgo bajo. Mantén una alimentación balanceada, actividad física regular y controles médicos anuales.';
    } else if (ratio < 0.6) {
      level = 'moderado';
      label = 'Riesgo moderado';
      advice =
        'Hay factores que conviene vigilar. Incrementa la actividad física, reduce azúcares añadidos y agenda un control de glucosa en ayunas con tu médico.';
    } else {
      level = 'alto';
      label = 'Riesgo alto';
      advice =
        'Varios indicadores están elevados. Te recomendamos consultar a un profesional de salud a la brevedad para una evaluación completa y plan de prevención.';
    }

    return { level, label, score, maxScore, advice };
  });

  protected readonly canCalc = computed(
    () => this.age() !== null && this.bmi() !== null,
  );

  protected reset(): void {
    this.age.set(null);
    this.heightCm.set(null);
    this.weightKg.set(null);
    this.familyHistory.set('no');
    this.activity.set('regular');
    this.bloodPressure.set('normal');
  }
}
