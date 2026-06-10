import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Comentarios } from '../../components/sections/comentarios/comentarios';

@Component({
  selector: 'app-comentarios-page',
  imports: [Comentarios],
  templateUrl: './comentarios-page.html',
  styleUrl: './comentarios-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComentariosPage {}
