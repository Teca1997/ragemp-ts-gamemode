const enableDebug = true;

export const debug = (info: string) => {
	if (!enableDebug) return;
	mp.gui.chat.push(`[DEBUG] ${info}`);
};

export const getSquareSize = (scale: number) => {
	var { x, y } = mp.game.graphics.getScreenActiveResolution(x, y);
	const ratio = x / y;
	var sizeX = 0.01 * scale;
	var sizeY = 0.01 * scale * ratio;
	return { sizeX, sizeY };
};

export const getCoords = (radius: number, points: number) => {
	var { x, y } = mp.game.graphics.getScreenActiveResolution(x, y);
	var coords = [];
	var radians = 0;
	var increment = (2 * Math.PI) / points;
	const center = { x: 0.5, y: 0.5 };
	const ratio = x / y;
	for (let i = 0; i < points; i++) {
		let x = radius * Math.cos(radians) + center.x;
		let y = center.y - radius * Math.sin(radians) * ratio;
		coords.push({ x: x, y: y, range: { min: radians - increment / 2, max: radians + increment / 2 } });
		radians += increment;
	}
	return coords;
};

export const getRadians = (pointerX: number, pointerY: number) => {
	var { x, y } = mp.game.graphics.getScreenActiveResolution(x, y);
	var centeredX = pointerX - x / 2;
	var centeredY = y / 2 - pointerY;
	if (Math.sign(centeredX) == 1) centeredX = Math.min(centeredX, y / 2);
	else if (Math.sign(centeredX) == -1) centeredX = Math.max(centeredX, -1 * (y / 2));
	if (Math.sign(Math.atan2(centeredY, centeredX)) == -1) return Math.atan2(centeredY, centeredX) + 2 * Math.PI;
	else return Math.atan2(centeredY, centeredX);
};

export const betweenRadians = (x: number, min: number, max: number) => {
	if (Math.sign(min) == -1) return (x >= 2 * Math.PI + min && x <= 2 * Math.PI) || (x >= 0 && x <= max);
	return x >= min && x <= max;
};
