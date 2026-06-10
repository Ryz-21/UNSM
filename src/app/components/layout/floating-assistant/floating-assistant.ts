import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssistantService } from '../../../services/assistant.service';

@Component({
  selector: 'app-floating-assistant',
  imports: [FormsModule],
  templateUrl: './floating-assistant.html',
  styleUrl: './floating-assistant.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingAssistant {
  protected readonly assistant = inject(AssistantService);
  protected readonly isOpen = signal(false);
  protected readonly draft = signal('');
  protected readonly scroll = viewChild<ElementRef<HTMLDivElement>>('scroll');

  protected toggle(): void {
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      queueMicrotask(() => this.scrollToBottom());
    }
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected send(): void {
    const text = this.draft();
    if (!text.trim()) return;
    this.assistant.send(text);
    this.draft.set('');
    queueMicrotask(() => this.scrollToBottom());
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private scrollToBottom(): void {
    const el = this.scroll()?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
