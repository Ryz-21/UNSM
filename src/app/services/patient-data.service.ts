import { Injectable, signal } from '@angular/core';

export interface PatientData {
  name: string;
  age: number;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bmiCategory: string;
  ageRange: string;
  familyHistory: string;
  activity: string;
  bloodPressure: string;
  riskLevel: string;
  riskLabel: string;
  riskScore: number;
  riskMaxScore: number;
}

@Injectable({ providedIn: 'root' })
export class PatientDataService {
  private readonly data = signal<PatientData | null>(null);

  readonly patient = this.data.asReadonly();

  set(value: PatientData): void {
    this.data.set(value);
  }

  clear(): void {
    this.data.set(null);
  }
}
