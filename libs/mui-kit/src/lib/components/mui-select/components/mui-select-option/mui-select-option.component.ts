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

@Component({
  selector: 'mui-select-option',
  templateUrl: 'mui-select-option.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClassNames()',
    '(click)': 'select($event)',
  },
})
export class MuiSelectOptionComponent {
  readonly value = input<string | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });

  selected = output<MuiSelectOptionComponent>()

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

    this.highlightAsSelected();
    this.selected.emit(this);
  }

  highlightAsSelected() {
    this.isSelected.set(true);
  }

  deselect() {
    this.isSelected.set(false);
  }
}
