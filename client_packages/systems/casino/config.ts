const BlackJackSeatsOffsets = [
	{
		positionOffset: { xPos: -1.109130859375, yPos: 0.047607421875, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: 20.00000762939453 },
		seatIndex: 0
	},
	{
		positionOffset: { xPos: -0.448486328125, yPos: -0.62451171875, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: 70.0000228881836 },
		seatIndex: 1
	},
	{
		positionOffset: { xPos: 0.4501953125, yPos: -0.6259765625, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: 109.99998474121094 },
		seatIndex: 2
	},
	{
		positionOffset: { xPos: 1.109130859375, yPos: 0.032958984375, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: 160 },
		seatIndex: 3
	}
];

const RouletteSeatsOffsets = [
	{
		positionOffset: { xPos: 0.7684326171875, yPos: -0.869873046875, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: 89.9999771118164 },
		seatIndex: 0
	},
	{
		positionOffset: { xPos: 1.3795166015625, yPos: -0.126708984375, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: 179.9999542236328 },
		seatIndex: 1
	},
	{
		positionOffset: { xPos: 0.765625, yPos: 0.628662109375, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: -89.9999771118164 },
		seatIndex: 2
	},
	{
		positionOffset: { xPos: -0.2034912109375, yPos: -0.869873046875, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: 89.9999771118164 },
		seatIndex: 3
	}
];

const SlotSeatsOffset = [
	{
		positionOffset: { xPos: 0.002167, yPos: -0.752372, zPos: 0 },
		rotationOffset: { xRot: 0, yRot: 0, zRot: 89.9999757 },
		seatIndex: 0
	}
];

export const casinoSittables: any = {
	//blackjack tables
	'112404821': {
		prop: 'vw_prop_casino_blckjack_01',
		seats: BlackJackSeatsOffsets
	},
	'-2126678982': {
		prop: 'vw_prop_casino_blckjack_01b',
		seats: BlackJackSeatsOffsets
	},
	'1810615184': {
		prop: 'ch_prop_casino_blackjack_01a',
		seats: BlackJackSeatsOffsets
	},
	'-1650151675': {
		prop: 'ch_prop_casino_blackjack_01b',
		seats: BlackJackSeatsOffsets
	},
	'177789876': {
		prop: 'h4_prop_casino_blckjack_01a',
		seats: BlackJackSeatsOffsets
	},
	'248767530': {
		prop: 'h4_prop_casino_blckjack_01b',
		seats: BlackJackSeatsOffsets
	},
	'-552237906': {
		prop: 'h4_prop_casino_blckjack_01c',
		seats: BlackJackSeatsOffsets
	},
	'-322953213': {
		prop: 'h4_prop_casino_blckjack_01d',
		seats: BlackJackSeatsOffsets
	},
	'1284693927': {
		prop: 'h4_prop_casino_blckjack_01e',
		seats: BlackJackSeatsOffsets
	},
	//roulette tables
	'-2124909194': {
		prop: 'ch_prop_casino_roulette_01a',
		seats: RouletteSeatsOffsets
	},
	'1865404709': {
		prop: 'ch_prop_casino_roulette_01b',
		seats: RouletteSeatsOffsets
	},
	'623773339': {
		prop: 'vw_prop_casino_roulette_01',
		seats: RouletteSeatsOffsets
	},
	'-1273284377': {
		prop: 'vw_prop_casino_roulette_01b',
		seats: RouletteSeatsOffsets
	},

	//chairs
	'-1005355458': {
		prop: 'vw_prop_casino_track_chair_01',
		seats: [
			{
				positionOffset: { xPos: 0, yPos: 0, zPos: -0.2 },
				rotationOffset: { xRot: 0, yRot: 0, zRot: -90 },
				seatIndex: 0
			}
		]
	},
	'-1890304085': {
		prop: 'ch_prop_casino_chair_01a',
		seats: [
			{
				positionOffset: { xPos: 0, yPos: 0, zPos: 0 },
				rotationOffset: { xRot: 0, yRot: 0, zRot: 90 },
				seatIndex: 0
			}
		]
	},
	//slots
	'-1932041857': {
		prop: 'vw_prop_casino_slot_01a',
		seats: SlotSeatsOffset
	},
	'-1519644200': {
		prop: 'vw_prop_casino_slot_02a',
		seats: SlotSeatsOffset
	},
	'-430989390': {
		prop: 'vw_prop_casino_slot_03a',
		seats: SlotSeatsOffset
	},
	'654385216': {
		prop: 'vw_prop_casino_slot_04a',
		seats: SlotSeatsOffset
	},
	'1096374064': {
		prop: 'vw_prop_casino_slot_05a',
		seats: SlotSeatsOffset
	},
	'161343630': {
		prop: 'vw_prop_casino_slot_06a',
		seats: SlotSeatsOffset
	},
	'207578973': {
		prop: 'vw_prop_casino_slot_07a',
		seats: SlotSeatsOffset
	},
	'-487222358': {
		prop: 'vw_prop_casino_slot_07a',
		seats: SlotSeatsOffset
	}
};

