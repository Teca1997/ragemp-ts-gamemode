const random = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

const ConsoleColors: any = {
	Red: '\x1b[31m',
	Green: '\x1b[32m',
	Yellow: '\x1b[33m',
	Blue: '\x1b[34m'
};

export const Utils = {
	random,
	ConsoleColors
};
