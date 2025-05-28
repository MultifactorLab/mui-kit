import {
  ChangeDetectionStrategy,
  Component,
  computed, forwardRef,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MuiInputTypes } from './mui-input.types';

@Component({
  selector: 'mui-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MuiInputComponent),
      multi: true,
    }
  ],
  templateUrl: './mui-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MuiInputComponent implements ControlValueAccessor{
  readonly placeholder = input.required<string>();
  readonly type = input<MuiInputTypes>('text');
  readonly id = input('');

  readonly inputChange = output<string | number>();

  protected inputId = computed<string>(() => (this.getInputId()));
  protected isDisabled = signal<boolean>(false);
  protected value = signal<string | number | null>(null);

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.onChange(target.value);
    this.inputChange.emit(target.value);
  }

  onBlur() { this.onTouched() }

  getInputId(): string {
    return `${this.placeholder().toLowerCase()}-${this.type()}-${this.id()}-${this.getRandomId()}`
  }

  getRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (val: string | number | null) => void = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {}

  writeValue(value: string | number | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (val: string | number | null) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