export const blackjackPeds: any[] = [
	{
		position: new mp.Vector3(943.64599609375, 58.344364166259766, 75.9912338256836),
		heading: -76.99995422363281,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(942.5698852539062, 54.72734069824219, 75.9912338256836),
		heading: 13.00006103515625,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(947.2767944335938, 57.27137756347656, 75.9912338256836),
		heading: -166.99998950958252,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(946.1953735351562, 53.6458854675293, 75.9912338256836),
		heading: 103.00003051757812,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(972.8798828125, 31.56528091430664, 75.74127960205078),
		heading: 37.66499328613281,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(973.0443115234375, 35.70262145996094, 75.74127960205078),
		heading: -29.11334228515625,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(969.7205810546875, 34.849395751953125, 75.74127960205078),
		heading: 22.829818725585938,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(975.7317504882812, 33.660430908203125, 75.74127960205078),
		heading: -77.17210388183594,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(975.8789672851562, 30.074106216430664, 75.74127960205078),
		heading: -120.62105560302734,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(973.215087890625, 28.007461547851562, 75.74127960205078),
		heading: -177.072851896286,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(969.7581787109375, 28.782100677490234, 75.74127960205078),
		heading: 134.76596069335938,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(968.3218994140625, 31.765226364135742, 75.74127960205078),
		heading: 79.28500366210938,
		hash: 0x1422d45b
	}
];

export const roulettePeds: any[] = [
	{
		position: new mp.Vector3(987.1231079101562, 44.22126770019531, 75.9912338256836),
		heading: 128.00006103515625,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(982.237548828125, 46.34938430786133, 75.9912338256836),
		heading: -122.00005340576172,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(984.4735107421875, 39.98102569580078, 75.9912338256836),
		heading: 128.00006103515625,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(979.5879516601562, 42.1091423034668, 75.9912338256836),
		heading: -122.00005340576172,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(984.242431640625, 58.04450607299805, 75.49132537841797),
		heading: 104.14401245117188,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(988.4749145507812, 59.872222900390625, 75.4913330078125),
		heading: 58.000885009765625,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(987.32373046875, 63.924068450927734, 75.49132537841797),
		heading: 25.630325317382812,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(989.3824462890625, 54.189781188964844, 75.49132537841797),
		heading: -176.2263970375061,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(990.5704956054688, 58.35711669921875, 75.4913330078125),
		heading: -121.99917221069336,
		hash: 0x1422d45b
	},
	{
		position: new mp.Vector3(994.39794921875, 60.21149444580078, 75.49132537841797),
		heading: -77.55693054199219,
		hash: 0x1422d45b
	}
];

export const AnimDicts: string[] = [
	'anim_casino_b@amb@casino@games@shared@player',
	'anim_casino_b@amb@casino@games@shared@player@',
	'anim_casino_b@amb@casino@games@shared@dealer',
	'anim_casino_b@amb@casino@games@roulette@dealer',
	'anim_casino_b@amb@casino@games@roulette@dealer_female',
	'anim_casino_b@amb@casino@games@blackjack@dealer',
	'anim_casino_b@amb@casino@games@blackjack@dealer_female',
	'anim_casino_b@amb@casino@games@blackjack@dealer',
	'anim_casino_b@amb@casino@games@blackjack@dealer_female',
	'anim_casino_b@amb@casino@games@threecardpoker@dealer'
];
