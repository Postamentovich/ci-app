// import React from 'react';
import path from "path";
import express from "express";
import chalk from "chalk";
import manifestHelpers from "express-manifest-helpers";
import paths from "../../config/paths";
import errorHandler from "./middleware/error-handler";
import serverRenderer from "./middleware/server-renderer";

require("dotenv").config();

const app = express();

app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(express.json());

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    })
);

app.use("/api/settings", require("./routes/settings-route"));

app.use("/api/builds", require("./routes/build-route"));

app.use(serverRenderer());

app.use(errorHandler);

app.listen(process.env.PORT || 8500, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: http://localhost:${process.env.PORT || 8500}`)
    );
});

export default app;
