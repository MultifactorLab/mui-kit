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
import { MuiLoaderComponent } from '../mui-loader/mui-loader.component';

@Component({
  selector: 'mui-button',
  templateUrl: './mui-button.component.html',
  styleUrls: ['./mui-button.component.scss'],
  imports: [ NgClass, MuiLoaderComponent ],
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
    (this.loading() ? 'mui-button--loading' : ''),
  ]));

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
