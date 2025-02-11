export type HairColor = { id: number; hex: string; rgb: number[] };

type HairColors = HairColor[];

export const hairColors: HairColors = [
	{ id: 0, hex: '#1c1f21', rgb: [28, 31, 33] },
	{ id: 1, hex: '#272a2c', rgb: [39, 42, 44] },
	{ id: 2, hex: '#312e2c', rgb: [49, 46, 44] },
	{ id: 3, hex: '#35261c', rgb: [53, 38, 28] },
	{ id: 4, hex: '#4b321f', rgb: [75, 50, 31] },
	{ id: 5, hex: '#5c3b24', rgb: [92, 59, 36] },
	{ id: 6, hex: '#6d4c35', rgb: [109, 76, 53] },
	{ id: 7, hex: '#6b503b', rgb: [107, 80, 59] },
	{ id: 8, hex: '#765c45', rgb: [118, 92, 69] },
	{ id: 9, hex: '#7f684e', rgb: [127, 104, 78] },
	{ id: 10, hex: '#99815d', rgb: [153, 129, 93] },
	{ id: 11, hex: '#a79369', rgb: [167, 147, 105] },
	{ id: 12, hex: '#af9c70', rgb: [175, 156, 112] },
	{ id: 13, hex: '#bba063', rgb: [187, 160, 99] },
	{ id: 14, hex: '#d6b97b', rgb: [214, 185, 123] },
	{ id: 15, hex: '#dac38e', rgb: [218, 195, 142] },
	{ id: 16, hex: '#9f7f59', rgb: [159, 127, 89] },
	{ id: 17, hex: '#845039', rgb: [132, 80, 57] },
	{ id: 18, hex: '#682b1f', rgb: [104, 43, 31] },
	{ id: 19, hex: '#61120c', rgb: [97, 18, 12] },
	{ id: 20, hex: '#640f0a', rgb: [100, 15, 10] },
	{ id: 21, hex: '#7c140f', rgb: [124, 20, 15] },
	{ id: 22, hex: '#a02e19', rgb: [160, 46, 25] },
	{ id: 23, hex: '#b64b28', rgb: [182, 75, 40] },
	{ id: 24, hex: '#a2502f', rgb: [162, 80, 47] },
	{ id: 25, hex: '#aa4e2b', rgb: [170, 78, 43] },
	{ id: 26, hex: '#626262', rgb: [98, 98, 98] },
	{ id: 27, hex: '#808080', rgb: [128, 128, 128] },
	{ id: 28, hex: '#aaaaaa', rgb: [170, 170, 170] },
	{ id: 29, hex: '#c5c5c5', rgb: [197, 197, 197] },
	{ id: 30, hex: '#463955', rgb: [70, 57, 85] },
	{ id: 31, hex: '#5a3f6b', rgb: [90, 63, 107] },
	{ id: 32, hex: '#763c76', rgb: [118, 60, 118] },
	{ id: 33, hex: '#ed74e3', rgb: [237, 116, 227] },
	{ id: 34, hex: '#eb4b93', rgb: [235, 75, 147] },
	{ id: 35, hex: '#f299bc', rgb: [242, 153, 188] },
	{ id: 36, hex: '#04959e', rgb: [4, 149, 158] },
	{ id: 37, hex: '#025f86', rgb: [2, 95, 134] },
	{ id: 38, hex: '#023974', rgb: [2, 57, 116] },
	{ id: 39, hex: '#3fa16a', rgb: [63, 161, 106] },
	{ id: 40, hex: '#217c61', rgb: [33, 124, 97] },
	{ id: 41, hex: '#185c55', rgb: [24, 92, 85] },
	{ id: 42, hex: '#b6c034', rgb: [182, 192, 52] },
	{ id: 43, hex: '#70a90b', rgb: [112, 169, 11] },
	{ id: 44, hex: '#439d13', rgb: [67, 157, 19] },
	{ id: 45, hex: '#dcb857', rgb: [220, 184, 87] },
	{ id: 46, hex: '#e5b103', rgb: [229, 177, 3] },
	{ id: 47, hex: '#e69102', rgb: [230, 145, 2] },
	{ id: 48, hex: '#f28831', rgb: [242, 136, 49] },
	{ id: 49, hex: '#fb8057', rgb: [251, 128, 87] },
	{ id: 50, hex: '#e28b58', rgb: [226, 139, 88] },
	{ id: 51, hex: '#d1593c', rgb: [209, 89, 60] },
	{ id: 52, hex: '#ce3120', rgb: [206, 49, 32] },
	{ id: 53, hex: '#ad0903', rgb: [173, 9, 3] },
	{ id: 54, hex: '#880302', rgb: [136, 3, 2] },
	{ id: 55, hex: '#1f1814', rgb: [31, 24, 20] },
	{ id: 56, hex: '#291f19', rgb: [41, 31, 25] },
	{ id: 57, hex: '#2e221b', rgb: [46, 34, 27] },
	{ id: 58, hex: '#37291e', rgb: [55, 41, 30] },
	{ id: 59, hex: '#2e2218', rgb: [46, 34, 24] },
	{ id: 60, hex: '#231b15', rgb: [35, 27, 21] },
	{ id: 61, hex: '#020202', rgb: [2, 2, 2] },
	{ id: 62, hex: '#706c66', rgb: [112, 108, 102] },
	{ id: 63, hex: '#9d7a50', rgb: [157, 122, 80] }
];

