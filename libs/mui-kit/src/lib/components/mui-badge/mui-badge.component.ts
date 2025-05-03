import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ThemeColors } from '../../types/theme-colors.type';

@Component({
  selector: 'mui-badge',
  templateUrl: './mui-badge.component.html',
  styleUrl: './mui-badge.component.scss',
  imports: [ NgClass ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuiBadgeComponent {
  readonly backgroundColor = input.required<ThemeColors>();

  readonly classNames = computed<string[]>(() => ([`mui-badge--bg-${this.backgroundColor()}`]))
}
