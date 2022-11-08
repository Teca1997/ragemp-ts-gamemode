import { betweenRadians, getCoords, getRadians, getSquareSize } from 'interaction_menu_API/utils';

export class Menu {
	items: any;
	maxItems: any;
	selected: any;
	itemScale: any;
	wheelScale: any;
	radius: number;
	relSize: any;
	relWheelSize: any;
	color: RGBA;
	hoverColor: RGBA;
	wheelTexture: [string, string];
	backgroundTexture: [string, string];
	coords: any;
	/**
	 * @param {Number} [maxItems] Max amount of items that will show when the menu is open.
	 * @param {Number} [itemScale] Size of each selectable item in the menu.
	 * @param {Number} [wheelScale] Size of texture in the center of the menu.
	 * @param {Number} [radius] Size of each selectable item in the menu.
	 * @param {RGBA} [color] Default color for all items (unless altered for each individual item added)
	 * @param {RGBA} [hoverColor] Default hover color for all items (unless altered for each individual item added)
	 * @param {Array} [wheelTexture] [textureDict, textureName] of the menu's center.
	 * @param {Array} [backgroundTexture] [textureDict, textureName] of the optional background for items.
	 */
	constructor(
		maxItems: number = 8,
		itemScale: number = 3,
		wheelScale: number = 6.5,
		radius: number = 0.05,
		color: RGBA = [255, 255, 255, 155],
		hoverColor: RGBA = [255, 255, 255, 255],
		wheelTexture: [string, string] = ['', ''],
		backgroundTexture: [string, string] = ['mpinventory', 'in_world_circle']
	) {
		this.items = [];
		this.maxItems = maxItems;
		this.selected;
		this.itemScale = itemScale;
		this.wheelScale = wheelScale;
		this.radius = radius;
		this.relSize = getSquareSize(this.itemScale);
		this.relWheelSize = getSquareSize(this.wheelScale);
		this.color = color;
		this.hoverColor = hoverColor;
		this.wheelTexture = wheelTexture;
		this.backgroundTexture = backgroundTexture;
		this.coords = getCoords(this.radius, this.maxItems);
		this.loadTextures();
	}
	/**
	 * @param {String} name Item identifier.
	 * @param {String} textureDict Item icon texture dictionary.
	 * @param {String} textureName Item icon texture name.
	 * @param {Boolean} [background] Whether the item should have the optional background (recommended for icons without backgrounds).
	 * @param {Boolean} [closeMenu] Whether the menu should be closed on item select.
	 * @param {RGBA} [color] Color for the item in the menu (default takes color from the menu).
	 * @param {RGBA} [hoverColor] Hover color for the item in the menu (default takes hover color from the menu).
	 * @param {Function} callback Callback to execute on item select.
	 */
	add(name: string, textureDict: string, textureName: string, background = false, closeMenu = true, color = this.color, hoverColor = this.hoverColor, callback: Function) {
		if (background == undefined) background = true;

		mp.game.graphics.requestStreamedTextureDict(textureDict, true);
		if (this.items.length >= this.maxItems) return;
		this.items.push({
			name: name,
			textureDict: textureDict,
			textureName: textureName,
			background: background,
			closeMenu: closeMenu,
			color: color,
			hoverColor: hoverColor,
			onClick: function () {
				callback();
			}
		});
	}
	render() {
		var radial = getRadians(mp.gui.cursor.position[0], mp.gui.cursor.position[1]);
		if (this.wheelTexture[0] != '' && this.wheelTexture[1] != '') {
			mp.game.graphics.drawSprite(
				this.wheelTexture[0],
				this.wheelTexture[1],
				0.5,
				0.5,
				this.relWheelSize.sizeX,
				this.relWheelSize.sizeY,
				0,
				this.color[0],
				this.color[1],
				this.color[2],
				this.color[3],
				false
			);
		}
		this.selected = null;
		this.coords.forEach((coord: any, i: number) => {
			if (this.items[i] && mp.game.graphics.hasStreamedTextureDictLoaded(this.items[i].textureDict)) {
				var color = this.items[i].color;
				if (betweenRadians(radial, coord.range.min, coord.range.max)) {
					this.selected = i;
					color = this.items[i].hoverColor;
					mp.game.graphics.drawText(this.items[i].name, [0.5, 0.85], {
						font: 0,
						color: [255, 255, 255, 255],
						scale: [0.5, 0.5],
						outline: true
					});
				}
				mp.game.graphics.drawSprite(
					this.items[i].textureDict,
					this.items[i].textureName,
					coord.x,
					coord.y,
					this.relSize.sizeX,
					this.relSize.sizeY,
					0,
					color[0],
					color[1],
					color[2],
					color[3],
					false
				);
				if (this.items[i].background)
					mp.game.graphics.drawSprite(
						this.backgroundTexture[0],
						this.backgroundTexture[1],
						coord.x,
						coord.y,
						this.relSize.sizeX,
						this.relSize.sizeY,
						0,
						this.color[0],
						this.color[1],
						this.color[2],
						this.color[3],
						false
					);
			}
		});
		mp.game.controls.disableControlAction(1, 1, true);
		mp.game.controls.disableControlAction(1, 2, true);
		mp.game.controls.disableControlAction(32, 24, true);
	}
	select() {
		if (this.selected != null) {
			this.items[this.selected].onClick();
			return this.items[this.selected].closeMenu;
		} else return false;
	}
	loadTextures() {
		mp.game.graphics.requestStreamedTextureDict(this.wheelTexture[0], true);
		mp.game.graphics.requestStreamedTextureDict(this.backgroundTexture[0], true);
	}
}
