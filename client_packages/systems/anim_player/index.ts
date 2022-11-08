import { animation_list } from 'systems/anim_player/animation_list';

class AnimationPlayer {
	launched: boolean;
	currentList: AnimationListItem[];
	allList: AnimationListItem[];
	dist: number;
	name: number;
	request: string;
	flag: number;
	autoPlay: boolean;

	constructor() {
		this.launched = false;
		this.currentList = [];
		this.allList = animation_list;
		this.dist = 0;
		this.name = 0;
		this.request = '';
		this.flag = 1;
		this.autoPlay = true;
	}

	toggle(subString = '') {
		if (!this.launched) {
			this.createCurrentList(subString);
			this.flag = 1;
			this.launched = true;
		} else {
			this.play(false);
			this.launched = false;
		}
	}

	play(toggle = true) {
		if (this.launched) {
			mp.events.callRemote('animationEvent', toggle, this.currentList[this.dist].DictionaryName, this.currentList[this.dist].Animations[this.name], this.flag);
		}
	}

	createCurrentList(subString = '') {
		this.currentList = [];
		this.dist = 0;
		this.name = 0;
		if (subString == null) {
			this.request = '';
			this.currentList = this.allList;
			if (this.launched && this.autoPlay) this.play();
		} else {
			this.request = subString == null ? '' : subString;
			for (let idx = 0; idx < this.allList.length; idx++) {
				if (this.allList[idx].DictionaryName.indexOf(subString) != -1) {
					this.currentList.push(this.allList[idx]);
				} else {
					let animations: AnimationListItem = { DictionaryName: this.allList[idx].DictionaryName, Animations: [] };
					for (let i = 0; i < this.allList[idx].Animations.length; i++) {
						if (this.allList[idx].Animations[i].indexOf(subString) != -1) {
							animations.Animations.push(this.allList[idx].Animations[i]);
							//list[2] = idx;
						}
					}
					if (animations.Animations.length) this.currentList.push(animations);
				}
			}
			if (this.currentList.length) {
				if (this.launched && this.autoPlay) this.play();
			} else mp.gui.chat.push(`Nothing found on request '${subString}'`);
		}
	}

	setFlag(value: string) {
		if (this.launched) {
			if (value === 'up') this.flag += 1;
			else if (value === 'down' && this.flag - 1 !== 0) this.flag -= 1;
			else mp.gui.chat.push('Flag is not valid!');
			if (this.autoPlay) this.play();
		} else mp.gui.chat.push("You can't set flag. First open AnimPlayer");
	}

	change(dist: number, name: number) {
		try {
			if (this.currentList.length > 1) {
				if (dist > this.currentList.length - 1) this.dist = dist - this.currentList.length;
				else if (dist < 0) this.dist = dist + this.currentList.length;
				else this.dist = dist;
				this.name = 0;
			}
			if (this.currentList[this.dist].Animations.length > 1) {
				mp.gui.chat.push('called change name' + Date.now());
				if (name > this.currentList[this.dist].Animations.length - 1) this.name = name - this.currentList[this.dist].Animations.length;
				else if (name < 0) this.name = name + this.currentList[this.dist].Animations.length;
				else this.name = name;
			}
			if (this.autoPlay) this.play();
		} catch (error) {
			mp.gui.chat.push('error ' + error);
		}
	}
}

const AP = new AnimationPlayer();

