import path from 'path';
import paths from '../paths';

const getDependencyPath = (dependencyName: string) =>
    path.join(__dirname, '..', '..', 'node_modules', dependencyName);

export default {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.css'],
    modules: paths.resolveModules,
    alias: {

        'react': require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
        'react-router': getDependencyPath('react-router'),
        'react-router-dom': getDependencyPath('react-router-dom'),
    },
};
