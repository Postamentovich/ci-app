const babelConfigForTooling = require('./babel.config').env.tooling;

require('@babel/register')({
    ...babelConfigForTooling,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = require('./postcss.config.ts').default;
