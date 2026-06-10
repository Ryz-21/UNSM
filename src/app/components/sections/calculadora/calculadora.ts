import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ficha } from '../ficha/ficha';
import { PatientDataService } from '../../../services/patient-data.service';

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
  imports: [FormsModule, Ficha],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calculadora {
  private readonly router = inject(Router);
  private readonly patientService = inject(PatientDataService);
  protected readonly showInfo = signal(false);

  protected readonly name = signal('');
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
      case 'no': score += 0; break;
      case 'second': score += 2; break;
      case 'first': score += 4; break;
    }

    switch (this.activity()) {
      case 'regular': score += 0; break;
      case 'low': score += 1; break;
      case 'sedentary': score += 2; break;
    }

    switch (this.bloodPressure()) {
      case 'normal': score += 0; break;
      case 'high': score += 2; break;
      case 'unknown': score += 1; break;
    }

    const maxScore = 4 + 3 + 4 + 2 + 2;
    const ratio = score / maxScore;

    let level: RiskLevel;
    let label: string;
    let advice: string;

    if (ratio < 0.3) {
      level = 'bajo';
      label = 'Riesgo bajo';
      advice = 'Tus hábitos parecen alineados con un riesgo bajo. Mantén una alimentación balanceada, actividad física regular y controles médicos anuales.';
    } else if (ratio < 0.6) {
      level = 'moderado';
      label = 'Riesgo moderado';
      advice = 'Hay factores que conviene vigilar. Incrementa la actividad física, reduce azúcares añadidos y agenda un control de glucosa en ayunas con tu médico.';
    } else {
      level = 'alto';
      label = 'Riesgo alto';
      advice = 'Varios indicadores están elevados. Te recomendamos consultar a un profesional de salud a la brevedad para una evaluación completa y plan de prevención.';
    }

    return { level, label, score, maxScore, advice };
  });

  protected readonly canCalc = computed(
    () => this.age() !== null && this.bmi() !== null,
  );

  constructor() {
    effect(() => {
      const r = this.result();
      const name = this.name();
      const age = this.age();
      const bmi = this.bmi();
      const height = this.heightCm();
      const weight = this.weightKg();

      if (!r || age === null || bmi === null || height === null || weight === null) {
        return;
      }

      const ageRange =
        age < 45 ? 'Menor de 45 años' :
        age < 55 ? '45 – 54 años' :
        age < 65 ? '55 – 64 años' :
        '65 años o más';

      const bmiCategory =
        bmi < 18.5 ? 'Bajo peso' :
        bmi < 25 ? 'Normal' :
        bmi < 30 ? 'Sobrepeso' :
        'Obesidad';

      const familyLabel =
        this.familyHistory() === 'no' ? 'No' :
        this.familyHistory() === 'second' ? 'Sí (tíos o abuelos)' :
        'Sí (padres o hermanos)';

      const activityLabel =
        this.activity() === 'regular' ? 'Regular (≥ 150 min/semana)' :
        this.activity() === 'low' ? 'Baja (30–149 min/semana)' :
        'Sedentaria (< 30 min/semana)';

      const bpLabel =
        this.bloodPressure() === 'normal' ? 'Normal (≤ 120/80)' :
        this.bloodPressure() === 'high' ? 'Alta (diagnosticada)' :
        'No lo sé';

      this.patientService.set({
        name,
        age,
        heightCm: height,
        weightKg: weight,
        bmi,
        bmiCategory,
        ageRange,
        familyHistory: familyLabel,
        activity: activityLabel,
        bloodPressure: bpLabel,
        riskLevel: r.level,
        riskLabel: r.label,
        riskScore: r.score,
        riskMaxScore: r.maxScore,
      });
    });
  }

  protected goPlan(): void {
    this.router.navigate(['/plan-alimentario']);
  }

  protected toggleInfo(): void {
    this.showInfo.update((v) => !v);
  }

  protected reset(): void {
    this.name.set('');
    this.age.set(null);
    this.heightCm.set(null);
    this.weightKg.set(null);
    this.familyHistory.set('no');
    this.activity.set('regular');
    this.bloodPressure.set('normal');
    this.showInfo.set(false);
    this.patientService.clear();
  }
}
