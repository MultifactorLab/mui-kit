import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ThemeColors } from '../../types/theme-colors.type';

@Component({
  selector: 'mui-badge',
  templateUrl: './mui-badge.component.html',
  imports: [ NgClass ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuiBadgeComponent {
  readonly color = input<ThemeColors>('primary');

  readonly classNames = computed<string[]>(() => this.generateClasses());

  private generateClasses(): string[] {
    const colors = {
      primary: 'text-mui-primary-500 bg-mui-primary-500/20',
      secondary: 'text-mui-secondary-500 bg-mui-secondary-500/10',
      success: 'text-mui-success-500 bg-mui-success-500/10',
      danger: 'text-mui-danger-500 bg-mui-danger-500/10',
      white: 'text-black bg-white/30',
      black: 'text-white bg-black/30',
      warning: 'text-mui-warning-500 bg-mui-warning-500/10',
      info: 'text-mui-info-500 bg-mui-info-500/10',
    }

    return [colors[this.color()]];
  }
}
