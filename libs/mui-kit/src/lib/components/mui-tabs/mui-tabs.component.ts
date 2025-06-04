import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, computed, input, signal, ViewEncapsulation, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuiTabDirective } from './mui-tab.directive';
import { MuiTabControlPanelDirective } from './mui-tab-control-panel.directive';

@Component({
  selector: 'mui-tabs',
  templateUrl: './mui-tabs.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MuiTabsComponent {
  readonly selectedIndex = signal(0);
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  @ContentChildren(MuiTabDirective) tabs!: QueryList<MuiTabDirective>;

  readonly tabHeaders = computed(() => this.tabs.toArray().map(tab => tab.label));
  @ContentChild(MuiTabControlPanelDirective) controlPanelRef?: MuiTabControlPanelDirective;

  selectTab(index: number): void {
    console.log(this.controlPanelRef);
    this.selectedIndex.set(index);
  }

  readonly containerClasses = computed(() => [
    'flex flex-col flex-1 justify-start',
    this.size() === 'lg' ? 'gap-4' : this.size() === 'sm' ? 'gap-1' : 'gap-2'
  ]);
}
