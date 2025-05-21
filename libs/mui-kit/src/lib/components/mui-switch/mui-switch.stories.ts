import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { THEME_COLORS_ARRAY, THEME_COLORS_STRING } from '../../constants/theme-colors.constants';
import { MuiSwitchComponent } from './mui-switch.component';

const meta: Meta<MuiSwitchComponent> = {
  title: 'Mui/Switch',
  component: MuiSwitchComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div class="sb-row">
        <mui-switch ${argsToTemplate(args)}>
          <span>Switch Label</span>
          <span>Switch Label</span>
        </mui-switch>
        <mui-switch ${argsToTemplate(args)}>
          <span>Switch Label</span>
          <span>Switch Label</span>
        </mui-switch>
      </div>
    `,
  }),
  args: {
    align: 'center',
    size: 'md',
    color: 'primary',
  },
  argTypes: {
    align: {
      options: ['start', 'center', 'end'],
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: 'start|center|end' },
      },
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs|sm|md|lg' },
      },
      control: { type: 'select' },
    },
    color: {
      options: THEME_COLORS_ARRAY,
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: THEME_COLORS_STRING }
      },
      control: { type: 'select' },
    },
  }
};

export default meta;

type Story = StoryObj<MuiSwitchComponent>;

export const Primary: Story = {
  args: { color: 'primary' },
};

export const Secondary: Story = {
  args: { color: 'secondary' },
};

export const Success: Story = {
  args: { color: 'success' },
};

export const Danger: Story = {
  args: { color: "danger" }
};

export const Warning: Story = {
  args: { color: "warning" }
};

export const Info: Story = {
  args: { color: "info" }
};

export const WithMultipleElements: Story = {
  args: { color: 'primary' },
  render: (args) => ({
    props: args,
    template: `
      <div class="sb-row">
        <mui-switch ${argsToTemplate(args)}>
          <span>First element</span>
          <span>Second element</span>
        </mui-switch>
      </div>
    `,
  }),
};
