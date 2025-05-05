import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mui-loading',
  imports: [CommonModule],
  templateUrl: './mui-loader.component.html',
  styleUrl: './mui-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuiLoaderComponent {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
}
