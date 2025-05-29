import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed, ElementRef,
  input,
  signal, viewChild, ViewEncapsulation,
} from '@angular/core';

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
})
export class MuiSelectComponent {
  readonly label = input('');
  readonly value = input<string | null>(null);
  readonly tabIndex = input<number>(0);

  readonly overlayOrigin = viewChild.required('overlayOrigin', { read: ElementRef })

  protected isOpen = signal(false);

  readonly labelClasses = computed<string[]>(() => this.value() ? ['top-1', 'text-xs'] : ['top-4', 'text-base'])

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
}
