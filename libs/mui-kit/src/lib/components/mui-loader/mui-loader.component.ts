import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mui-loading',
  imports: [CommonModule],
  templateUrl: './mui-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
