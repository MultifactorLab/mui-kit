import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeColors } from '../../types/theme-colors.type';

@Component({
  selector: 'mui-switch',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MuiSwitchComponent),
      multi: true,
    }
  ],
  imports: [ NgClass ],
  templateUrl: './mui-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MuiSwitchComponent implements ControlValueAccessor {
  readonly changed = output<boolean>();

  readonly color = input<ThemeColors>('primary');
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly value = input<string>('');

  readonly checked = signal(false);
  readonly disabled = signal(false);

  readonly classNames = computed<string[]>(() => this.generateSwitchClasses());
  readonly sliderClassNames = computed<string[]>(() => this.generateSliderClasses());

  private onChangeFn: (value: boolean) => void = () => { return };
  private onTouchedFn: () => void = () => { return };

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

  private generateSwitchClasses(): string[] {
    const base = 'inline-flex items-center cursor-pointer select-none';

    const states = {
      disabled: this.disabled() ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
    };

    const aligns = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    };

    return [
      base,
      aligns[this.align()],
      states.disabled
    ];
  }

  private generateSliderClasses(): string[] {
    const base = `relative bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700
      after:content-[""] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:bg-white after:border-gray-300
      after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`;

    const colors = {
      white: 'peer-checked:bg-white peer-focus:ring-white/30',
      black: 'peer-checked:bg-black peer-focus:ring-black/30',
      primary: 'peer-checked:bg-mui-primary-500 peer-focus:ring-mui-primary-500/30',
      secondary: 'peer-checked:bg-mui-secondary-500 peer-focus:ring-mui-secondary-500/30',
      success: 'peer-checked:bg-mui-success-500 peer-focus:ring-mui-success-500/30',
      danger: 'peer-checked:bg-mui-danger-500 peer-focus:ring-mui-danger-500/30',
      warning: 'peer-checked:bg-mui-warning-500 peer-focus:ring-mui-warning-500/30',
      info: 'peer-checked:bg-mui-info-500 peer-focus:ring-mui-info-500/30',
    };

    // TODO: Implement sizes
    const sizes = {
      xs: '',
      sm: '',
      md: 'min-w-11 min-h-6',
      lg: '',
    };

    const afterPosition = 'peer-checked:after:translate-x-full';

    return [
      base,
      colors[this.color()],
      sizes[this.size()],
      afterPosition
    ];
  }
}
