import { typescript } from '@betterer/typescript';
import { eslint } from '@betterer/eslint';

export default {
  'stricter compilation': () =>
    typescript('../tsconfig.json', {
      strict: true,
    }).include('../src/**'),
  'no imports from kiama': () =>
    eslint({}).include(['../src/**/*.js', '../src/**/*.jsx', '../src/**/*.ts', '../src/**/*.tsx']),
};
