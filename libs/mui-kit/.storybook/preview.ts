import { withThemeByClassName } from '@storybook/addon-themes';
import { Decorator } from '@storybook/angular';

export const decorators: Decorator[] = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
  })
]
