import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  signal,
  ViewEncapsulation,
  effect,
  untracked,
  output,
  booleanAttribute,
  inject,
  DestroyRef,
  OnDestroy,
  HostAttributeToken, forwardRef, model,
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MuiSelectComponent),
      multi: true,
    }
  ],
  templateUrl: './mui-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()' }
})
export class MuiSelectComponent<T = unknown> implements ControlValueAccessor, OnDestroy {
  private readonly destroyRef$ = inject(DestroyRef);
  protected readonly multiple = booleanAttribute(inject(new HostAttributeToken('multiple'), { optional: true }));

  readonly label = input('');
  readonly initialValue = input<SelectValue<T>>(null);
  readonly tabIndex = input<number>(0);
  readonly closeOnSelectionChange = input(false, { transform: booleanAttribute });
  readonly withCheckboxes = input(false, { transform: booleanAttribute });
  readonly displayWith = input<DisplayWithFn<T> | null>(null);
  readonly compareWith = input<CompareWithFn<T>, CompareWithFn<T>>((v1: T | null, v2: T | null) => v1 === v2, {
    transform: (fn) => {
      this.selectionModel.compareWith = fn;
      this.highlightSelectedOptions();

      return fn;
    },
  });
  readonly disabled = model(false);

  selectionChange = output<SelectValue<T>>();

  private optionsSelectedSubscription: Subscription | null = null;
  private readonly optionsMap = new Map<SelectValue<T>, MuiSelectOptionComponent<T>>();
  private readonly selectionModel = new SelectionModel<T>(booleanAttribute(this.multiple));

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
  readonly disabledChangeEffect = effect(() => {
    const disabled = this.disabled();

    if (disabled) {
      this.closeDropdown();
    }
  })

  readonly selectionModelChangeEffect = effect(() => {
    const values = this.selectionModelChange();

    this.updateSelected();

    untracked(() => {
      values?.removed.forEach(value => this.optionsMap.get(value)?.deselect());
      values?.added.forEach(value => this.optionsMap.get(value)?.setAsSelected());
    })
  });
  readonly optionsAndInitialValueChangesEffect = effect(() => {
    const options = this.options();
    const initialValue = this.initialValue();

    this.assertIsNoOptions(options);

    untracked(() => {
      if (this.optionsSelectedSubscription) {
        this.optionsSelectedSubscription.unsubscribe();
        this.optionsSelectedSubscription = null;
      }

      queueMicrotask(() => {
        this.refreshOptionsMap(options);

        if (initialValue) {
          this.onChange(initialValue);
          this.refreshInitialValue(initialValue);
          this.highlightSelectedOptions();
        }
      });

      this.optionsSelectedSubscription = merge(...options.map(o => outputToObservable(o.selected)))
        .pipe(takeUntilDestroyed(this.destroyRef$))
        .subscribe((selectedOption) => this.handleSelection(selectedOption));
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onChange: (value: SelectValue<T>) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onTouched: () => void = () => {};

  writeValue(initialValue: SelectValue<T>): void {
    queueMicrotask(() => {
      this.refreshInitialValue(initialValue);
      this.highlightSelectedOptions();
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  ngOnDestroy(): void {
    this.optionsSelectedSubscription?.unsubscribe();
    this.optionsSelectedSubscription = null;
  }

  protected onKeyUp(event?: KeyboardEvent) {
    if (this.disabled()) return;
  }

  markAsTouched() {
    if (this.disabled()) return;

    this.onTouched();
  }

  toggleDropdown(): void {
    if (this.disabled()) return;

    this.isOpen.set(!this.isOpen());
  }

  openDropdown(): void {
    this.isOpen.set(true);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  clearSelection(e?: MouseEvent) {
    e?.stopPropagation();

    if (this.disabled()) return;

    this.selectionModel.clear();
    this.selectionChange.emit(null);
    this.onChange(null);
  }

  private updateSelected(): void {
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
    if (this.disabled()) return;

    const selectedValue = option.value() ?? null;

    if (selectedValue) {
      this.selectionModel.toggle(selectedValue);

      if (this.selectionModel.isMultipleSelection()) {
        this.selectionChange.emit(this.selectionModel.selected);
        this.onChange(this.selectionModel.selected);
      } else {
        this.selectionChange.emit(this.selectionModel.selected[0] ?? null);
        this.onChange(this.selectionModel.selected[0]);
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

  private refreshInitialValue(initialValue: SelectValue<T>) {
    this.selectionModel.clear();

    if (this.optionsMap.size > 0) {
      this.optionsMap.forEach(option => option.deselect());
    }

    if (!initialValue) return;

    if (Array.isArray(initialValue)) {
      this.selectionModel.select(...initialValue);

      return;
    }

    if (!this.optionsMap.has(initialValue)) return;

    this.selectionModel.select(initialValue);
  }
}
