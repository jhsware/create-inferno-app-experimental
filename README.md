# Create Inferno  App

** work in progress **

Current state: You can start the sample app using `npm run start`

## DEV NOTES:

TODO: Depends on react-refresh for robust hot reloading

TODO: Fix types "@types/react": "*",

TODO: Fix types  "types": "./lib/react-app.d.ts",

TODO: Switch from node-sass to dart-sass?

### DONE
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