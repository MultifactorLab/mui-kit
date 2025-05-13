import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { THEME_COLORS_ARRAY, THEME_COLORS_STRING } from '../../constants/theme-colors.constants';
import { THEME_SIZES_ARRAY, THEME_SIZES_STRING } from '../../constants/theme-sizes.constants';
import { MuiButtonComponent } from './mui-button.component';
import { BUTTON_VARIANTS_ARRAY, BUTTON_VARIANTS_STRINGS } from './mui-button.constants';

const meta: Meta<MuiButtonComponent> = {
  title: 'Mui/Button',
  component: MuiButtonComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div class="sb-row">
        <mui-button ${argsToTemplate(args)}>Button</mui-button>
        <mui-button href="t.me/example" role="link" ${argsToTemplate(args)}>Link</mui-button>
      </div>
    `,
  }),
  args: {
    variant: 'rounded',
    color: 'primary',
    size: 'md',
    disabled: false
  },
  argTypes: {
    variant: {
      options: BUTTON_VARIANTS_ARRAY,
      table: {
        defaultValue: { summary: 'rounded' },
        type: { summary: BUTTON_VARIANTS_STRINGS },
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
    size: {
      options: THEME_SIZES_ARRAY,
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: THEME_SIZES_STRING }
      },
      control: { type: 'select' },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  }
};

export default meta;

type Story = StoryObj<MuiButtonComponent>;

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
