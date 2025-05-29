import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { MuiInputComponent } from './mui-input.component';
import { INPUT_VARIANTS_ARRAY, INPUT_VARIANTS_STRINGS } from './mui-input.constants';

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
    id: 'inputId',
    type: 'text',
  },
  argTypes: {
    type: {
      options: INPUT_VARIANTS_ARRAY,
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: INPUT_VARIANTS_STRINGS },
      },
      control: { type: 'select' },
    },
  }
};

export default meta;

type Story = StoryObj<MuiInputComponent>;

export const Text: Story = {
  args: {
    placeholder: 'Text',
    id: 'text',
    type: 'text'
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Password',
    id: 'password',
    type: 'password'
  },
};

export const Number: Story = {
  args: {
    placeholder: 'Number',
    id: 'number',
    type: 'number'
  },
};

export const Email: Story = {
  args: {
    placeholder: 'Email',
    id: 'email',
    type: 'email'
  },
};

export const URL: Story = {
  args: {
    placeholder: 'URL',
    id: 'url',
    type: 'url'
  },
};
