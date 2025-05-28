import { Meta, StoryObj } from "@storybook/angular";
import { MuiTabsComponent } from "./mui-tabs.component"
import { THEME_COLORS_ARRAY, THEME_COLORS_STRING } from "../../constants/theme-colors.constants";
const meta: Meta<MuiTabsComponent> = {
    title: "MUI/Tabs",
    component: MuiTabsComponent,
    render: (args) => ({
        props: args,
        template: `
        <mui-tabs>
            <mui-tab>
              test1
            </mui-tab>
            <mui-tab>
              test2
            </mui-tab>
        </mui-tabs>`
    }),
    args: {
        color: 'primary',
        size: 'md',
    },
    argTypes: {
        color: {
            options: THEME_COLORS_ARRAY,
            table: {
                defaultValue: { summary: 'primary' },
                type: { summary: THEME_COLORS_STRING }
            },
            control: { type: 'select' },
        },
        size: {
            options: ['xs', 'sm', 'md', 'lg'],
            table: {
              defaultValue: { summary: 'md' },
              type: { summary: 'xs|sm|md|lg' },
            },
            control: { type: 'select' },
        },
    }
}

export default meta;


type Story = StoryObj<MuiTabsComponent>;

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

export const Warning: Story = {
  args: { color: "warning" }
};

export const Info: Story = {
  args: { color: "info" }
};
 