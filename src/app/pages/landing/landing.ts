import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Asistente } from '../../components/sections/asistente/asistente';
import { Calculadora } from '../../components/sections/calculadora/calculadora';
import { Comentarios } from '../../components/sections/comentarios/comentarios';

@Component({
  selector: 'app-landing',
  imports: [Asistente, Calculadora, Comentarios],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {}
