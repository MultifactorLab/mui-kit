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
    variant: 'primary',
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
    variant: {
      description: 'Button variant',
      options: ['primary', 'secondary', 'danger'],
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
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    disabled: false,
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    disabled: false
  }
};

export const DisabledPrimary: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: 'secondary',
    disabled: true,
  },
};

export const DisabledSuccess: Story = {
  args: {
    variant: 'success',
    disabled: true,
  },
};

export const DisabledDanger: Story = {
  args: {
    variant: "danger",
    disabled: true,
  }
};
