import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
  effect,
  untracked,
  output,
  booleanAttribute,
  inject,
  DestroyRef,
  OnDestroy,
  HostAttributeToken,
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { merge, Subscription } from 'rxjs';
import { MuiSelectOptionComponent } from './components/mui-select-option/mui-select-option.component';
import { CompareWithFn, DisplayWithFn, SelectValue } from './types/mui-select.type';

@Component({
  selector: 'mui-select, mui-select[multiple]',
  imports: [
    NgClass,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
  ],
  templateUrl: './mui-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()' }
})
export class MuiSelectComponent<T = unknown> implements OnDestroy {
  private readonly destroyRef$ = inject(DestroyRef);
  protected readonly multiple = booleanAttribute(inject(new HostAttributeToken('multiple'), { optional: true }));

  readonly label = input('');
  readonly initialValue = input<SelectValue<T>, SelectValue<T>>(null,  {
    transform: (value: SelectValue<T>) => {
      this.selectionModel.clear();

      if (this.optionsMap.size > 0) {
        this.optionsMap.forEach(option => option.deselect());
      }

      if (!value) return null;

      if (Array.isArray(value)) {
        this.selectionModel.select(...value);
      } else {
        this.selectionModel.select(value);
      }

      return value;
    },
  });
  readonly tabIndex = input<number>(0);
  readonly closeOnSelectionChange = input(false, { transform: booleanAttribute });
  readonly withCheckboxes = input(false, { transform: booleanAttribute });
  readonly displayWith = input<DisplayWithFn<T> | null>(null);
  readonly compareWith = input<CompareWithFn<T>, CompareWithFn<T>>((v1: T | null, v2: T | null) => v1 === v2, {
    transform: (fn) => {
      this.selectionModel.compareWith = fn;
      this.highlightSelectedOptions();

      return fn;
    }
  });

  selectionChange = output<SelectValue<T>>();

  private optionsSelectedSubscription: Subscription | null = null;
  private readonly optionsMap = new Map<SelectValue<T>, MuiSelectOptionComponent<T>>();
  private readonly selectionModel = new SelectionModel<T>(coerceBooleanProperty(this.multiple));

  readonly options = contentChildren<MuiSelectOptionComponent<T>>(MuiSelectOptionComponent, { descendants: true });

  protected isOpen = signal(false);

  readonly labelClasses = computed<string[]>(() => this.displayedValue() ? ['top-1', 'text-xs'] : ['top-4', 'text-base']);
  readonly hostClasses = computed(() => (`w-full ${this.isOpen() ? 'relative z-[10501]' : ''}`));
  readonly displayedValue = computed(() => {
    const displayWithFn = this.displayWith();
    const selectedValue = this.selected();

    if (displayWithFn && selectedValue) {
      if (Array.isArray(selectedValue)) {
        return selectedValue.map(displayWithFn).join(', ');
      }

      return displayWithFn(selectedValue);
    }

    return selectedValue;
  });
  readonly selected = signal<SelectValue<T>>(null);
  readonly selectionModelChange = toSignal(this.selectionModel.changed);

  readonly selectionModelChangeEffect = effect(() => {
    const values = this.selectionModelChange();

    this.updateSelected();

    untracked(() => {
      values?.removed.forEach(value => this.optionsMap.get(value)?.deselect());
      values?.added.forEach(value => this.optionsMap.get(value)?.highlightAsSelected());
    })
  });
  readonly optionsChangesEffect = effect(() => {
    const options = this.options();

    this.assertIsNoOptions(options);

    untracked(() => {
      options.forEach(option => option.withCheckbox.set(this.withCheckboxes()));

      if (this.optionsSelectedSubscription) {
        this.optionsSelectedSubscription.unsubscribe();
        this.optionsSelectedSubscription = null;
      }

      queueMicrotask(() => {
        this.refreshOptionsMap(options);
        this.highlightSelectedOptions();
      });

      this.optionsSelectedSubscription = merge(...options.map(o => outputToObservable(o.selected)))
        .pipe(takeUntilDestroyed(this.destroyRef$))
        .subscribe((selectedOption) => this.handleSelection(selectedOption));
    });
  });

  ngOnDestroy(): void {
    this.optionsSelectedSubscription?.unsubscribe();
    this.optionsSelectedSubscription = null;
  }

  onKeyUp(event: KeyboardEvent) {
    console.log(event.key);
    console.log(event.keyCode);
  }

  toggleDropdown(): void {
    this.isOpen.set(!this.isOpen());
  }

  openDropdown(): void {
    this.isOpen.set(true);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  updateSelected(): void {
    if (this.selectionModel.isEmpty()) {
      this.selected.set(null);

      return;
    }

    if (this.selectionModel.isMultipleSelection()) {
      this.selected.set(this.selectionModel.selected);

      return;
    }

    this.selected.set(this.selectionModel.selected[0]);
  }

  clearSelection(e: MouseEvent) {
    e.stopPropagation();

    this.selectionModel.clear();
    this.selectionChange.emit(null);
  }

  private assertIsNoOptions(options: readonly MuiSelectOptionComponent<T>[]): asserts options {
    if (options.length === 0) {
      throw new Error('No options provided to mui-select');
    }
  }

  private refreshOptionsMap(options: readonly MuiSelectOptionComponent<T>[]): void {
    this.optionsMap.clear();
    options.forEach(o => this.optionsMap.set(o.value(), o));
  }

  private handleSelection(option: MuiSelectOptionComponent<T>) {
    const selectedValue = option.value() ?? null;

    if (selectedValue) {
      this.selectionModel.toggle(selectedValue);

      if (this.selectionModel.isMultipleSelection()) {
        this.selectionChange.emit(this.selectionModel.selected);
      } else {
        this.selectionChange.emit(this.selectionModel.selected[0] ?? null);
      }
    }

    if (this.closeOnSelectionChange()) {
      this.closeDropdown();
    }
  }

  private highlightSelectedOptions(): void {
    const valuesWithUpdatedReferences = this.selectionModel.selected.map(v => {
      const correspondingOption = this.findOptionsByValue(v);

      return correspondingOption?.value() ?? v;
    });

    this.selectionModel.clear();
    this.selectionModel.select(...valuesWithUpdatedReferences);
  }

  private findOptionsByValue(value: T | null): MuiSelectOptionComponent<T> | undefined {
    if (this.optionsMap.has(value)) {
      return this.optionsMap.get(value);
    }

    return this.options().find(o => this.compareWith()(o.value(), value));
  }
}
