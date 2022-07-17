import jetpack from 'fs-jetpack';
import path from 'path';
import {
	config
} from 'dotenv';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';
import {
	swc
} from 'rollup-plugin-swc3';
import jsonPlugin from '@rollup/plugin-json';
import {
	blueBright,
	greenBright,
	redBright
} from 'colorette';
import builtinModules from 'builtin-modules';
import commonjsPlugin from '@rollup/plugin-commonjs';
import tsPaths from 'rollup-plugin-tsconfig-paths';
import typescriptPlugin from 'rollup-plugin-typescript2';
import {
	terser
} from 'rollup-plugin-terser';

config({
	path: path.resolve('.env')
});

const buildOutput = 'build';
const isProduction = process.env.PRODUCTION_MODE === 'true';
const useSWC = process.env.COMPILER_USE_SWC === 'true';
const sourcePath = path.resolve('src');
const pkgJson = jetpack.read('package.json', 'json');
const localInstalledPackages = [...Object.keys(pkgJson.dependencies)];

function resolvePath(pathParts) {
	return jetpack.path(...pathParts);
}

function successMessage(message, type = 'Success') {
	console.log(`[${greenBright(type)}] ${message}`);
}

function errorMessage(message, type = 'Error') {
	console.log(`[${redBright(type)}] ${message}`);
}

function copy(source, destination, options = {
	overwrite: true
}) {
	return jetpack.copy(source, destination, options);
}

function cleanUp() {
	if (!jetpack.exists(buildOutput)) {
		return;
	}

	const preserved = [
		'node_modules/**/*',
		'ragemp-server*',
		'.env',
		'BugTrap-x64.dll',
		'bin/**/*',
		'dotnet/**/*',
		'maps/**/*',
		'plugins/**/*',
		'client_packages/**/*',
		'pnpm-lock.yaml',
		'package-lock.json',
		'yarn.lock',
		'savedposplayer.txt'
	];

	const removeablePaths = jetpack.find('build', {
		matching: preserved.map((path) => `!${path}`),
		directories: false
	});

	removeablePaths.forEach((path) => {
		jetpack.remove(path);
		errorMessage(path, 'Removed');
	});
}

function copyFiles() {
	const prepareForCopy = [];

	prepareForCopy.push({
		from: jetpack.path('package.json'),
		to: jetpack.path(buildOutput, 'package.json')
	}, {
		from: jetpack.path('.env'),
		to: jetpack.path(buildOutput, '.env')
	}, {
		from: jetpack.path('conf.json'),
		to: jetpack.path(buildOutput, 'conf.json')
	});

	prepareForCopy.forEach((item) => {
		copy(item.from, item.to);
		successMessage(blueBright(`${item.from} -> ${item.to}`), 'Copied');
	});
}

cleanUp();
copyFiles();

const terserMinify =
	isProduction && !useSWC ?
	terser({
		keep_classnames: true,
		keep_fnames: true,
		output: {
			comments: false
		}
	}) : [];

const generateConfig = (options = {}) => {
	const {
		isServer
	} = options;

	const outputFile = isServer ?
		resolvePath([buildOutput, 'packages', 'core', 'index.js']) :
		resolvePath([buildOutput, 'client_packages', 'index.js']);

	const serverPlugins = [];
	const plugins = [terserMinify];

	const external = [...builtinModules, ...localInstalledPackages];
	const tsConfigPath = resolvePath([sourcePath, isServer ? 'server' : 'client', 'tsconfig.json']);

	return {
		input: resolvePath([sourcePath, isServer ? 'server' : 'client', 'index.ts']),
		output: {
			file: outputFile,
			format: 'cjs'
		},
		plugins: [
			tsPaths({
				tsConfigPath
			}),
			nodeResolvePlugin(),
			jsonPlugin(),
			commonjsPlugin(),
			useSWC ?
			swc({
				tsconfig: tsConfigPath,
				minify: isProduction,
				jsc: {
					target: 'es2020',
					parser: {
						syntax: 'typescript',
						dynamicImport: true,
						decorators: true
					},
					transform: {
						legacyDecorator: true,
						decoratorMetadata: true
					},
					externalHelpers: true,
					keepClassNames: true,
					loose: true
				}
			}) :
			typescriptPlugin({
				check: false,
				tsconfig: tsConfigPath
			}),
			isServer ? [...serverPlugins] : null,
			...plugins
		],
		external: isServer ? [...external] : null,
		inlineDynamicImports: true
	};
};

export default [generateConfig({
	isServer: true
}), generateConfig({
	isServer: false
})];