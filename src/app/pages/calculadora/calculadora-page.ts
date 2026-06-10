import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Calculadora } from '../../components/sections/calculadora/calculadora';

@Component({
  selector: 'app-calculadora-page',
  imports: [Calculadora],
  templateUrl: './calculadora-page.html',
  styleUrl: './calculadora-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculadoraPage {}
