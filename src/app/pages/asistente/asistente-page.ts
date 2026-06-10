import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Asistente } from '../../components/sections/asistente/asistente';

@Component({
  selector: 'app-asistente-page',
  imports: [Asistente],
  templateUrl: './asistente-page.html',
  styleUrl: './asistente-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsistentePage {}
