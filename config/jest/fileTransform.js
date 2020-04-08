/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/*! © CREATE-REACT-APP */

'use strict';

const path = require('path');

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
    process(src, filename) {
        return `module.exports = ${JSON.stringify(path.basename(filename))};`;
    },
};
