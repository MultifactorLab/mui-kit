export type SelectValue<T> = T | T[] | null;

export type DisplayWithFn<T> = (value: T) => string | number;

export type CompareWithFn<T> = (v1: T | null, v2: T | null) => boolean;
