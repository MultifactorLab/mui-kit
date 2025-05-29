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
  effect, untracked, output, booleanAttribute, inject, DestroyRef, OnDestroy,
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { merge, Subscription, tap } from 'rxjs';
import { MuiSelectOptionComponent } from './components/mui-select-option/mui-select-option.component';

@Component({
  selector: 'mui-select',
  imports: [
    NgClass,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
  ],
  templateUrl: './mui-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'w-full' }
})
export class MuiSelectComponent implements OnDestroy {
  private readonly destroyRef$ = inject(DestroyRef);

  readonly label = input('');
  readonly value = input<string | null, string | null>(null, {
    transform: (value: string | null) => {
      if (!value) return null;

      this.selectionModel.select(value);
      this.highlightSelectedOptions(value);

      return value;
    }
  });
  readonly tabIndex = input<number>(0);
  readonly closeOnSelectionChange = input(false, { transform: booleanAttribute })

  selectionChange = output<string | null>();

  readonly overlayOrigin = viewChild.required('overlayOrigin', { read: ElementRef })
  readonly options = contentChildren(MuiSelectOptionComponent, { descendants: true });

  private readonly selectionModel = new SelectionModel<string>();

  protected isOpen = signal(false);

  readonly labelClasses = computed<string[]>(() => this.selected() ? ['top-1', 'text-xs'] : ['top-4', 'text-base']);
  readonly selected = signal<string | null>(null);
  readonly selectionModelChange = toSignal(this.selectionModel.changed);
  readonly selectionModelChangeEffect = effect(() => {
    const values = this.selectionModelChange();

    this.selected.set(values?.added[0] ?? null);

    console.log('values', values);

    values?.removed.forEach(value => this.findOptionsByValue(value)?.deselect());
    // values?.added.forEach(value => this.findOptionsByValue(value)?.highlightAsSelected());
  });

  readonly optionsChangesEffect = effect(() => {
    const options = this.options();

    untracked(() => this.highlightSelectedOptions(this.value()));

    untracked(() => {
      if (this.optionsSelectedSubscription) {
        this.optionsSelectedSubscription.unsubscribe();
        this.optionsSelectedSubscription = null;
      }

      this.optionsSelectedSubscription = merge(...options.map(o => outputToObservable(o.selected)))
        .pipe(
          tap((selectedOption) => this.handleSelection(selectedOption)),
          takeUntilDestroyed(this.destroyRef$),
        )
        .subscribe()
    });
  });

  private optionsSelectedSubscription: Subscription | null = null;

  ngOnDestroy(): void {
    this.optionsSelectedSubscription = null;
  }

  toggleDropdown(): void {
    this.isOpen.set(!this.isOpen());
  }

  openDropdown(): void {
    this.isOpen.set(true);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.overlayOrigin().nativeElement.focus();
  }

  private highlightSelectedOptions(value: string | null): void {
    this.findOptionsByValue(value)?.highlightAsSelected();
  }

  private findOptionsByValue(value: string | null): MuiSelectOptionComponent | undefined {
    return this.options().find(o => o.value() === value);
  }

  private handleSelection(option: MuiSelectOptionComponent) {
    const selectedValue = option.value() ?? null;

    if (selectedValue) {
      this.selectionModel.toggle(selectedValue)
      this.selectionChange.emit(this.selected());
    }

    if (this.closeOnSelectionChange()) {
      this.closeDropdown();
    }
  }
}
