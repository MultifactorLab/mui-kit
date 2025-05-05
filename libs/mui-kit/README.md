# mui-kit

A comprehensive UI component library built with Angular and TailwindCSS, providing a set of reusable and customizable components for modern web applications.

## Overview

mui-kit is a UI component library that leverages the power of TailwindCSS for styling and customization. It provides a set of pre-designed components that follow consistent design patterns and can be easily customized to match your application's branding.

## Features

- Built with Angular and TailwindCSS
- Customizable color schemes and sizing
- Responsive design
- Accessibility-focused components
- Dark mode support

## Installation

```bash
npm install @your-org/mui-kit
```

## Usage

Import the mui-kit module in your Angular application:

```typescript
import { MuiKitModule } from '@your-org/mui-kit';

@NgModule({
  imports: [
    MuiKitModule
  ],
  // ...
})
export class AppModule { }
```

## Customization

### Color Variables

mui-kit uses CSS variables for colors that follow this pattern:

```
--mui-{type}-{variant}-{degree}
```

Where:
- **type**: color, bg-color, border-color
- **variant**: primary, secondary, success, danger, warning, info
- **degree**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

**Note**: The "color" type is the base type from which other color types (bg-color, border-color) are derived.

Example:
```css
:root {
  /* Primary colors */
  --mui-color-primary-500: #3879b4;
  
  /* Background colors */
  --mui-bg-color-primary-500: var(--mui-color-primary-500);
  
  /* Border colors */
  --mui-border-color-primary-500: var(--mui-color-primary-500);
}
```

To customize colors, override these variables in your CSS:

```css
:root {
  --mui-color-primary-500: #ff0000; /* Change primary color to red */
}
```

### Size Variables

mui-kit uses CSS variables for sizes that follow this pattern:

```
--mui-{type}-{variant}
```

Where:
- **type**: spacing, screen, border-width, radius
- **variant**: Depends on the type (see below)

#### Variants by type:

1. **screen**: sm, md, lg, xl, 2xl
2. **radius**: xs, sm, (default), md, lg, xl, 2xl, 3xl
3. **border-width**: 0, (default), 2, 4, 8
4. **spacing**: 
   - 0.5 to 4 (step 0.5)
   - 4 to 12 (step 1)
   - 12, 14, 16
   - 16 to 64 (step 4)
   - 72, 80, 96

Example:
```css
:root {
  /* Spacing */
  --mui-spacing-4: 1rem;
  
  /* Border radius */
  --mui-border-radius: 0.25rem;
  --mui-border-radius-lg: 0.5rem;
  
  /* Border width */
  --mui-border-width: 1px;
  --mui-border-width-2: 2px;
}
```

To customize sizes, override these variables in your CSS:

```css
:root {
  --mui-spacing-4: 1.25rem; /* Increase base spacing */
  --mui-border-radius: 0.5rem; /* Increase default border radius */
}
```

## Integration with TailwindCSS

mui-kit is built on top of TailwindCSS and extends its functionality with custom variables. You can use TailwindCSS classes alongside mui-kit components for additional customization.

## License

MIT
