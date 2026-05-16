import type { Config } from 'style-dictionary/types';

const config: Config = {
  usesDtcg: true,
  source: ['src/foundations/tokens/normalized/**/*.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ds',
      buildPath: 'src/foundations/tokens/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            showFileHeader: false,
          },
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'src/foundations/tokens/build/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json',
          options: {
            stripMeta: true,
          },
        },
      ],
    },
  },
};

export default config;
