export type ThemeColorsBase = 'primary' | 'secondary';

export type ThemeColorsStates = 'success' | 'danger' | 'warning' | 'info';

export type ThemeColors = ThemeColorsBase | ThemeColorsStates;

export const THEME_COLORS_STRING = 'primary|secondary|success|danger|warning|info';

export const THEME_COLORS_ARRAY: ThemeColors[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
