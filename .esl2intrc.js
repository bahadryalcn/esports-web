module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsdoc/recommended',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    '@tanstack/query',
    'unused-imports',
    'jsdoc',
    'import',
    'react',
    'react-hooks',
    'jsx-a11y',

    // 🔒 GÜVENLİK PLUGIN'LERİ
    'security',
    'no-secrets',
    'anti-trojan-source',
  ],
  rules: {
    // Mevcut kurallarınız
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'prefer-template': 'warn',
    'newline-before-return': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*'],
      },
    ],

    // React kuralları
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/display-name': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Import kuralları
    'import/no-anonymous-default-export': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/named': 'error',
    'import/no-unused-modules': 'off',
    'unused-imports/no-unused-imports': 'warn',

    // JSDoc kuralları
    'jsdoc/require-param': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/check-param-names': 'warn',
    'jsdoc/require-returns-type': 'warn',
    'jsdoc/no-defaults': 'off',
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/require-returns-check': 'off',
    'jsdoc/check-types': 'off',
    'jsdoc/tag-lines': 'off',
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/valid-types': 'off',
    'jsdoc/check-tag-names': [
      'warn',
      {
        definedTags: [
          'remarks',
          'component',
          'componentDescription',
          'componentName',
          'componentType',
          'componentUsage',
          'componentVersion',
          'function',
          'helper',
          'hook',
          'method',
          'module',
        ],
      },
    ],

    // Accessibility kuralları
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',

    // Formatting kuralları
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: true,
        beforeBlockComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['export'], next: ['*'] },
      {
        blankLine: 'always',
        prev: ['*'],
        next: ['multiline-const', 'multiline-let', 'multiline-var', 'export'],
      },
    ],

    // 🔒 GÜVENLİK KURALLARI

    // Genel güvenlik kuralları
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-optional-chaining': 'error',

    // XSS ve injection koruması
    'security/detect-eval-with-expression': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-non-literal-require': 'error',
    'security/detect-pseudoRandomBytes': 'error',
    'security/detect-unsafe-regex': 'off',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-object-injection': 'off',
    'security/detect-new-buffer': 'error',
    'security/detect-bidi-characters': 'error',

    // Sır bilgilerin korunması
    'no-secrets/no-secrets': [
      'error',
      {
        tolerance: 4.6,
      },
    ],

    // Trojan kaynak saldırılarına karşı koruma
    'anti-trojan-source/no-bidi': 'error',

    // React güvenlik kuralları
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': [
      'error',
      {
        enforceDynamicLinks: 'always',
        allowReferrer: false,
      },
    ],

    // Prototype pollution koruması
    'no-prototype-builtins': 'error',
    'no-extend-native': 'error',

    // Console ve debug koruması (production için)
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Import güvenliği
    'import/no-dynamic-require': 'error',
    'import/no-webpack-loader-syntax': 'error',

    // Regex güvenliği
    'no-invalid-regexp': 'error',
    'no-regex-spaces': 'error',

    // DOM güvenliği
    'no-global-assign': 'error',
    'no-implicit-globals': 'error',

    // Strict mode zorlama
    strict: ['error', 'never'], // Modern modüller için

    // Variable güvenliği
    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef-init': 'error',

    // Function güvenliği
    'no-caller': 'error',
    'no-constructor-return': 'error',
    'no-empty-function': 'off',
    'no-extra-bind': 'error',
    'no-implicit-coercion': 'warn',
    'no-iterator': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-void': 'error',
    'no-with': 'error',

    // Promise güvenliği
    'no-async-promise-executor': 'error',
    'no-promise-executor-return': 'error',
    'require-atomic-updates': 'error',

    // JSON güvenliği
    'no-unsafe-negation': 'error',

    // Timing attack koruması
    'security/detect-possible-timing-attacks': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['src', './src']],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      // Test dosyaları için gevşetilmiş kurallar
      files: ['**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx'],
      rules: {
        'no-console': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        'security/detect-child-process': 'off',
      },
    },
    {
      // Config dosyaları için gevşetilmiş kurallar
      files: ['*.config.js', 'config/*.js', 'scripts/*.js'],
      rules: {
        'no-console': 'off',
        'security/detect-non-literal-require': 'off',
      },
    },
  ],
};
