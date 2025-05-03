import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'mui-button',
  imports: [
    NgClass,
  ],
  templateUrl: './mui-button.component.html',
  styleUrls: ['./mui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MuiButtonComponent {
  readonly clicked = output<MouseEvent>();

  readonly color = input<'primary' | 'secondary' | 'success' | 'danger'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly classNames = computed<string[]>(() => ([
    `mui-button--color-${this.color()}`,
    `mui-button--size-${this.size()}`,
  ]));

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
