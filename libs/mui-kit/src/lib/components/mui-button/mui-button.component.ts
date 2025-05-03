import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ThemeColors } from '../../types/theme-colors.type';
import { ThemeSizes } from '../../types/theme-sizes.type';

@Component({
  selector: 'mui-button',
  templateUrl: './mui-button.component.html',
  styleUrls: ['./mui-button.component.scss'],
  imports: [ NgClass ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuiButtonComponent {
  readonly clicked = output<MouseEvent>();

  readonly backgroundColor = input<ThemeColors>('primary');
  readonly size = input<ThemeSizes>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly classNames = computed<string[]>(() => ([
    `mui-button--bg-${this.backgroundColor()}`,
    `mui-button--size-${this.size()}`,
  ]));

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
