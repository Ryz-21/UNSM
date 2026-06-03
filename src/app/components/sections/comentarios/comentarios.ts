import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'app-comentarios',
  imports: [FormsModule, DatePipe],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Comentarios {
  protected readonly comments = inject(CommentsService);
  protected readonly name = signal('');
  protected readonly message = signal('');
  protected readonly error = signal<string | null>(null);

  protected submit(): void {
    this.error.set(null);
    const ok = this.comments.add(this.name(), this.message());
    if (!ok) {
      this.error.set('Por favor completa tu nombre y mensaje.');
      return;
    }
    this.name.set('');
    this.message.set('');
  }
}
