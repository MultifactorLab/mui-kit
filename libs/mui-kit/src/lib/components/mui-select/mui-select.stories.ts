import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { MuiSelectComponent } from './mui-select.component';

const meta: Meta<MuiSelectComponent> = {
  title: 'Mui/Select',
  component: MuiSelectComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div class="sb-row">
        <mui-mui-select ${argsToTemplate(args)} />
      </div>
    `,
  }),
  args: {
    // Default args will be added as the component evolves
  },
  argTypes: {
    // ArgTypes will be added as the component evolves
  }
};

export default meta;

type Story = StoryObj<MuiSelectComponent>;

export const Default: Story = {
  args: {
    // Specific args for this story will be added as the component evolves
  },
};
