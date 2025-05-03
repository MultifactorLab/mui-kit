import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
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
    color: 'primary',
    disabled: false,
  },
  argTypes: {
    disabled: {
      description: 'Disable the button',
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
    color: {
      description: 'Button variant',
      options: ['primary', 'secondary', 'success', 'danger'],
      table: {
        defaultValue: {
          summary: 'primary',
        }
      },
      control: { type: 'inline-radio' },
    },
  }
};

export default meta;
type Story = StoryObj<MuiButtonComponent>;

export const Primary: Story = {
  args: {
    color: 'primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    disabled: false,
  },
};

export const Danger: Story = {
  args: {
    color: "danger",
    disabled: false
  }
};

export const DisabledPrimary: Story = {
  args: {
    color: 'primary',
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    color: 'secondary',
    disabled: true,
  },
};

export const DisabledSuccess: Story = {
  args: {
    color: 'success',
    disabled: true,
  },
};

export const DisabledDanger: Story = {
  args: {
    color: "danger",
    disabled: true,
  }
};
