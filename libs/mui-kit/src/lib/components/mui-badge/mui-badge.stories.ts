import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { THEME_COLORS_ARRAY, THEME_COLORS_STRING } from '../../types/theme-colors.type';
import { MuiBadgeComponent } from './mui-badge.component';

const meta: Meta<MuiBadgeComponent> = {
  title: 'Mui/Badge',
  component: MuiBadgeComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <mui-badge ${argsToTemplate(args)}>
        Badge
      </mui-badge>
    `,
  }),
  args: {
    backgroundColor: 'primary',
  },
  argTypes: {
    backgroundColor: {
      table: {
        defaultValue: {
          summary: 'primary'
        },
        type: {
          summary: THEME_COLORS_STRING,
        }
      },
      options: THEME_COLORS_ARRAY,
      control: { type: 'select' },
    }
  },
};

export default meta;

type Story = StoryObj<MuiBadgeComponent>;

export const Primary: Story = {
  args: {
    backgroundColor: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    backgroundColor: 'secondary',
  },
};

export const Success: Story = {
  args: {
    backgroundColor: 'success',
  },
};

export const Danger: Story = {
  args: {
    backgroundColor: "danger",
  }
};
