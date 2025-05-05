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

@Component({
  selector: 'mui-button',
  templateUrl: './mui-button.component.html',
  imports: [ NgClass ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuiButtonComponent {
  readonly clicked = output<MouseEvent>();

  readonly color = input<ThemeColors>('primary');
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly variant = input<'square' | 'rounded' | 'pill' | 'text'>('rounded');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly classNames = computed<string[]>(() => this.generateButtonClasses());

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }

  private generateButtonClasses(): string[] {
    const base = `inline-flex items-center justify-center transition-colors select-none w-full h-full`;

    // TODO Доделать
    const variants = {
      square: {
        white: 'text-black bg-white hover:bg-gray-200 active:bg-gray-300 border-gray-200',
        black: '',
        primary: 'text-white bg-mui-primary-500 hover:bg-mui-primary-600 active:bg-mui-primary-700 border-mui-primary-200',
        secondary: 'text-white bg-mui-secondary-500 hover:bg-mui-secondary-600 active:bg-mui-secondary-700 border-mui-secondary-200',
        success: 'text-white bg-mui-success-500 hover:bg-mui-success-600 active:bg-mui-success-700 border-mui-success-200',
        danger: 'text-white bg-mui-danger-500 hover:bg-mui-danger-600 active:bg-mui-danger-700 border-mui-danger-200',
        warning: 'text-white bg-mui-warning-500 hover:bg-mui-warning-600 active:bg-mui-warning-700 border-mui-warning-200',
        info: 'text-white bg-mui-info-500 hover:bg-mui-info-600 active:bg-mui-info-700 border-mui-info-200',
      },
      rounded: {
        white: 'text-black bg-white hover:bg-gray-300 active:bg-gray-400 border-gray-100',
        black: 'text-white bg-black hover:bg-gray-900 active:bg-gray-700 border-gray-100',
        primary: 'text-white bg-mui-primary-500 hover:bg-mui-primary-600 active:bg-mui-primary-700 border-mui-primary-200',
        secondary: 'text-white bg-mui-secondary-500 hover:bg-mui-secondary-600 active:bg-mui-secondary-700 border-mui-secondary-200',
        success: 'text-white bg-mui-success-500 hover:bg-mui-success-600 active:bg-mui-success-700 border-mui-success-200',
        danger: 'text-white bg-mui-danger-500 hover:bg-mui-danger-600 active:bg-mui-danger-700 border-mui-danger-200',
        warning: 'text-white bg-mui-warning-500 hover:bg-mui-warning-600 active:bg-mui-warning-700 border-mui-warning-200',
        info: 'text-white bg-mui-info-500 hover:bg-mui-info-600 active:bg-mui-info-700 border-mui-info-200',
      },
      pill: {
        white: '',
        black: '',
        primary: 'text-white bg-mui-primary-500 hover:bg-mui-primary-600 active:bg-mui-primary-700 border-mui-primary-200',
        secondary: 'text-white bg-mui-secondary-500 hover:bg-mui-secondary-600 active:bg-mui-secondary-700 border-mui-secondary-200',
        success: 'text-white bg-mui-success-500 hover:bg-mui-success-600 active:bg-mui-success-700 border-mui-success-200',
        danger: 'text-white bg-mui-danger-500 hover:bg-mui-danger-600 active:bg-mui-danger-700 border-mui-danger-200',
        warning: 'text-white bg-mui-warning-500 hover:bg-mui-warning-600 active:bg-mui-warning-700 border-mui-warning-200',
        info: 'text-white bg-mui-info-500 hover:bg-mui-info-600 active:bg-mui-info-700 border-mui-info-200',
      },
      text: {
        white: '',
        black: '',
        primary: 'text-white bg-mui-primary-500 hover:bg-mui-primary-600 active:bg-mui-primary-700 border-mui-primary-200',
        secondary: 'text-white bg-mui-secondary-500 hover:bg-mui-secondary-600 active:bg-mui-secondary-700 border-mui-secondary-200',
        success: 'text-white bg-mui-success-500 hover:bg-mui-success-600 active:bg-mui-success-700 border-mui-success-200',
        danger: 'text-white bg-mui-danger-500 hover:bg-mui-danger-600 active:bg-mui-danger-700 border-mui-danger-200',
        warning: 'text-white bg-mui-warning-500 hover:bg-mui-warning-600 active:bg-mui-warning-700 border-mui-warning-200',
        info: 'text-white bg-mui-info-500 hover:bg-mui-info-600 active:bg-mui-info-700 border-mui-info-200',
      },
    }

    const rounded = {
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      none: 'rounded-none',
      full: 'rounded-full',
    }

    const bordered = {
      xs: 'border',
      sm: 'border-2',
      md: 'border-4',
      lg: 'border-8',
      none: 'border-0 border-none',
    }

    const colors = {
      white: '',
      black: '',
      primary: 'text-white bg-mui-primary-500 hover:bg-mui-primary-600 active:bg-mui-primary-700 border-mui-primary-200',
      secondary: 'text-white bg-mui-secondary-500 hover:bg-mui-secondary-600 active:bg-mui-secondary-700 border-mui-secondary-200',
      success: 'text-white bg-mui-success-500 hover:bg-mui-success-600 active:bg-mui-success-700 border-mui-success-200',
      danger: 'text-white bg-mui-danger-500 hover:bg-mui-danger-600 active:bg-mui-danger-700 border-mui-danger-200',
      warning: 'text-white bg-mui-warning-500 hover:bg-mui-warning-600 active:bg-mui-warning-700 border-mui-warning-200',
      info: 'text-white bg-mui-info-500 hover:bg-mui-info-600 active:bg-mui-info-700 border-mui-info-200',
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
