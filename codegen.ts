import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://inctagram.work/api/v1/graphql',
  documents: ['src/shared/api/queries/**/*.ts'],
  generates: {
    'src/shared/api/types.ts': {
      plugins: ['typescript'],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'shared/api/types.ts',
      },
      plugins: ['typescript-operations'],
      config: {
        withHooks: true,
      },
    },
  },
}
export default config

// import type { CodegenConfig } from '@graphql-codegen/cli'
//
// const config: CodegenConfig = {
//   schema:  'https://inctagram.work/api/v1/graphql',
//   documents: ['src/**/*.tsx'],
//   generates: {
//     './src/gql/': {
//       preset: 'client',
//     }
//   }
// }
// export default config

// const config: CodegenConfig = {
//   schema: "https://inctagram.work/api/v1/graphql",
//   documents: ["src/**/*.tsx"],
//   generates: {
//     "./src/__generated__/": {
//       preset: "client",
//       presetConfig: {
//         gqlTagName: "gql",
//       },
//     },
//   },
//   ignoreNoDocuments: true,
// };
// export default config