import {
  ChangeDetectionStrategy,
  Component,
  computed, forwardRef,
  input, model,
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
  protected disabled = model<boolean>(false);

  readonly inputChange = output<string>();

  protected inputId = computed<string>(() => (this.getInputId()));
  protected value = signal<string>('');

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

  onChange: (val: string) => void = () => { return };
  onTouched: () => void = () => { return }

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
