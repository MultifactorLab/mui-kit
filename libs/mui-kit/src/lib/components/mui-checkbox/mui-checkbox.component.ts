import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input, model,
  output, signal, ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeColors } from '../../types/theme-colors.type';

@Component({
  selector: 'mui-checkbox',
  templateUrl: './mui-checkbox.component.html',
  imports: [ NgClass ],
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
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('lg');
  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly labelPosition = input<'left' | 'right'>('right');
  readonly label = input('');

  readonly checked = model(false);
  readonly disabled = model(false);

  readonly classNames = computed<string[]>(() => this.generateCheckboxClasses());
  readonly checkboxClassNames = computed<string[]>(() => this.generateCheckboxInputClasses());
  readonly svgClassNames = computed<string[]>(() => this.generateSvgClasses());
  readonly labelContainerClassNames = computed<string[]>(() => this.generateLabelContainerClassNames());

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

    this.checked.set(value);
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
    const base = 'relative border bg-white rounded-md peer-focus:ring-2';

    const colors = {
      white: 'border-mui-white-500 peer-focus:ring-white/30',
      black: 'border-mui-black-500 peer-focus:ring-black/30',
      primary: 'border-mui-primary-500 peer-focus:ring-mui-primary-500/30',
      secondary: 'border-mui-secondary-500 peer-focus:ring-mui-secondary-500/30',
      success: 'border-mui-success-500 peer-focus:ring-mui-success-500/30',
      danger: 'border-mui-danger-500 peer-focus:ring-mui-danger-500/30',
      warning: 'border-mui-warning-500 peer-focus:ring-mui-warning-500/30',
      info: 'border-mui-info-500 peer-focus:ring-mui-info-500/30',
    };

    const sizes = {
      xs: 'size-3 rounded-sm',
      sm: 'size-3.5 rounded-sm',
      md: 'size-4 rounded-sm',
      lg: 'size-5 rounded-md',
    };

    return [
      base,
      colors[this.color()],
      sizes[this.size()]
    ];
  }

  private generateSvgClasses(): string[] {
    const base = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity';

    const colors = {
      white: 'fill-white',
      black: 'fill-black',
      primary: 'fill-mui-primary-500',
      secondary: 'fill-mui-secondary-500',
      success: 'fill-mui-success-500',
      danger: 'fill-mui-danger-500',
      warning: 'fill-mui-warning-500',
      info: 'fill-mui-info-500',
    };

    const sizes = {
      xs: 'size-2',
      sm: 'size-2.5',
      md: 'size-3',
      lg: 'size-4',
    };

    return [
      base,
      colors[this.color()],
      sizes[this.size()],
      this.checked() ? 'opacity-100' : 'opacity-0',
    ];
  }

  private generateLabelContainerClassNames(): string[] {
    const base = 'flex gap-x-2 text-black dark:text-white';

    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    return [
      base,
      sizes[this.size()],
    ]
  }
}
