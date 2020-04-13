module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "camelcase": "off",
    "@typescript-eslint/camelcase": "off",
    'no-plusplus': 'off',
    'react/jsx-boolean-value': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/prop-types': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: ['react-native'],
      },
    ],
  },
};
