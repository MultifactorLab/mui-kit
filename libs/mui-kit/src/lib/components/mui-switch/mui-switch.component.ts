import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ThemeColors } from '../../types/theme-colors.type';

@Component({
  selector: 'mui-switch',
  templateUrl: './mui-switch.component.html',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuiSwitchComponent {
  readonly changed = output<boolean>();

  readonly color = input<ThemeColors>('primary');
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly classNames = computed<string[]>(() => this.generateSwitchClasses());
  readonly sliderClassNames = computed<string[]>(() => this.generateSliderClasses());

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.changed.emit(target.checked);
  }

  private generateSwitchClasses(): string[] {
    const base = 'relative inline-flex items-center cursor-pointer';

    const states = {
      disabled: this.disabled() ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
    };

    return [
      base,
      states.disabled
    ];
  }

  private generateSliderClasses(): string[] {
    const base = `w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700
      after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
      after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`;

    const colors = {
      white: 'peer-checked:bg-white peer-focus:ring-white/30',
      black: 'peer-checked:bg-black peer-focus:ring-black/30',
      primary: 'peer-checked:bg-mui-primary-500 peer-focus:ring-mui-primary-500/30',
      secondary: 'peer-checked:bg-mui-secondary-500 peer-focus:ring-mui-secondary-500/30',
      success: 'peer-checked:bg-mui-success-500 peer-focus:ring-mui-success-500/30',
      danger: 'peer-checked:bg-mui-danger-500 peer-focus:ring-mui-danger-500/30',
      warning: 'peer-checked:bg-mui-warning-500 peer-focus:ring-mui-warning-500/30',
      info: 'peer-checked:bg-mui-info-500 peer-focus:ring-mui-info-500/30',
    };

    const afterPosition = 'peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%]';

    return [
      base,
      colors[this.color()],
      afterPosition
    ];
  }
}
