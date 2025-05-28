import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'mui-input',
  imports: [],
  templateUrl: './mui-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MuiInputComponent {
  readonly placeholder = input.required<string>();
  readonly type = input<'text' | 'url' | 'password' | 'number' | 'email'>('text');
  readonly id = input('');
  readonly inputId = computed<string>(() => (`${this.placeholder().toLowerCase()}-${this.type()}-${this.id()}`))

  inputChange = output<string>();

  onChange(e: Event) {
    this.inputChange.emit((e.target as HTMLInputElement).value);
  }
}
