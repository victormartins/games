React & Webpack 4 From Scratch - No CLI
https://www.youtube.com/watch?v=deyxI-6C2u4

```
npm init
npm install react react-dom
```
#### Webpack will bundle our assets together. Eg: multiple JS files into one.
```
npm install --save-dev webpack webpack-dev-server webpack-cli
```
#### Babel will transpile our JS code into browser frieldly JS.
This allows us to compile ES6 and later versions of JS not yet supported.
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react html-webpack-plugin

#### Now we need to create webpack config file
webpack.config.js
  - Also added src/index.html which will be the template that html-webpack-plugin will use to generate our html pages inside the /dist folder.

  #### Configured Babel
  Added `.babelrc` with the presets we installed with npm install.

  #### Added the main App React Component
  `src/components/app.js`

  #### Added the two scripts to the package.js
  - `npm run start` - to run the webpack-web-server
  `webpack-dev-server --mode development --open --hot`
  - `npm build build` - to build the /dist folder
  `webpack --model production`

  #### Added Jest
  `npm instal --save-dev jest`