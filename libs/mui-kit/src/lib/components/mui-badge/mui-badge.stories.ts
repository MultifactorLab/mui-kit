import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { THEME_COLORS_ARRAY, THEME_COLORS_STRING } from '../../constants/theme-colors.constants';
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
  args: { color: 'primary' },
  argTypes: {
    color: {
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: THEME_COLORS_STRING }
      },
      options: THEME_COLORS_ARRAY,
      control: { type: 'select' },
    }
  },
};

export default meta;

type Story = StoryObj<MuiBadgeComponent>;

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
