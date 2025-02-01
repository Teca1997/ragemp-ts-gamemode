const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
dotenv.config();

const outputPath = path.join(__dirname, '../../client_packages');

const pathToModules = path.join(__dirname, '../../node_modules');
const nodeExternals = require('webpack-node-externals');

const entryPath = path.join(__dirname, './index.ts');
const configPath = path.join(__dirname, './tsconfig.json');
const sourcePath = path.join(__dirname, './');

module.exports = {
	entry: {
		client: entryPath
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
				exclude: pathToModules
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js'],
		modules: [pathToModules]
	},
	output: {
		path: outputPath,
		filename: 'index.js'
	}
};
