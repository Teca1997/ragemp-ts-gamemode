const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
dotenv.config();

const outputPath = path.join(__dirname, '../../client_packages');

const pathToModules = path.join(__dirname, '../../node_modules');
const nodeExternals = require('webpack-node-externals');

const entryPath = path.join(__dirname, './index.ts');
const configPath = path.join(__dirname, './tsconfig.json');
const sourcePath = path.join(__dirname, './');

module.exports = {
	mode: 'development',
	entry: {
		client: entryPath
	},
	devtool: 'inline-source-map',
	target: ['web', 'es5'],
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		preferRelative: true,
		plugins: [new TsconfigPathsPlugin({ configFile: configPath, baseUrl: sourcePath })],
		extensions: ['.ts', '.js']
		//modules: [pathToModules]
	},
	watch: true,
	output: {
		path: outputPath,
		filename: 'index.js',
		clean: true
	},
	optimization: {
		minimize: false
	}
};
