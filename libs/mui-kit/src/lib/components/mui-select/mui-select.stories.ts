import { MuiSelectOptionComponent } from './components/mui-select-option/mui-select-option.component';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
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
      <div class="sb-row">
        <mui-select label="First select" value="niels">
          <mui-select-option value="albert">Albert Einstein</mui-select-option>
          <mui-select-option value="niels">Niels Bohr</mui-select-option>
          <mui-select-option value="marie">Marie Curie</mui-select-option>
          <mui-select-option disabled value="isaac">Isaac Newton</mui-select-option>
        </mui-select>

        <mui-select label="Second select" value="albert" closeOnSelectionChange>
          <mui-select-option value="albert">Albert Einstein</mui-select-option>
          <mui-select-option disabled value="niels">Niels Bohr</mui-select-option>
          <mui-select-option value="marie">Marie Curie</mui-select-option>
          <mui-select-option value="isaac">Isaac Newton</mui-select-option>
        </mui-select>
      </div>
    `,
  }),
  args: {
    label: 'Select label',
    value: 'niels',
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
