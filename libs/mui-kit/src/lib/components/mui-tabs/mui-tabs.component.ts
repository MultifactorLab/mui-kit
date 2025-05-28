import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import { ThemeColors } from "../../types/theme-colors.type";
import { NgClass } from "@angular/common";

@Component({
    selector: 'mui-tabs',
    templateUrl: './mui-tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class MuiTabsComponent {
    title = signal('tab');
    readonly classNames = computed<string[]>(() => this.generateTabClasses());
    readonly disabled = signal(false);
    readonly color = input<ThemeColors>('primary');
    readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');

    private generateTabClasses(): string[] {
        const base = 'inline-flex items-center cursor-pointer select-none';
    
        const states = {
          disabled: this.disabled() ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
        };
    
        return [
          base,
          states.disabled
        ];
      }

}