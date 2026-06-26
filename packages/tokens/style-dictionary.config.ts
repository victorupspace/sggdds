import type { Config } from 'style-dictionary/types';

import { nativeHooks } from './style-dictionary.native';

const config: Config = {
  usesDtcg: true,
  source: ['src/normalized/**/*.tokens.json'],
  hooks: nativeHooks,
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ds',
      buildPath: 'dist/css/',
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
      buildPath: 'dist/json/',
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
    ios: {
      // SwiftUI deliverables. References are resolved (no outputReferences) so the
      // generated enums hold concrete values consumable without the token graph.
      transforms: ['attribute/cti', 'name/camel', 'sggd/swift/color', 'sggd/swift/dimension'],
      buildPath: '../../platforms/ios/Sources/SGGDTokens/',
      files: [
        {
          destination: 'DSTokens.swift',
          format: 'sggd/swift',
        },
      ],
    },
    android: {
      // Android XML value resources (res/values).
      transforms: ['attribute/cti', 'name/snake', 'sggd/android/color', 'sggd/android/dimension'],
      prefix: 'ds',
      buildPath: '../../platforms/android/sggd-tokens/src/main/res/values/',
      files: [
        { destination: 'ds_colors.xml', format: 'sggd/android-colors' },
        { destination: 'ds_dimens.xml', format: 'sggd/android-dimens' },
        { destination: 'ds_integers.xml', format: 'sggd/android-integers' },
        { destination: 'ds_strings.xml', format: 'sggd/android-strings' },
      ],
    },
  },
};

export default config;
