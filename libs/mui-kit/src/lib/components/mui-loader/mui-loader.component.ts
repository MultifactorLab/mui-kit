import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mui-loading',
  imports: [ NgClass ],
  templateUrl: './mui-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MuiLoaderComponent {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly classNames = computed(() => this.generateClassNames());

  private generateClassNames(): string[] {
    const sizes = {
      xs: 'min-h-1.5',
      sm: 'min-h-2.5',
      md: 'min-h-4',
      lg: 'min-h-5',
    }

    return [sizes[this.size()]];
  }
}
