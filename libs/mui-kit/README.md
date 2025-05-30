# mui-kit

Комплексная библиотека UI-компонентов, созданная с использованием Angular и TailwindCSS, предоставляющая набор многоразовых и настраиваемых компонентов для современных веб-приложений.

## Обзор

mui-kit — это библиотека UI-компонентов, использующая возможности TailwindCSS для стилизации и настройки. Она предоставляет набор предварительно разработанных компонентов, которые следуют единым принципам дизайна и могут быть легко настроены в соответствии с фирменным стилем вашего приложения.

## Особенности

- Создана с использованием Angular и TailwindCSS
- Настраиваемые цветовые схемы и размеры
- Адаптивный дизайн
- Компоненты с фокусом на доступность
- Поддержка темного режима

## Установка

```bash
pnpm install @mflab/mui-kit
```

## Использование

Импортируйте компоненты mui-kit в ваше Angular-приложение:

```typescript
import { MuiButtonComponent } from '@mflab/mui-kit';

@Component({
  // ...
  imports: [
    // ...
    MuiButtonComponent,
    // ...
  ]
  template: `
    <!-- other template -->
    <mui-button>Button component</mui-button>
    <!-- other template -->
  `,
})
export class AppComponent { /* your code */}
```

## Настройка

### Переменные цветов

mui-kit использует CSS-переменные для цветов, которые следуют этому шаблону:

```
--mui-{type}-{variant}-{degree}
```

Где:
- **type**: color, bg-color, border-color
- **variant**: primary, secondary, success, danger, warning, info
- **degree**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

**Примечание**: Тип "color" является базовым типом, от которого производятся другие типы цветов (bg-color, border-color).

Пример:
```css
:root {
  /* Основные цвета */
  --mui-color-primary-500: #3879b4;

  /* Цвета фона */
  --mui-bg-color-primary-500: var(--mui-color-primary-500);

  /* Цвета границ */
  --mui-border-color-primary-500: var(--mui-color-primary-500);
}
```

Для настройки цветов переопределите эти переменные в вашем CSS:

```css
:root {
  --mui-color-primary-500: #ff0000; /* Изменить основной цвет на красный */
}
```

### Переменные размеров

mui-kit использует CSS-переменные для размеров, которые следуют этому шаблону:

```
--mui-{type}-{variant}
```

Где:
- **type**: spacing, screen, border-width, radius
- **variant**: Зависит от типа (см. ниже)

#### Варианты по типам:

1. **screen**: sm, md, lg, xl, 2xl
2. **radius**: xs, sm, (по умолчанию), md, lg, xl, 2xl, 3xl
3. **border-width**: 0, (по умолчанию), 2, 4, 8
4. **spacing**: 
   - от 0.5 до 4 (шаг 0.5)
   - от 4 до 12 (шаг 1)
   - 12, 14, 16
   - от 16 до 64 (шаг 4)
   - 72, 80, 96

Пример:
```css
:root {
  /* Отступы */
  --mui-spacing-4: 1rem;

  /* Радиус границ */
  --mui-border-radius: 0.25rem;
  --mui-border-radius-lg: 0.5rem;

  /* Ширина границ */
  --mui-border-width: 1px;
  --mui-border-width-2: 2px;
}
```

Для настройки размеров переопределите эти переменные в вашем CSS:

```css
:root {
  --mui-spacing-4: 1.25rem; /* Увеличить базовый отступ */
  --mui-border-radius: 0.5rem; /* Увеличить радиус границы по умолчанию */
}
```

## Интеграция с TailwindCSS

mui-kit построена на основе TailwindCSS и расширяет его функциональность с помощью пользовательских переменных. Вы можете использовать классы TailwindCSS вместе с компонентами mui-kit для дополнительной настройки.
