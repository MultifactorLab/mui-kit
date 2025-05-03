import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { THEME_COLORS_ARRAY, THEME_COLORS_STRING } from '../../types/theme-colors.type';
import { THEME_SIZES_ARRAY, THEME_SIZES_STRING } from '../../types/theme-sizes.type';
import { MuiButtonComponent } from './mui-button.component';

const meta: Meta<MuiButtonComponent> = {
  title: 'Mui/Button',
  component: MuiButtonComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <mui-button ${argsToTemplate(args)}>
        Button
      </mui-button>
    `,
  }),
  args: {
    backgroundColor: 'primary',
    disabled: false,
    size: 'md',
  },
  argTypes: {
    backgroundColor: {
      options: THEME_COLORS_ARRAY,
      table: {
        defaultValue: {
          summary: 'primary',
        },
        type: {
          summary: THEME_COLORS_STRING,
        }
      },
      control: { type: 'select' },
    },
    disabled: {
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
      control: { type: 'boolean' },
    },
    size: {
      options: THEME_SIZES_ARRAY,
      table: {
        defaultValue: {
          summary: 'md',
        },
        type: {
          summary: THEME_SIZES_STRING,
        }
      },
      control: { type: 'select' },
    },
  }
};

export default meta;

type Story = StoryObj<MuiButtonComponent>;

export const Primary: Story = {
  args: {
    backgroundColor: 'primary',
    disabled: false,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    backgroundColor: 'primary',
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    backgroundColor: 'secondary',
    disabled: false,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    backgroundColor: 'secondary',
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    backgroundColor: 'success',
    disabled: false,
  },
};

export const SuccessDisabled: Story = {
  args: {
    backgroundColor: 'success',
    disabled: true,
  },
};

export const Danger: Story = {
  args: {
    backgroundColor: "danger",
    disabled: false
  }
};

export const DangerDisabled: Story = {
  args: {
    backgroundColor: "danger",
    disabled: true,
  }
};
