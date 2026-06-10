import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PatientDataService } from '../../../services/patient-data.service';

@Component({
  selector: 'app-ficha',
  imports: [],
  templateUrl: './ficha.html',
  styleUrl: './ficha.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ficha {
  protected readonly patientService = inject(PatientDataService);
  protected readonly patient = this.patientService.patient;

  protected downloadPdf(): void {
    window.print();
  }
}
