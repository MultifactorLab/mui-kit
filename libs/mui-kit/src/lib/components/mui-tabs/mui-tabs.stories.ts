import { Meta, StoryObj } from '@storybook/angular';
import { MuiTabsComponent } from './mui-tabs.component';
import { MuiTabDirective } from './mui-tab.directive';
import { moduleMetadata } from '@storybook/angular';
import { MuiTabControlPanelDirective } from './mui-tab-control-panel.directive';

const meta: Meta<MuiTabsComponent> = {
  title: 'MUI/Tabs',
  component: MuiTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [MuiTabDirective, MuiTabControlPanelDirective]
    }),
  ],
  tags: ['autodocs'],
  args: {
    size: 'md'
  }
};

export default meta;
type Story = StoryObj<MuiTabsComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mui-tabs [size]="size">
        <div *muiTab="'Overview'">
          <p>This is the content of the first tab.</p>
        </div>
        <div *muiTab="'Details'">
          <p>More details in the second tab.</p>
        </div>
        <div *muiTab="'Settings'">
          <p>Settings content in the third tab.</p>
        </div>
        <div *muiTabControlPanel>
          test
        </div>
      </mui-tabs>
    `
  })
};

export const LargeSize: Story = {
  args: {
    size: 'lg'
  },
  render: Default.render
};

export const SmallSize: Story = {
  args: {
    size: 'sm'
  },
  render: Default.render
};
