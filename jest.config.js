module.exports = {
    transform: { // runs all tests through babel first
      "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
    },
    moduleNameMapper: { // mocks static assets and css stylesheets
      ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`], // ignore these directories
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`], // ignore gatsby's untranspiled es6 code
    globals: {
      __PATH_PREFIX__: ``,
    },
    testURL: `http://localhost`, // some dom apis do not work well with default 'about:blank'
    setupFiles: [`<rootDir>/loadershim.js`], // set global - file will be included before all tests are run   
  }