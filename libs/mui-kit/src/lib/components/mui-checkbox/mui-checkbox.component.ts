import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output, signal, ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeColors } from '../../types/theme-colors.type';

@Component({
  selector: 'mui-checkbox',
  templateUrl: './mui-checkbox.component.html',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MuiCheckboxComponent),
      multi: true,
    }
  ]
})
export class MuiCheckboxComponent implements ControlValueAccessor {
  readonly changed = output<boolean>();

  readonly color = input<ThemeColors>('primary');
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly labelPosition = input<'left' | 'right'>('right');
  readonly value = input<string>('');
  readonly label = input<string>('');

  readonly checked = signal(false);
  readonly disabled = signal(false);

  readonly classNames = computed<string[]>(() => this.generateCheckboxClasses());
  readonly checkboxClassNames = computed<string[]>(() => this.generateCheckboxInputClasses());

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeFn: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn: () => void = () => {};

  writeValue(value: boolean): void {
    this.checked.set(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.checked;

    this.onChangeFn(value);
    this.onTouchedFn();
    this.changed.emit(value);
  }

  private generateCheckboxClasses(): string[] {
    const base = 'inline-flex gap-x-2 cursor-pointer select-none';

    const states = {
      disabled: this.disabled() ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
    };

    const aligns = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    };

    const labelPositions = {
      left: 'flex-row-reverse',
      right: 'flex-row',
    };

    return [
      base,
      aligns[this.align()],
      labelPositions[this.labelPosition()],
      states.disabled
    ];
  }

  private generateCheckboxInputClasses(): string[] {
    const base = 'text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';

    const colors = {
      white: 'text-white focus:ring-white/30',
      black: 'text-black focus:ring-black/30',
      primary: 'text-mui-primary-500 focus:ring-mui-primary-500/30',
      secondary: 'text-mui-secondary-500 focus:ring-mui-secondary-500/30',
      success: 'text-mui-success-500 focus:ring-mui-success-500/30',
      danger: 'text-mui-danger-500 focus:ring-mui-danger-500/30',
      warning: 'text-mui-warning-500 focus:ring-mui-warning-500/30',
      info: 'text-mui-info-500 focus:ring-mui-info-500/30',
    };

    const sizes = {
      xs: 'size-3 rounded-xs',
      sm: 'size-3.5 rounded-sm',
      md: 'size-4 rounded-md',
      lg: 'size-5 rounded-lg',
    };

    return [
      base,
      colors[this.color()],
      sizes[this.size()]
    ];
  }
}
