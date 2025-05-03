import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSizes } from '../../types/theme-sizes.type';

@Component({
  selector: 'mui-loading',
  imports: [CommonModule],
  templateUrl: './mui-loader.component.html',
  styleUrl: './mui-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuiLoaderComponent {
  readonly size = input<ThemeSizes>('md');
}
