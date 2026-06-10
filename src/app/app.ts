import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/layout/sidebar/sidebar-component';
import { FloatingAssistant } from './components/layout/floating-assistant/floating-assistant';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, FloatingAssistant],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
