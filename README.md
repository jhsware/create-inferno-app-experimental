# Create Inferno  App

** work in progress **

Current state: You can start the sample app using `npm run start` and `npm run build`. Hot reloading of JS is not working.

This is how you test the project:

```
$ git clone git@github.com:jhsware/create-inferno-app-experimental.git
$ cd create-inferno-app-experimental
$ npm i
$ npm run start
```

The application code is in `packages/cia-template/template/src` and available commands are:

```
$ npm run start
$ npm run build
```

Development and releasing info: https://github.com/facebook/create-react-app/blob/main/CONTRIBUTING.md

## DEV NOTES:

We are probably closer to JS hot restart than hot reload

STARTED: Test features (help wanted, suggested solutions would be nice)
- STARTED: hot reloading - maintains state
  - DONE: css-changes triggers hot reloading
  - TODO: js changes do not trigger hot reloading
    - requires porting react-refresh
- TODO: hot restart - updates code but returns to initial state
  - TODO: js changes do not trigger hot restart (INVESTIGATE: @havunen suggest forceUpdate has been used before)
- build for server-side rendering (development/production)
- eject
- source-maps working for server-side debugging
- using typescript

### Issues with `npm run start`
TODO: `npm run start` rebuilds on changes but does not update in browser
  - The file updates in devtools but change isn't reflected in DOM (try changing a text in the page)
  - To get hot reloading we probably need to port:
    - https://github.com/pmmmwh/react-refresh-webpack-plugin
    - https://github.com/facebook/react/tree/main/packages/react-refresh
  
TODO: We should support inferno-compat
  - adding aliases as in old version of create-inferno-app breaks because we have refs to react (possibly due to react-refresh)

### Other issues
TODO: Figure out publishing workflow and settings

TODO: Depends on react-refresh for robust hot reloading

TODO: Switch from node-sass to dart-sass?

### DONE
DEFER: Fix types "@types/react": "*",
  (if this is a problem we will hear about it)

DEFER: Fix types  "types": "./lib/react-app.d.ts",
  (if this is a problem we will hear about it)

DEFER: Do we really need to import Inferno to use JSX in browser? (commit 8a95d60ec)
  (it is working so lets be happy with that)

- DONE build for production
  - Inferno is in production mode
  - source maps are working
- DONE source-maps working in browser
  - available in dev mode
  - available in prod mode

DONE: Go through commits on old version to see if we have missed something
  - compared all files to diff of changes done for v7 

DONE: `npm run start` uses Inferno in production build, should use development build
- index.esm.js:4 You are running production build of Inferno in development mode. Use dev:module entry point.

DONE: In browser we get: You are running production build of Inferno in development mode. Use dev:module entry point. (the old fix fails https://github.com/infernojs/create-inferno-app/blob/5e8c486752bbd8a7bd99609fd90ddb449b5b08e6/packages/inferno-scripts/config/webpack.config.dev.js#L154)

DONE: Switched logo

DONE: Go  through all imports

DONE: Remove all refs to react-dom (currently referenced from @testing-library/react")

DONE: Investigate how to handle package dep
- DONE prop-types (removed but left proptype defs as comments)
- DONE @testing-library/react (removed)
- DONE @babel/plugin-transform-react-display-name (removed)
- DONE @babel/preset-react (removed)
  - DONE try: babel-preset-inferno-app (does this need updating?)
- DONE babel-plugin-transform-react-remove-prop-types (removed)
- DONE eslint-plugin-react (changed to eslint-plugin-inferno)
- DONE eslint-plugin-react-hooks (removed)
- DEFER @pmmmwh/react-refresh-webpack-plugin (kept as is for now)
- DEFER react-refresh (kept as is for now)

DONE: How to handle createContext() in iframeScript.js? (implemented as class component)

DONE: packages/cra-template-typescript — not referenced anywhere?

DONE: REACT -> INFERNO

DONE: React -> Inferno