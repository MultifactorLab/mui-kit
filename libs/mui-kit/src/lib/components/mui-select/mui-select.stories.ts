import { MuiSelectOptionComponent } from './option/mui-select-option.component';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MuiSelectComponent } from './mui-select.component';


const meta: Meta<MuiSelectComponent> = {
  title: 'Mui/Select',
  component: MuiSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [MuiSelectOptionComponent],
    })
  ],
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div>
        <mui-select ${argsToTemplate(args)} >
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
          <mui-select-option></mui-select-option>
        </mui-select>
      </div>
    `,
  }),
  args: {
    label: 'Select label',
    value: 'Selected value',
  },
  argTypes: {
    value: {
      control: 'text'
    }
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
