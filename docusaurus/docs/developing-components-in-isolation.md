---
id: developing-components-in-isolation
title: Developing Components in Isolation
---

Usually, in an app, you have a lot of UI components, and each of them has many different states.
For an example, a basic button component could have the following states:

- In a regular state, with a text label.
- In the disabled mode.
- In a loading state.

Usually, it’s hard to see these states without running a sample app or some examples.

Create Inferno App doesn’t include any tools for this by default, but you can add [Storybook for Inferno](https://storybook.js.org) ([source](https://github.com/storybooks/storybook)) or [Inferno Styleguidist](https://inferno-styleguidist.js.org/) ([source](https://github.com/styleguidist/inferno-styleguidist)) to your project. **These are third-party tools that let you develop components and see all their states in isolation from your app**.

![Storybook for Inferno Demo](https://i.imgur.com/7CIAWpB.gif)

You can also deploy your Storybook or style guide as a static app. This way, everyone in your team can view and review different states of UI components without starting a backend server or creating an account in your app.

## Getting Started with Storybook

Storybook is a development environment for Inferno UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.

Run the following command inside your app’s directory:

```sh
npx -p @storybook/cli sb init
```

After that, follow the instructions on the screen.

Learn more about Inferno Storybook:

- [Learn Storybook (tutorial)](https://learnstorybook.com)
- [Documentation](https://storybook.js.org/basics/introduction/)
- [GitHub Repo](https://github.com/storybooks/storybook)
- [Snapshot Testing UI](https://github.com/storybooks/storybook/tree/master/addons/storyshots) with Storybook + addon/storyshot

## Getting Started with Styleguidist

Styleguidist combines a style guide, where all your components are presented on a single page with their props documentation and usage examples, with an environment for developing components in isolation, similar to Storybook. In Styleguidist you write examples in Markdown, where each code snippet is rendered as a live editable playground.

First, install Styleguidist:

```sh
npm install --save inferno-styleguidist
```

Alternatively you may use `yarn`:

```sh
yarn add inferno-styleguidist
```

Then, add these scripts to your `package.json`:

```diff
   "scripts": {
+    "styleguide": "styleguidist server",
+    "styleguide:build": "styleguidist build",
     "start": "inferno-scripts start",
```

Then, run the following command inside your app’s directory:

```sh
npm run styleguide
```

After that, follow the instructions on the screen.

Learn more about Inferno Styleguidist:

- [GitHub Repo](https://github.com/styleguidist/inferno-styleguidist)
- [Documentation](https://inferno-styleguidist.js.org/docs/getting-started.html)
