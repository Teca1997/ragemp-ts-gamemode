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