mp.events.add({
	render: () => {
		if (AP.launched && AP.currentList.length > 0) {
			const dist = AP.currentList[AP.dist].DictionaryName;
			const nameList = AP.currentList[AP.dist].Animations;
			const name = nameList[AP.name];
			const flag = AP.flag;

			const infoListDist = `(${AP.dist + 1}/${AP.currentList.length})`;
			const infoListName = `(${AP.name + 1}/${AP.currentList[AP.dist].Animations.length})`;
			const infoRequest = AP.request.length ? `~b~Request : '${AP.request}'` : '~b~All';

			mp.game.graphics.drawText(`Animation: ${infoListDist} ${infoListName} | ${infoRequest}`, [0.5, 0.04], {
				font: 4,
				color: [255, 255, 255, 200],
				scale: [0.5, 0.5],
				outline: !0
			});

			//Draw prew name dist
			const namePrev = AP.name - 1 >= 0 ? nameList[AP.name - 1] : false;
			if (namePrev)
				mp.game.graphics.drawText(`~y~${dist} ~w~| ~b~${namePrev}`, [0.5, 0.08], {
					font: 4,
					color: [255, 255, 255, 100],
					scale: [0.45, 0.45],
					outline: !0
				});

			//Draw current name dist
			mp.game.graphics.drawText(`~y~${dist} ~w~| ~b~${name} ~r~( ${flag} )`, [0.5, 0.12], {
				font: 4,
				color: [255, 255, 255, 200],
				scale: [0.5, 0.5],
				outline: !0
			});

			//Draw next name dist
			const nameNext = AP.name + 1 < nameList.length ? nameList[AP.name + 1] : false;
			if (nameNext)
				mp.game.graphics.drawText(`~y~${dist} ~w~| ~b~${nameNext}`, [0.5, 0.16], {
					font: 4,
					color: [255, 255, 255, 100],
					scale: [0.45, 0.45],
					outline: !0
				});

			if (mp.keys.isDown(72) === true) {
				// H
				mp.game.graphics.drawText(`~w~LEFT/RIGHT change anim dist~n~`, [0.5, 0.75], {
					font: 4,
					color: [255, 255, 255, 200],
					scale: [0.5, 0.5],
					outline: !0
				});
				mp.game.graphics.drawText(`~w~CTRL + LEFT/RIGHT change anim dist on 100~n~`, [0.5, 0.78], {
					font: 4,
					color: [255, 255, 255, 200],
					scale: [0.5, 0.5],
					outline: !0
				});
				mp.game.graphics.drawText(`~w~SHIFT + LEFT/RIGHT change anim dist on 10~n~`, [0.5, 0.81], {
					font: 4,
					color: [255, 255, 255, 200],
					scale: [0.5, 0.5],
					outline: !0
				});
				mp.game.graphics.drawText(`~w~UP/DOWN change anim name~n~`, [0.5, 0.84], {
					font: 4,
					color: [255, 255, 255, 200],
					scale: [0.5, 0.5],
					outline: !0
				});
				mp.game.graphics.drawText(`~w~CTRL + UP/DOWN change anim flag~n~`, [0.5, 0.87], {
					font: 4,
					color: [255, 255, 255, 200],
					scale: [0.5, 0.5],
					outline: !0
				});
				mp.game.graphics.drawText(`~w~/animflag [up/down/number] change anim flag~n~`, [0.5, 0.9], {
					font: 4,
					color: [255, 255, 255, 200],
					scale: [0.5, 0.5],
					outline: !0
				});
				mp.game.graphics.drawText(`~w~/animplayer [request/dist/dist+name] create new anim list on request or find anim~n~`, [0.5, 0.93], {
					font: 4,
					color: [255, 255, 255, 200],
					scale: [0.5, 0.5],
					outline: !0
				});
			} else
				mp.game.graphics.drawText(`~w~Hold down H to browse help~n~`, [0.5, 0.93], {
					font: 4,
					color: [255, 255, 255, 100],
					scale: [0.45, 0.45],
					outline: !0
				});
		}
	},
	createAnimList: (string: string) => {
		mp.gui.chat.push('called');
		if (AP.launched) {
			AP.dist = 0;
			AP.name = 0;
			AP.createCurrentList(string);
		} else AP.toggle(string);
	}
});

mp.keys.bind(39, !1, function () {
	//Right
	if (AP.launched) {
		let dist = AP.dist;
		if (mp.keys.isDown(16) === true && AP.currentList.length > 100) dist += 10;
		else if (mp.keys.isDown(17) === true && AP.currentList.length > 100) dist += 100;
		else dist += 1;
		AP.change(dist, 0);
	}
});
mp.keys.bind(37, !1, function () {
	//Left
	if (AP.launched) {
		let dist = AP.dist;
		if (mp.keys.isDown(16) === true && AP.currentList.length > 100) dist -= 10;
		else if (mp.keys.isDown(17) === true && AP.currentList.length > 100) dist -= 100;
		else dist -= 1;
		AP.change(dist, 0);
	}
});
mp.keys.bind(38, !1, function () {
	//Up
	if (AP.launched) {
		if (mp.keys.isDown(17) === true) AP.setFlag('up');
		else AP.change(AP.dist, AP.name - 1);
	}
});
mp.keys.bind(40, !1, function () {
	//Down
	if (AP.launched) {
		if (mp.keys.isDown(17) === true) AP.setFlag('down');
		else AP.change(AP.dist, AP.name + 1);
	}
});
mp.keys.bind(32, !1, function () {
	//Space
	if (AP.launched && !AP.autoPlay) {
		AP.play(true);
	}
});
mp.keys.bind(8, !1, function () {
	//Backspace
	if (AP.launched && AP.request.length > 0) {
		AP.createCurrentList();
	}
});
mp.keys.bind(192, !1, function () {
	AP.toggle();
});
