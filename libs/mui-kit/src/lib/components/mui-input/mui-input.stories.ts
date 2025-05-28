import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { MuiInputComponent } from './mui-input.component';

const meta: Meta<MuiInputComponent> = {
  title: 'Mui/Input',
  component: MuiInputComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div class="sb-row">
        <mui-input ${argsToTemplate(args)} />
      </div>
    `,
  }),
  args: {
    placeholder: 'Placeholder',
    id: 'inputId'
  },
  argTypes: {}
};

export default meta;

type Story = StoryObj<MuiInputComponent>;

export const Primary: Story = {
  args: {
    placeholder: 'Primary',
    id: 'primary',
  },
};
