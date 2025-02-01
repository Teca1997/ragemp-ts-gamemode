const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals');
dotenv.config();

const outputPath = path.join(__dirname, '../../packages/gamemode');

const pathToModules = path.join(__dirname, '../../node_modules');

module.exports = {
	entry: {
		server: path.join(__dirname, './index.ts')
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
