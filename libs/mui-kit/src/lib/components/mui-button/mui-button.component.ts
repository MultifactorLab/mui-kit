import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input, numberAttribute,
  output, ViewEncapsulation,
} from '@angular/core';
import { ThemeColors } from '../../types/theme-colors.type';

@Component({
  selector: 'mui-button',
  imports: [ NgClass, NgTemplateOutlet ],
  templateUrl: './mui-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MuiButtonComponent {
  readonly clicked = output<MouseEvent | KeyboardEvent>();

  readonly color = input<ThemeColors>('primary');
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly variant = input<'square' | 'rounded' | 'pill' | 'text'>('rounded');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly href = input<string | null>(null);
  readonly target = input<string>('_blank');
  readonly role = input<'button' | 'link'>('button');
  readonly tabIndex = input<number, number | string>(0, { transform: numberAttribute });
  readonly disabled = input<boolean, boolean | number>(false, { transform: booleanAttribute });

  readonly classNames = computed<string[]>(() => this.generateButtonClasses());

  onKeyPress(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.code === 'Enter') {
      this.onClick(event);
    }
  }

  onClick(event: MouseEvent | KeyboardEvent): void {
    this.clicked.emit(event);
  }

  private generateButtonClasses(): string[] {
    const base = `inline-flex items-center justify-center gap-x-1 transition-colors select-none w-full h-full`;

    const rounded = {
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
    }

    const variants = {
      square: {
        white: 'text-black bg-white hover:bg-white/80 active:bg-white/60',
        black: 'text-white bg-black hover:bg-black/80 active:bg-black/60',
        primary: 'text-white bg-mui-primary-500 hover:bg-mui-primary-500/80 active:bg-mui-primary-500/60',
        secondary: 'text-white bg-mui-secondary-500 hover:bg-mui-secondary-500/80 active:bg-mui-secondary-700',
        success: 'text-white bg-mui-success-500 hover:bg-mui-success-500/80 active:bg-mui-success-700',
        danger: 'text-white bg-mui-danger-500 hover:bg-mui-danger-500/80 active:bg-mui-danger-700',
        warning: 'text-black bg-mui-warning-500 hover:bg-mui-warning-500/80 active:bg-mui-warning-700',
        info: 'text-white bg-mui-info-500 hover:bg-mui-info-500/80 active:bg-mui-info-700',
      },
      rounded: {
        white: `text-black bg-white hover:bg-white/80 active:bg-white/60 ${rounded[this.size()]}`,
        black: `text-white bg-black hover:bg-black/80 active:bg-black/60 ${rounded[this.size()]}`,
        primary: `text-white bg-mui-primary-500 hover:bg-mui-primary-500/80 active:bg-mui-primary-500/60 ${rounded[this.size()]}`,
        secondary: `text-white bg-mui-secondary-500 hover:bg-mui-secondary-500/80 active:bg-mui-secondary-500/60 ${rounded[this.size()]}`,
        success: `text-white bg-mui-success-500 hover:bg-mui-success-500/80 active:bg-mui-success-500/60 ${rounded[this.size()]}`,
        danger: `text-white bg-mui-danger-500 hover:bg-mui-danger-500/80 active:bg-mui-danger-500/60 ${rounded[this.size()]}`,
        warning: `text-black bg-mui-warning-500 hover:bg-mui-warning-500/80 active:bg-mui-warning-500/60 ${rounded[this.size()]}`,
        info: `text-white bg-mui-info-500 hover:bg-mui-info-500/80 active:bg-mui-info-500/60 ${rounded[this.size()]}`,
      },
      pill: {
        white: 'font-semibold text-medium text-black bg-white hover:bg-white/80 active:bg-white/60 rounded-full',
        black: 'font-semibold text-medium text-white bg-black hover:bg-black/80 active:bg-black/60 rounded-full',
        primary: 'font-semibold text-medium text-mui-primary-500 bg-mui-primary-500/10 hover:bg-mui-primary-500/20 active:bg-mui-primary-500/25 rounded-full',
        secondary: 'font-semibold text-medium text-mui-secondary-500 bg-mui-secondary-500/10 hover:bg-mui-secondary-500/20 active:bg-mui-secondary-500/25 rounded-full',
        success: 'font-semibold text-medium text-mui-success-500 bg-mui-success-500/10 hover:bg-mui-success-500/20 active:bg-mui-success-500/25 rounded-full',
        danger: 'font-semibold text-medium text-mui-danger-500 bg-mui-danger-500/10 hover:bg-mui-danger-500/20 active:bg-mui-danger-500/25 rounded-full',
        warning: 'font-semibold text-medium text-mui-warning-500 bg-mui-warning-500/10 hover:bg-mui-warning-500/20 active:bg-mui-warning-500/25 rounded-full',
        info: 'font-semibold text-medium text-mui-info-500 bg-mui-info-500/10 hover:bg-mui-info-500/20 active:bg-mui-info-500/25 rounded-full',
      },
      text: {
        white: 'font-semibold text-medium text-black hover:bg-white/80 active:bg-white/60 rounded-full',
        black: 'font-semibold text-medium text-white hover:bg-black/80 active:bg-black/60 rounded-full',
        primary: 'font-semibold text-medium text-mui-primary-500 hover:bg-mui-primary-500/20 active:bg-mui-primary-500/25 rounded-full',
        secondary: 'font-semibold text-medium text-mui-secondary-500 hover:bg-mui-secondary-500/20 active:bg-mui-secondary-500/25 rounded-full',
        success: 'font-semibold text-medium text-mui-success-500 hover:bg-mui-success-500/20 active:bg-mui-success-500/25 rounded-full',
        danger: 'font-semibold text-medium text-mui-danger-500 hover:bg-mui-danger-500/20 active:bg-mui-danger-500/25 rounded-full',
        warning: 'font-semibold text-medium text-mui-warning-500 hover:bg-mui-warning-500/20 active:bg-mui-warning-500/25 rounded-full',
        info: 'font-semibold text-medium text-mui-info-500 hover:bg-mui-info-500/20 active:bg-mui-info-500/25 rounded-full',
      },
    }

    const sizes = {
      xs: 'px-1.5 py-0.5 text-xs',
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const states = { disabled: this.disabled() ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer' }

    return [
      base,
      variants[this.variant()][this.color()],
      sizes[this.size()],
      states.disabled
    ]
  }
}
