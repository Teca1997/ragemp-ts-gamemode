const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
dotenv.config();

const outputPath = path.join(__dirname, '../../compiled_server_files/client_packages');

const pathToModules = path.join(__dirname, '../../node_modules');

const entryPath = path.join(__dirname, './index.ts');
const configPath = path.join(__dirname, './tsconfig.json');
const sourcePath = path.join(__dirname, './');
console.log(outputPath);

module.exports = {
	entry: {
		app: entryPath
	},
	devtool: 'inline-source-map',
	target: 'node',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: pathToModules
			}
		]
	},
	output: {
		path: outputPath,
		filename: '[name].js',
		chunkFilename: '[name].bundle.js',
		clean: true
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
};