type HairStyle = {
	id: number;
	drawable: number;
	name: string;
	collection: string;
	overlay: string;
};

export const hairStyleList: [HairStyle[], HairStyle[]] = [
	[
		{
			id: 0,
			drawable: 0,
			name: 'Close Shave',
			collection: 'mpbeach_overlays',
			overlay: 'FM_Hair_Fuzz'
		},
		{
			id: 1,
			drawable: 1,
			name: 'Buzzcut',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_001'
		},
		{
			id: 2,
			drawable: 2,
			name: 'Faux Hawk',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_002'
		},
		{
			id: 3,
			drawable: 3,
			name: 'Hipster',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_003'
		},
		{
			id: 4,
			drawable: 4,
			name: 'Side Parting',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_004'
		},
		{
			id: 5,
			drawable: 5,
			name: 'Shorter Cut',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_005'
		},
		{
			id: 6,
			drawable: 6,
			name: 'Biker',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_006'
		},
		{
			id: 7,
			drawable: 7,
			name: 'Ponytail',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_007'
		},
		{
			id: 8,
			drawable: 8,
			name: 'Cornrows',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_008'
		},
		{
			id: 9,
			drawable: 9,
			name: 'Slicked',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_009'
		},
		{
			id: 10,
			drawable: 10,
			name: 'Short Brushed',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_013'
		},
		{
			id: 11,
			drawable: 11,
			name: 'Spikey',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_002'
		},
		{
			id: 12,
			drawable: 12,
			name: 'Caesar',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_011'
		},
		{
			id: 13,
			drawable: 13,
			name: 'Chopped',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_012'
		},
		{
			id: 14,
			drawable: 14,
			name: 'Dreads',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_014'
		},
		{
			id: 15,
			drawable: 15,
			name: 'Long Hair',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_015'
		},
		{
			id: 16,
			drawable: 16,
			name: 'Shaggy Curls',
			collection: 'multiplayer_overlays',
			overlay: 'NGBea_M_Hair_000'
		},
		{
			id: 17,
			drawable: 17,
			name: 'Surfer Dude',
			collection: 'multiplayer_overlays',
			overlay: 'NGBea_M_Hair_001'
		},
		{
			id: 18,
			drawable: 18,
			name: 'Short Side Part',
			collection: 'multiplayer_overlays',
			overlay: 'NGBus_M_Hair_000'
		},
		{
			id: 19,
			drawable: 19,
			name: 'High Slicked Sides',
			collection: 'multiplayer_overlays',
			overlay: 'NGBus_M_Hair_001'
		},
		{
			id: 20,
			drawable: 20,
			name: 'Long Slicked',
			collection: 'multiplayer_overlays',
			overlay: 'NGHip_M_Hair_000'
		},
		{
			id: 21,
			drawable: 21,
			name: 'Hipster Youth',
			collection: 'multiplayer_overlays',
			overlay: 'NGHip_M_Hair_001'
		},
		{
			id: 22,
			drawable: 22,
			name: 'Mullet',
			collection: 'multiplayer_overlays',
			overlay: 'NGInd_M_Hair_000'
		},
		{
			id: 23,
			drawable: 24,
			name: 'Classic Cornrows',
			collection: 'mplowrider_overlays',
			overlay: 'LR_M_Hair_000'
		},
		{
			id: 24,
			drawable: 25,
			name: 'Palm Cornrows',
			collection: 'mplowrider_overlays',
			overlay: 'LR_M_Hair_001'
		},
		{
			id: 25,
			drawable: 26,
			name: 'Lightning Cornrows',
			collection: 'mplowrider_overlays',
			overlay: 'LR_M_Hair_002'
		},
		{
			id: 26,
			drawable: 27,
			name: 'Whipped Cornrows',
			collection: 'mplowrider_overlays',
			overlay: 'LR_M_Hair_003'
		},
		{
			id: 27,
			drawable: 28,
			name: 'Zig Zag Cornrows',
			collection: 'mplowrider2_overlays',
			overlay: 'LR_M_Hair_004'
		},
		{
			id: 28,
			drawable: 29,
			name: 'Snail Cornrows',
			collection: 'mplowrider2_overlays',
			overlay: 'LR_M_Hair_005'
		},
		{
			id: 29,
			drawable: 30,
			name: 'Hightop',
			collection: 'mplowrider2_overlays',
			overlay: 'LR_M_Hair_006'
		},
		{
			id: 30,
			drawable: 31,
			name: 'Loose Swept Back',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_000_M'
		},
		{
			id: 31,
			drawable: 32,
			name: 'Undercut Swept Back',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_001_M'
		},
		{
			id: 32,
			drawable: 33,
			name: 'Undercut Swept Side',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_002_M'
		},
		{
			id: 33,
			drawable: 34,
			name: 'Spiked Mohawk',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_003_M'
		},
		{
			id: 34,
			drawable: 35,
			name: 'Mod',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_004_M'
		},
		{
			id: 35,
			drawable: 36,
			name: 'Layered Mod',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_005_M'
		},
		{
			id: 36,
			drawable: 72,
			name: 'Flattop',
			collection: 'mpgunrunning_overlays',
			overlay: 'MP_Gunrunning_Hair_M_000_M'
		},
		{
			id: 37,
			drawable: 73,
			name: 'Military Buzzcut',
			collection: 'mpgunrunning_overlays',
			overlay: 'MP_Gunrunning_Hair_M_001_M'
		}
	],
	[
		{
			id: 0,
			drawable: 0,
			name: 'Close Shave',
			collection: 'mpbeach_overlays',
			overlay: 'FM_Hair_Fuzz'
		},
		{
			id: 1,
			drawable: 1,
			name: 'Short',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_001'
		},
		{
			id: 2,
			drawable: 2,
			name: 'Layered Bob',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_002'
		},
		{
			id: 3,
			drawable: 3,
			name: 'Pigtails',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_003'
		},
		{
			id: 4,
			drawable: 4,
			name: 'Ponytail',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_004'
		},
		{
			id: 5,
			drawable: 5,
			name: 'Braided Mohawk',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_005'
		},
		{
			id: 6,
			drawable: 6,
			name: 'Braids',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_006'
		},
		{
			id: 7,
			drawable: 7,
			name: 'Bob',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_007'
		},
		{
			id: 8,
			drawable: 8,
			name: 'Faux Hawk',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_008'
		},
		{
			id: 9,
			drawable: 9,
			name: 'French Twist',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_009'
		},
		{
			id: 10,
			drawable: 10,
			name: 'Long Bob',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_010'
		},
		{
			id: 11,
			drawable: 11,
			name: 'Loose Tied',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_011'
		},
		{
			id: 12,
			drawable: 12,
			name: 'Pixie',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_012'
		},
		{
			id: 13,
			drawable: 13,
			name: 'Shaved Bangs',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_013'
		},
		{
			id: 14,
			drawable: 14,
			name: 'Top Knot',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_014'
		},
		{
			id: 15,
			drawable: 15,
			name: 'Wavy Bob',
			collection: 'multiplayer_overlays',
			overlay: 'NG_M_Hair_015'
		},
		{
			id: 16,
			drawable: 16,
			name: 'Messy Bun',
			collection: 'multiplayer_overlays',
			overlay: 'NGBea_F_Hair_000'
		},
		{
			id: 17,
			drawable: 17,
			name: 'Pin Up Girl',
			collection: 'multiplayer_overlays',
			overlay: 'NGBea_F_Hair_001'
		},
		{
			id: 18,
			drawable: 18,
			name: 'Tight Bun',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_007'
		},
		{
			id: 19,
			drawable: 19,
			name: 'Twisted Bob',
			collection: 'multiplayer_overlays',
			overlay: 'NGBus_F_Hair_000'
		},
		{
			id: 20,
			drawable: 20,
			name: 'Flapper Bob',
			collection: 'multiplayer_overlays',
			overlay: 'NGBus_F_Hair_001'
		},
		{
			id: 21,
			drawable: 21,
			name: 'Big Bangs',
			collection: 'multiplayer_overlays',
			overlay: 'NGBea_F_Hair_001'
		},
		{
			id: 22,
			drawable: 22,
			name: 'Braided Top Knot',
			collection: 'multiplayer_overlays',
			overlay: 'NGHip_F_Hair_000'
		},
		{
			id: 23,
			drawable: 23,
			name: 'Mullet',
			collection: 'multiplayer_overlays',
			overlay: 'NGInd_F_Hair_000'
		},
		{
			id: 24,
			drawable: 25,
			name: 'Pinched Cornrows',
			collection: 'mplowrider_overlays',
			overlay: 'LR_F_Hair_000'
		},
		{
			id: 25,
			drawable: 26,
			name: 'Leaf Cornrows',
			collection: 'mplowrider_overlays',
			overlay: 'LR_F_Hair_001'
		},
		{
			id: 26,
			drawable: 27,
			name: 'Zig Zag Cornrows',
			collection: 'mplowrider_overlays',
			overlay: 'LR_F_Hair_002'
		},
		{
			id: 27,
			drawable: 28,
			name: 'Pigtail Bangs',
			collection: 'mplowrider2_overlays',
			overlay: 'LR_F_Hair_003'
		},
		{
			id: 28,
			drawable: 29,
			name: 'Wave Braids',
			collection: 'mplowrider2_overlays',
			overlay: 'LR_F_Hair_003'
		},
		{
			id: 29,
			drawable: 30,
			name: 'Coil Braids',
			collection: 'mplowrider2_overlays',
			overlay: 'LR_F_Hair_004'
		},
		{
			id: 30,
			drawable: 31,
			name: 'Rolled Quiff',
			collection: 'mplowrider2_overlays',
			overlay: 'LR_F_Hair_006'
		},
		{
			id: 31,
			drawable: 32,
			name: 'Loose Swept Back',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_000_F'
		},
		{
			id: 32,
			drawable: 33,
			name: 'Undercut Swept Back',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_001_F'
		},
		{
			id: 33,
			drawable: 34,
			name: 'Undercut Swept Side',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_002_F'
		},
		{
			id: 34,
			drawable: 35,
			name: 'Spiked Mohawk',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_003_F'
		},
		{
			id: 35,
			drawable: 36,
			name: 'Bandana and Braid',
			collection: 'multiplayer_overlays',
			overlay: 'NG_F_Hair_003'
		},
		{
			id: 36,
			drawable: 37,
			name: 'Layered Mod',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_006_F'
		},
		{
			id: 37,
			drawable: 38,
			name: 'Skinbyrd',
			collection: 'mpbiker_overlays',
			overlay: 'MP_Biker_Hair_004_F'
		},
		{
			id: 38,
			drawable: 76,
			name: 'Neat Bun',
			collection: 'mpgunrunning_overlays',
			overlay: 'MP_Gunrunning_Hair_F_000_F'
		},
		{
			id: 39,
			drawable: 77,
			name: 'Short Bob',
			collection: 'mpgunrunning_overlays',
			overlay: 'MP_Gunrunning_Hair_F_001_F'
		}
	]
];
