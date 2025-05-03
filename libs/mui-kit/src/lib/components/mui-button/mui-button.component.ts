import { NgClass } from '@angular/common';
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
  selector: 'mui-button',
  imports: [
    NgClass,
  ],
  templateUrl: './mui-button.component.html',
  styleUrls: ['./mui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MuiButtonComponent {
  readonly clicked = output<MouseEvent>();

  readonly variant = input<'primary' | 'secondary' | 'success' | 'danger'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly theme = input<'default' | 'pink'>('default');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly classes = computed(() => this.generateClasses());

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }

  private generateClasses(): string {
    // const variantClasses = {
    //   primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    //   secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    //   danger: 'bg-danger-500 hover:bg-danger-600 text-white',
    // };

    // const sizeClasses = {
    //   sm: 'px-2 py-1 text-sm',
    //   md: 'px-4 py-2 text-base',
    //   lg: 'px-6 py-3 text-lg',
    // };

    // const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';

    // const disabled = this.disabled() ? 'opacity-50 cursor-not-allowed': 'cursor-pointer';

    const disabled = 'mui-button--disabled'

    const variantClasses = {
      primary: 'mui-button--primary',
      secondary: 'mui-button--secondary',
      danger: 'mui-button--danger',
      success: 'mui-button--success',
    };

    const theme = {
      default: 'mui-button--default',
      pink: 'mui-button--pink',
    }

    const sizeClasses = {
      sm: 'mui-button--sm',
      md: 'mui-button--md',
      lg: 'mui-button--lg',
    };
    // return [
    //   base,
    //   variantClasses[this.variant()],
    //   sizeClasses[this.size()],
    //   disabled
    // ].join(' ');

    return [
      variantClasses[this.variant()],
      sizeClasses[this.size()],
      theme[this.theme()],
      this.disabled() ? disabled : '',
    ].join(' ');
  }
}
