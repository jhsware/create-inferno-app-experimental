---
id: adding-a-router
title: Adding a Router
---

Create Inferno App doesn't prescribe a specific routing solution, but [Inferno Router](https://infernotraining.com/inferno-router/web/) is the most popular one.

To add it, run:

```sh
npm install --save inferno-router-dom
```

Alternatively you may use `yarn`:

```sh
yarn add inferno-router-dom
```

To try it, delete all the code in `src/App.js` and replace it with any of the examples on its website. The [Basic Example](https://infernotraining.com/inferno-router/web/example/basic) is a good place to get started.

Note that [you may need to configure your production server to support client-side routing](deployment.md#serving-apps-with-client-side-routing) before deploying your app.
