---
id: adding-typescript
title: Adding TypeScript
---

> Note: this feature is available with `inferno-scripts@2.1.0` and higher.

[TypeScript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to plain JavaScript.

## Installation

To start a new Create Inferno App project with [TypeScript](https://www.typescriptlang.org/), you can run:

```sh
npx create-inferno-app my-app --template typescript

# or

yarn create inferno-app my-app --template typescript
```

> If you've previously installed `create-inferno-app` globally via `npm install -g create-inferno-app`, we recommend you uninstall the package using `npm uninstall -g create-inferno-app` or `yarn global remove create-inferno-app` to ensure that `npx` always uses the latest version.
>
> Global installs of `create-inferno-app` are no longer supported.

To add [TypeScript](https://www.typescriptlang.org/) to an existing Create Inferno App project, first install it:

```sh
npm install --save typescript @types/node @types/inferno @types/jest

# or

yarn add typescript @types/node @types/inferno @types/jest
```

Next, rename any file to be a TypeScript file (e.g. `src/index.js` to `src/index.tsx`) and **restart your development server**!

Type errors will show up in the same console as the build one. You'll have to fix these type errors before you continue development or build your project. For advanced configuration, [see here](advanced-configuration.md).

## Getting Started with TypeScript and Inferno

You are not required to make a [`tsconfig.json` file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), one will be made for you. You are allowed to edit the generated TypeScript configuration.

- [TypeScript Handbook](https://www.typescriptlang.org/)
- [TypeScript Example on Inferno](https://www.typescriptlang.org/play/index.html?jsx=2&esModuleInterop=true&e=196#example/typescript-with-inferno)
- [Inferno + TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/inferno-typescript-cheatsheet#infernotypescript-cheatsheets) has a good overview on how to use Inferno with TypeScript

## Troubleshooting

If your project is not created with TypeScript enabled, npx may be using a cached version of `create-inferno-app`. Remove previously installed versions with `npm uninstall -g create-inferno-app` or `yarn global remove create-inferno-app` (see [#6119](https://github.com/facebook/create-inferno-app/issues/6119#issuecomment-451614035)).

If you are currently using [create-inferno-app-typescript](https://github.com/wmonk/create-inferno-app-typescript/), see [this blog post](https://vincenttunru.com/migrate-create-inferno-app-typescript-to-create-inferno-app/) for instructions on how to migrate to Create Inferno App.

Constant enums and namespaces are not supported, you can learn about the constraints of [using Babel with TypeScript here](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats).
