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
      <div class="sb-row">
        <mui-button ${argsToTemplate(args)}>Button</mui-button>
      </div>
    `,
  }),
  args: {
    backgroundColor: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
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
    loading: {
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        }
      },
      control: { type: 'boolean' },
    }
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

export const Secondary: Story = {
  args: {
    backgroundColor: 'secondary',
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    backgroundColor: 'success',
    disabled: false,
  },
};

export const Danger: Story = {
  args: {
    backgroundColor: "danger",
    disabled: false
  }
};
