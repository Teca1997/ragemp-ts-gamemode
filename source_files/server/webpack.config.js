const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals');
dotenv.config();
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const outputPath = path.join(__dirname, '../../packages');
const pathToModules = path.join(__dirname, '../../node_modules');

const entryPath = path.join(__dirname, './index.ts');
const configPath = path.join(__dirname, './tsconfig.json');
const sourcePath = path.join(__dirname, './');

module.exports = {
	entry: {
		server: entryPath
	},
	devtool: 'source-map',
	target: 'node',
	mode: 'development',
	externals: [nodeExternals({ modulesDir: pathToModules })],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: [pathToModules]
			}
		]
	},
	resolve: {
		plugins: [new TsconfigPathsPlugin({ configFile: configPath, baseUrl: sourcePath })],
		extensions: ['.ts', '.js'],
		modules: [pathToModules]
	},
	plugins: [
		/* new webpack.HotModuleReplacementPlugin() */
	],
	watch: true,
	output: {
		path: outputPath,
		filename: '[name]/index.js',
		clean: true
	}
};
