import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/dist',
      'storybook-static',
      'coverage',
      '**/node_modules',
      'packages/tokens/src/normalized',
      'wiki/.next',
      'wiki/out',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
      },
    },
  },
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
  },
  {
    // A Wiki é uma aplicação Next autônoma dentro do monorepo. Ela segue as
    // mesmas regras de tipo do resto do repositório; só dois ajustes fazem
    // sentido no contexto dela.
    files: ['wiki/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        // Sem isto o serviço de projeto não encontra wiki/tsconfig.json e tipa
        // a Wiki com um projeto padrão frouxo — o lint passa a discordar do
        // `tsc`, apontando como código morto guardas que o build exige.
        projectService: true,
        tsconfigRootDir: `${import.meta.dirname}/wiki`,
      },
    },
    rules: {
      // Regra de Fast Refresh do Vite. No App Router, exportar `metadata` ou
      // `generateStaticParams` ao lado do componente é o padrão do framework.
      'react-refresh/only-export-components': 'off',
      // Interpolar número em template é inequívoco e aparece em toda página de
      // documentação (contagens, razões de contraste, medidas).
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    },
  },
  {
    files: [
      '*.config.{js,ts}',
      '.storybook/**/*.ts',
      'packages/*/scripts/**/*.ts',
      'packages/*/style-dictionary.config.ts',
    ],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
);
