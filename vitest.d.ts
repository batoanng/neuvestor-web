declare module 'vitest' {
    interface Assertion<T = Date | string> {
      toEqualDate(expected: T): void;
    }
  
    interface AsymmetricMatchersContaining {
      toEqualDate(expected: Date | string): void;
    }
  } 