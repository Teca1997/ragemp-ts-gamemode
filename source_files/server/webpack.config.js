const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals');
dotenv.config();
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const outputPath = path.join(__dirname, '../../packages/gamemode');
const pathToModules = path.join(__dirname, '../../node_modules');

const entryPath = path.join(__dirname, './index.ts');
const configPath = path.join(__dirname, './tsconfig.json');
const sourcePath = path.join(__dirname, './');

module.exports = {
	entry: {
		server: entryPath
	},
	devtool: 'inline-source-map',
	target: 'node',
	mode: 'development',
	externals: [
		nodeExternals({
			modulesDir: pathToModules
		})
	],
	module: {
		rules: [
			{
				test: /\.ts?$/,
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
	output: {
		path: outputPath,
		filename: 'index.js'
	}
};
