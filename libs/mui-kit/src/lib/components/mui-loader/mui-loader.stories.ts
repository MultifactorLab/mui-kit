import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { THEME_SIZES_ARRAY, THEME_SIZES_STRING } from '../../types/theme-sizes.type';
import { MuiLoaderComponent } from './mui-loader.component';

const meta: Meta<MuiLoaderComponent> = {
  title: 'Mui/Loader',
  component: MuiLoaderComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div class="sb-row">
        <mui-loading ${argsToTemplate(args)}>Кнопка с длинным называнием</mui-loading>
      </div>
    `,
  }),
  args: {
    size: 'md',
  },
  argTypes: {
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
    }
  },
};

export default meta;

type Story = StoryObj<MuiLoaderComponent>;

export const Large: Story = {
  args: {
    size: 'lg'
  },
};

export const Medium: Story = {
  args: {
    size: 'md'
  },
};

export const Small: Story = {
  args: {
    size: 'sm'
  },
};

export const XSmall: Story = {
  args: {
    size: 'xs'
  },
};
