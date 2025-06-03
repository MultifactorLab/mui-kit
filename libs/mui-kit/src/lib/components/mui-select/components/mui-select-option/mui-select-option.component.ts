import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ThemeColors } from '../../../../types/theme-colors.type';
import { MuiCheckboxComponent } from '../../../mui-checkbox/mui-checkbox.component';

@Component({
  selector: 'mui-select-option',
  templateUrl: 'mui-select-option.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MuiCheckboxComponent,
  ],
  host: {
    '[class]': 'hostClassNames()',
    '(click)': 'select($event)',
  },
})
export class MuiSelectOptionComponent<T> {
  readonly value = input<T | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly checkbox = input<null | { size: 'xs' | 'sm' | 'md' | 'lg'; color: ThemeColors }>(null);

  selected = output<MuiSelectOptionComponent<T>>()

  protected isSelected = signal(false);
  protected hostClassNames = computed<string>(() => {
    const baseClasses = 'block px-3 py-2 text-white';
    const disabledClasses = 'bg-mui-secondary-600 opacity-50 cursor-auto pointer-events-none select-none';
    const enabledClasses = 'hover:bg-mui-secondary-400 cursor-pointer';
    const selectedClasses = 'bg-mui-secondary-400';

    return `${baseClasses} ${this.disabled() ? disabledClasses : enabledClasses} ${this.isSelected() ? selectedClasses : ''}`;
  })

  protected select(e: PointerEvent) {
    if (this.disabled()) return;

    this.setAsSelected();
    this.selected.emit(this);
  }

  setAsSelected() {
    this.isSelected.set(true);
  }

  deselect() {
    this.isSelected.set(false);
  }
}
