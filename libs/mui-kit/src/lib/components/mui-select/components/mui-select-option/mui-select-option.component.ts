import { Highlightable } from '@angular/cdk/a11y';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
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
export class MuiSelectOptionComponent<T> implements Highlightable {
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  readonly value = input<T | null>(null);
  readonly isDisabled = input<boolean, boolean>(false, {
    transform: (isDisabled) => {
      this.disabled = isDisabled;

      return booleanAttribute(isDisabled);
    }
  });
  readonly checkbox = input<null | { size: 'xs' | 'sm' | 'md' | 'lg'; color: ThemeColors }>(null);

  selected = output<MuiSelectOptionComponent<T>>();

  disabled = false;

  protected isSelected = signal(false);
  isActive = signal(false);
  protected hostClassNames = computed<string>(() => {
    const baseClasses = 'block px-3 py-2 text-white rounded-lg';
    const disabledClasses = this.isDisabled()
      ? 'bg-mui-secondary-600 opacity-50 cursor-auto pointer-events-none select-none'
      : 'hover:bg-mui-secondary-400 cursor-pointer';
    const selectedClasses = this.isSelected() ? 'bg-mui-secondary-400' : '';
    const activeClasses = this.isActive() ? 'inset-ring-2 inset-ring-mui-secondary-200' : '';

    return `${baseClasses} ${disabledClasses} ${selectedClasses} ${activeClasses}`;
  })

  protected select(e: PointerEvent) {
    if (this.isDisabled()) return;

    this.setAsSelected();
    this.selected.emit(this);
  }

  scrollIntoView(options?: ScrollIntoViewOptions) {
    this.hostElement.nativeElement.scrollIntoView(options);
  }

  setAsSelected() {
    this.isSelected.set(true);
  }

  deselect() {
    this.isSelected.set(false);
  }

  setActiveStyles(): void {
    this.isActive.set(true);
  }

  setInactiveStyles(): void {
    this.isActive.set(false);
  }
}
