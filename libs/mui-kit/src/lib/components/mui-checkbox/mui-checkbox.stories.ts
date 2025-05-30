import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { THEME_COLORS_ARRAY, THEME_COLORS_STRING } from '../../constants/theme-colors.constants';
import { MuiCheckboxComponent } from './mui-checkbox.component';

const meta: Meta<MuiCheckboxComponent> = {
  title: 'Mui/Checkbox',
  component: MuiCheckboxComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div class="sb-row">
        <mui-checkbox ${argsToTemplate(args)}>
          <span>Additional content</span>
        </mui-checkbox>
      </div>
    `,
  }),
  args: {
    align: 'center',
    size: 'md',
    color: 'primary',
    labelPosition: 'right',
    label: 'Checkbox Label',
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
    labelPosition: {
      options: ['left', 'right'],
      table: {
        defaultValue: { summary: 'right' },
        type: { summary: 'left|right' },
      },
      control: { type: 'select' },
    },
    label: {
      control: 'text',
    },
  }
};

export default meta;

type Story = StoryObj<MuiCheckboxComponent>;

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

export const LabelLeft: Story = {
  args: { labelPosition: 'left' },
};

export const LabelRight: Story = {
  args: { labelPosition: 'right' },
};

export const WithContentProjection: Story = {
  args: { label: '' },
  render: (args) => ({
    props: args,
    template: `
      <div class="sb-row">
        <mui-checkbox ${argsToTemplate(args)}>
          <span class="font-bold">Custom</span>
          <span class="text-mui-primary-500">Content</span>
        </mui-checkbox>
      </div>
    `,
  }),
};
