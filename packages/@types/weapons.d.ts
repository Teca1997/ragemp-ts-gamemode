/** [https://wiki.rage.mp/index.php?title=Weapons_Components](https://wiki.rage.mp/index.php?title=Weapons_Components) */
declare namespace RageEnums.Weapons.Components {
	const enum Knuckle_Duster {
		/** Base Model */
		COMPONENT_KNUCKLE_VARMOD_BASE = 0xf3462f33,
		/** The Pimp */
		COMPONENT_KNUCKLE_VARMOD_PIMP = 0xc613f685,
		/** The Ballas */
		COMPONENT_KNUCKLE_VARMOD_BALLAS = 0xeed9fd63,
		/** The Hustler */
		COMPONENT_KNUCKLE_VARMOD_DOLLAR = 0x50910c31,
		/** The Rock */
		COMPONENT_KNUCKLE_VARMOD_DIAMOND = 0x9761d9dc,
		/** The Hater */
		COMPONENT_KNUCKLE_VARMOD_HATE = 0x7decfe30,
		/** The Lover */
		COMPONENT_KNUCKLE_VARMOD_LOVE = 0x3f4e8aa6,
		/** The Player */
		COMPONENT_KNUCKLE_VARMOD_PLAYER = 0x8b808bb,
		/** The King */
		COMPONENT_KNUCKLE_VARMOD_KING = 0xe28babef,
		/** The Vagos */
		COMPONENT_KNUCKLE_VARMOD_VAGOS = 0x7af3f785
	}

	const enum Switchblade {
		/** Default Handle */
		COMPONENT_SWITCHBLADE_VARMOD_BASE = 0x9137a500,
		/** VIP Variant */
		COMPONENT_SWITCHBLADE_VARMOD_VAR1 = 0x5b3e7db6,
		/** Bodyguard Variant */
		COMPONENT_SWITCHBLADE_VARMOD_VAR2 = 0xe7939662
	}

	const enum Pistol {
		/** Default Clip */
		COMPONENT_PISTOL_CLIP_01 = 0xfed0fd71,
		/** Extended Clip */
		COMPONENT_PISTOL_CLIP_02 = 0xed265a1c,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH = 0x359b7aae,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP_02 = 0x65ea7ebb,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_PISTOL_VARMOD_LUXE = 0xd7391086
	}

	const enum Combat_Pistol {
		/** Default Clip */
		COMPONENT_COMBATPISTOL_CLIP_01 = 0x721b079,
		/** Extended Clip */
		COMPONENT_COMBATPISTOL_CLIP_02 = 0xd67b4f2d,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH = 0x359b7aae,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP = 0xc304849a,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_COMBATPISTOL_VARMOD_LOWRIDER = 0xc6654d72
	}

	const enum AP_Pistol {
		/** Default Clip */
		COMPONENT_APPISTOL_CLIP_01 = 0x31c4b22a,
		/** Extended Clip */
		COMPONENT_APPISTOL_CLIP_02 = 0x249a17d5,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH = 0x359b7aae,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP = 0xc304849a,
		/** Gilded Gun Metal Finish */
		COMPONENT_APPISTOL_VARMOD_LUXE = 0x9b76c72c
	}

	const enum Pistol_50 {
		/** Default Clip */
		COMPONENT_PISTOL50_CLIP_01 = 0x2297be19,
		/** Extended Clip */
		COMPONENT_PISTOL50_CLIP_02 = 0xd9d3ac92,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH = 0x359b7aae,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Platinum Pearl Deluxe Finish */
		COMPONENT_PISTOL50_VARMOD_LUXE = 0x77b8ab2f
	}

	const enum Heavy_Revolver {
		/** VIP Variant */
		COMPONENT_REVOLVER_VARMOD_BOSS = 0x16ee3040,
		/** Bodyguard Variant */
		COMPONENT_REVOLVER_VARMOD_GOON = 0x9493b80d,
		/** Default Clip */
		COMPONENT_REVOLVER_CLIP_01 = 0xe9867ce3
	}

	const enum SNS_Pistol {
		/** Default Clip */
		COMPONENT_SNSPISTOL_CLIP_01 = 0xf8802ed9,
		/** Extended Clip */
		COMPONENT_SNSPISTOL_CLIP_02 = 0x7b0033b3,
		/** Etched Wood Grip Finish */
		COMPONENT_SNSPISTOL_VARMOD_LOWRIDER = 0x8033ecaf
	}

	const enum Heavy_Pistol {
		/** Default Clip */
		COMPONENT_HEAVYPISTOL_CLIP_01 = 0xd4a969a,
		/** Extended Clip */
		COMPONENT_HEAVYPISTOL_CLIP_02 = 0x64f9c62b,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH = 0x359b7aae,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP = 0xc304849a,
		/** Etched Wood Grip Finish */
		COMPONENT_HEAVYPISTOL_VARMOD_LUXE = 0x7a6a7b7b
	}

	const enum Heavy_Revolver_Mk_II {
		/** Default Rounds */
		COMPONENT_REVOLVER_MK2_CLIP_01 = 0xba23d8be,
		/** Tracer Rounds */
		COMPONENT_REVOLVER_MK2_CLIP_TRACER = 0xc6d8e476,
		/** Incendiary Rounds */
		COMPONENT_REVOLVER_MK2_CLIP_INCENDIARY = 0xefbf25,
		/** Hollow Point Rounds */
		COMPONENT_REVOLVER_MK2_CLIP_HOLLOWPOINT = 0x10f42e8f,
		/** Full Metal Jacket Rounds */
		COMPONENT_REVOLVER_MK2_CLIP_FMJ = 0xdc8ba3f,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS = 0x420fd713,
		/** Small Scope */
		COMPONENT_AT_SCOPE_MACRO_MK2 = 0x49b2945,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH = 0x359b7aae,
		/** Compensator */
		COMPONENT_AT_PI_COMP_03 = 0x27077ccb,
		/** Digital Camo */
		COMPONENT_REVOLVER_MK2_CAMO = 0xc03fed9f,
		/** Brushstroke Camo */
		COMPONENT_REVOLVER_MK2_CAMO_02 = 0xb5de24,
		/** Woodland Camo */
		COMPONENT_REVOLVER_MK2_CAMO_03 = 0xa7ff1b8,
		/** Skull */
		COMPONENT_REVOLVER_MK2_CAMO_04 = 0xf2e24289,
		/** Sessanta Nove */
		COMPONENT_REVOLVER_MK2_CAMO_05 = 0x11317f27,
		/** Perseus */
		COMPONENT_REVOLVER_MK2_CAMO_06 = 0x17c30c42,
		/** Leopard */
		COMPONENT_REVOLVER_MK2_CAMO_07 = 0x257927ae,
		/** Zebra */
		COMPONENT_REVOLVER_MK2_CAMO_08 = 0x37304b1c,
		/** Geometric */
		COMPONENT_REVOLVER_MK2_CAMO_09 = 0x48daee71,
		/** Boom! */
		COMPONENT_REVOLVER_MK2_CAMO_10 = 0x20ed9b5b,
		/** Patriotic */
		COMPONENT_REVOLVER_MK2_CAMO_IND_01 = 0xd951e867
	}

	const enum SNS_Pistol_Mk_II {
		/** Default Clip */
		COMPONENT_SNSPISTOL_MK2_CLIP_01 = 0x1466ce6,
		/** Extended Clip */
		COMPONENT_SNSPISTOL_MK2_CLIP_02 = 0xce8c0772,
		/** Tracer Rounds */
		COMPONENT_SNSPISTOL_MK2_CLIP_TRACER = 0x902da26e,
		/** Incendiary Rounds */
		COMPONENT_SNSPISTOL_MK2_CLIP_INCENDIARY = 0xe6ad5f79,
		/** Hollow Point Rounds */
		COMPONENT_SNSPISTOL_MK2_CLIP_HOLLOWPOINT = 0x8d107402,
		/** Full Metal Jacket Rounds */
		COMPONENT_SNSPISTOL_MK2_CLIP_FMJ = 0xc111eb26,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH_03 = 0x4a4965f3,
		/** Mounted Scope */
		COMPONENT_AT_PI_RAIL_02 = 0x47de9258,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP_02 = 0x65ea7ebb,
		/** Compensator */
		COMPONENT_AT_PI_COMP_02 = 0xaa8283bf,
		/** Digital Camo */
		COMPONENT_SNSPISTOL_MK2_CAMO = 0xf7beedd,
		/** Brushstroke Camo */
		COMPONENT_SNSPISTOL_MK2_CAMO_02 = 0x8a612ef6,
		/** Woodland Camo */
		COMPONENT_SNSPISTOL_MK2_CAMO_03 = 0x76fa8829,
		/** Skull */
		COMPONENT_SNSPISTOL_MK2_CAMO_04 = 0xa93c6cac,
		/** Sessanta Nove */
		COMPONENT_SNSPISTOL_MK2_CAMO_05 = 0x9c905354,
		/** Perseus */
		COMPONENT_SNSPISTOL_MK2_CAMO_06 = 0x4dfa3621,
		/** Leopard */
		COMPONENT_SNSPISTOL_MK2_CAMO_07 = 0x42e91fff,
		/** Zebra */
		COMPONENT_SNSPISTOL_MK2_CAMO_08 = 0x54a8437d,
		/** Geometric */
		COMPONENT_SNSPISTOL_MK2_CAMO_09 = 0x68c2746,
		/** Boom! */
		COMPONENT_SNSPISTOL_MK2_CAMO_10 = 0x2366e467,
		/** Boom! */
		COMPONENT_SNSPISTOL_MK2_CAMO_IND_01 = 0x441882e6,
		/** Digital Camo */
		COMPONENT_SNSPISTOL_MK2_CAMO_SLIDE = 0xe7ee68ea,
		/** Brushstroke Camo */
		COMPONENT_SNSPISTOL_MK2_CAMO_02_SLIDE = 0x29366d21,
		/** Woodland Camo */
		COMPONENT_SNSPISTOL_MK2_CAMO_03_SLIDE = 0x3ade514b,
		/** Skull */
		COMPONENT_SNSPISTOL_MK2_CAMO_04_SLIDE = 0xe64513e9,
		/** Sessanta Nove */
		COMPONENT_SNSPISTOL_MK2_CAMO_05_SLIDE = 0xcd7aeb9a,
		/** Perseus */
		COMPONENT_SNSPISTOL_MK2_CAMO_06_SLIDE = 0xfa7b27a6,
		/** Leopard */
		COMPONENT_SNSPISTOL_MK2_CAMO_07_SLIDE = 0xe285ca9a,
		/** Zebra */
		COMPONENT_SNSPISTOL_MK2_CAMO_08_SLIDE = 0x2b904b19,
		/** Geometric */
		COMPONENT_SNSPISTOL_MK2_CAMO_09_SLIDE = 0x22c24f9c,
		/** Boom! */
		COMPONENT_SNSPISTOL_MK2_CAMO_10_SLIDE = 0x8d0d5ecd,
		/** Patriotic */
		COMPONENT_SNSPISTOL_MK2_CAMO_IND_01_SLIDE = 0x1f07150a
	}

	const enum Pistol_Mk_II {
		/** Default Clip */
		COMPONENT_PISTOL_MK2_CLIP_01 = 0x94f42d62,
		/** Extended Clip */
		COMPONENT_PISTOL_MK2_CLIP_02 = 0x5ed6c128,
		/** Tracer Rounds */
		COMPONENT_PISTOL_MK2_CLIP_TRACER = 0x25caaeaf,
		/** Incendiary Rounds */
		COMPONENT_PISTOL_MK2_CLIP_INCENDIARY = 0x2bbd7a3a,
		/** Hollow Point Rounds */
		COMPONENT_PISTOL_MK2_CLIP_HOLLOWPOINT = 0x85fea109,
		/** Full Metal Jacket Rounds */
		COMPONENT_PISTOL_MK2_CLIP_FMJ = 0x4f37df2a,
		/** Mounted Scope */
		COMPONENT_AT_PI_RAIL = 0x8ed4bb70,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH_02 = 0x43fd595b,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP_02 = 0x65ea7ebb,
		/** Compensator */
		COMPONENT_AT_PI_COMP = 0x21e34793,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO = 0x5c6c749c,
		/** Brushstroke Camo */
		COMPONENT_PISTOL_MK2_CAMO_02 = 0x15f7a390,
		/** Woodland Camo */
		COMPONENT_PISTOL_MK2_CAMO_03 = 0x968e24db,
		/** Skull */
		COMPONENT_PISTOL_MK2_CAMO_04 = 0x17bfa99,
		/** Sessanta Nove */
		COMPONENT_PISTOL_MK2_CAMO_05 = 0xf2685c72,
		/** Perseus */
		COMPONENT_PISTOL_MK2_CAMO_06 = 0xdd2231e6,
		/** Leopard */
		COMPONENT_PISTOL_MK2_CAMO_07 = 0xbb43ee76,
		/** Zebra */
		COMPONENT_PISTOL_MK2_CAMO_08 = 0x4d901310,
		/** Geometric */
		COMPONENT_PISTOL_MK2_CAMO_09 = 0x5f31b653,
		/** Boom! */
		COMPONENT_PISTOL_MK2_CAMO_10 = 0x697e19a0,
		/** Patriotic */
		COMPONENT_PISTOL_MK2_CAMO_IND_01 = 0x930cb951,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_SLIDE = 0xb4fc92b0,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_02_SLIDE = 0x1a1f1260,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_03_SLIDE = 0xe4e00b70,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_04_SLIDE = 0x2c298b2b,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_05_SLIDE = 0xdfb79725,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_06_SLIDE = 0x6bd7228c,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_07_SLIDE = 0x9ddbcf8c,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_08_SLIDE = 0xb319a52c,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_09_SLIDE = 0xc6836e12,
		/** Digital Camo */
		COMPONENT_PISTOL_MK2_CAMO_10_SLIDE = 0x43b1b173,
		/** Patriotic */
		COMPONENT_PISTOL_MK2_CAMO_IND_01_SLIDE = 0x4abda3fa
	}

	const enum Vintage_Pistol {
		/** Default Clip */
		COMPONENT_VINTAGEPISTOL_CLIP_01 = 0x45a3b6bb,
		/** Extended Clip */
		COMPONENT_VINTAGEPISTOL_CLIP_02 = 0x33ba12e8,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP = 0xc304849a
	}

	const enum Up_n_Atomizer {
		/** Festive tint */
		COMPONENT_RAYPISTOL_VARMOD_XMAS18 = 0xd7dbf707
	}

	const enum Ceramic_Pistol {
		/** Default Clip */
		COMPONENT_CERAMICPISTOL_CLIP_01 = 0x54d41361,
		/** Extended Clip */
		COMPONENT_CERAMICPISTOL_CLIP_02 = 0x81786ca9,
		/** Suppressor */
		COMPONENT_CERAMICPISTOL_SUPP = 0x9307d6fa
	}

	const enum Micro_SMG {
		/** Default Clip */
		COMPONENT_MICROSMG_CLIP_01 = 0xcb48aef0,
		/** Extended Clip */
		COMPONENT_MICROSMG_CLIP_02 = 0x10e6ba2b,
		/** Flashlight */
		COMPONENT_AT_PI_FLSH = 0x359b7aae,
		/** Scope */
		COMPONENT_AT_SCOPE_MACRO = 0x9d2fbf29,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_MICROSMG_VARMOD_LUXE = 0x487aae09
	}

	const enum SMG {
		/** Default Clip */
		COMPONENT_SMG_CLIP_01 = 0x26574997,
		/** Extended Clip */
		COMPONENT_SMG_CLIP_02 = 0x350966fb,
		/** Drum Magazine */
		COMPONENT_SMG_CLIP_03 = 0x79c77076,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Scope */
		COMPONENT_AT_SCOPE_MACRO_02 = 0x3cc6ba57,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP = 0xc304849a,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_SMG_VARMOD_LUXE = 0x27872c90
	}

	const enum Assault_SMG {
		/** Default Clip */
		COMPONENT_ASSAULTSMG_CLIP_01 = 0x8d1307b0,
		/** Extended Clip */
		COMPONENT_ASSAULTSMG_CLIP_02 = 0xbb46e417,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Scope */
		COMPONENT_AT_SCOPE_MACRO = 0x9d2fbf29,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_ASSAULTSMG_VARMOD_LOWRIDER = 0x278c78af
	}

	const enum Mini_SMG {
		/** Default Clip */
		COMPONENT_MINISMG_CLIP_01 = 0x84c8b2d3,
		/** Extended Clip */
		COMPONENT_MINISMG_CLIP_02 = 0x937ed0b7
	}

	const enum SMG_Mk_II {
		/** Default Clip */
		COMPONENT_SMG_MK2_CLIP_01 = 0x4c24806e,
		/** Extended Clip */
		COMPONENT_SMG_MK2_CLIP_02 = 0xb9835b2e,
		/** Tracer Rounds */
		COMPONENT_SMG_MK2_CLIP_TRACER = 0x7fea36ec,
		/** Incendiary Rounds */
		COMPONENT_SMG_MK2_CLIP_INCENDIARY = 0xd99222e5,
		/** Hollow Point Rounds */
		COMPONENT_SMG_MK2_CLIP_HOLLOWPOINT = 0x3a1bd6fa,
		/** Full Metal Jacket Rounds */
		COMPONENT_SMG_MK2_CLIP_FMJ = 0xb5a715f,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS_SMG = 0x9fdb5652,
		/** Small Scope */
		COMPONENT_AT_SCOPE_MACRO_02_SMG_MK2 = 0xe502ab6b,
		/** Medium Scope */
		COMPONENT_AT_SCOPE_SMALL_SMG_MK2 = 0x3decc7da,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP = 0xc304849a,
		/** Flat Muzzle Brake */
		COMPONENT_AT_MUZZLE_01 = 0xb99402d4,
		/** Tactical Muzzle Brake */
		COMPONENT_AT_MUZZLE_02 = 0xc867a07b,
		/** Fat-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_03 = 0xde11cbcf,
		/** Precision Muzzle Brake */
		COMPONENT_AT_MUZZLE_04 = 0xec9068cc,
		/** Heavy Duty Muzzle Brake */
		COMPONENT_AT_MUZZLE_05 = 0x2e7957a,
		/** Slanted Muzzle Brake */
		COMPONENT_AT_MUZZLE_06 = 0x347ef8ac,
		/** Split-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_07 = 0x4db62abe,
		/** Default Barrel */
		COMPONENT_AT_SB_BARREL_01 = 0xd9103ee1,
		/** Heavy Barrel */
		COMPONENT_AT_SB_BARREL_02 = 0xa564d78b,
		/** Digital Camo */
		COMPONENT_SMG_MK2_CAMO = 0xc4979067,
		/** Brushstroke Camo */
		COMPONENT_SMG_MK2_CAMO_02 = 0x3815a945,
		/** Woodland Camo */
		COMPONENT_SMG_MK2_CAMO_03 = 0x4b4b4fb0,
		/** Skull */
		COMPONENT_SMG_MK2_CAMO_04 = 0xec729200,
		/** Sessanta Nove */
		COMPONENT_SMG_MK2_CAMO_05 = 0x48f64b22,
		/** Perseus */
		COMPONENT_SMG_MK2_CAMO_06 = 0x35992468,
		/** Leopard */
		COMPONENT_SMG_MK2_CAMO_07 = 0x24b782a5,
		/** Zebra */
		COMPONENT_SMG_MK2_CAMO_08 = 0xa2e67f01,
		/** Geometric */
		COMPONENT_SMG_MK2_CAMO_09 = 0x2218fd68,
		/** Boom! */
		COMPONENT_SMG_MK2_CAMO_10 = 0x45c5c3c5,
		/** Patriotic */
		COMPONENT_SMG_MK2_CAMO_IND_01 = 0x399d558f
	}

	const enum Machine_Pistol {
		/** Default Clip */
		COMPONENT_MACHINEPISTOL_CLIP_01 = 0x476e85ff,
		/** Extended Clip */
		COMPONENT_MACHINEPISTOL_CLIP_02 = 0xb92c6979,
		/** Drum Magazine */
		COMPONENT_MACHINEPISTOL_CLIP_03 = 0xa9e9caf4,
		/** Suppressor */
		COMPONENT_AT_PI_SUPP = 0xc304849a
	}

	const enum Combat_PDW {
		/** Default Clip */
		COMPONENT_COMBATPDW_CLIP_01 = 0x4317f19e,
		/** Extended Clip */
		COMPONENT_COMBATPDW_CLIP_02 = 0x334a5203,
		/** Drum Magazine */
		COMPONENT_COMBATPDW_CLIP_03 = 0x6eb8c8db,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53,
		/** Scope */
		COMPONENT_AT_SCOPE_SMALL = 0xaa2c45b4
	}

	const enum Pump_Shotgun {
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_SR_SUPP = 0xe608b35e,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_PUMPSHOTGUN_VARMOD_LOWRIDER = 0xa2d79ddb
	}

	const enum Sawed_Off_Shotgun {
		/** Gilded Gun Metal Finish */
		COMPONENT_SAWNOFFSHOTGUN_VARMOD_LUXE = 0x85a64df9
	}

	const enum Assault_Shotgun {
		/** Default Clip */
		COMPONENT_ASSAULTSHOTGUN_CLIP_01 = 0x94e81bc7,
		/** Extended Clip */
		COMPONENT_ASSAULTSHOTGUN_CLIP_02 = 0x86bd7f72,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53
	}

	const enum Bullpup_Shotgun {
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53
	}

	const enum Pump_Shotgun_Mk_II {
		/** Default Shells */
		COMPONENT_PUMPSHOTGUN_MK2_CLIP_01 = 0xcd940141,
		/** Dragon's Breath Shells */
		COMPONENT_PUMPSHOTGUN_MK2_CLIP_INCENDIARY = 0x9f8a1bf5,
		/** Steel Buckshot Shells */
		COMPONENT_PUMPSHOTGUN_MK2_CLIP_ARMORPIERCING = 0x4e65b425,
		/** Flechette Shells */
		COMPONENT_PUMPSHOTGUN_MK2_CLIP_HOLLOWPOINT = 0xe9582927,
		/** Explosive Slugs */
		COMPONENT_PUMPSHOTGUN_MK2_CLIP_EXPLOSIVE = 0x3be4465d,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS = 0x420fd713,
		/** Small Scope */
		COMPONENT_AT_SCOPE_MACRO_MK2 = 0x49b2945,
		/** Medium Scope */
		COMPONENT_AT_SCOPE_SMALL_MK2 = 0x3f3c8181,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_SR_SUPP_03 = 0xac42df71,
		/** Squared Muzzle Brake */
		COMPONENT_AT_MUZZLE_08 = 0x5f7dce4d,
		/** Digital Camo */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO = 0xe3bd9e44,
		/** Brushstroke Camo */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_02 = 0x17148f9b,
		/** Woodland Camo */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_03 = 0x24d22b16,
		/** Skull */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_04 = 0xf2bec6f0,
		/** Sessanta Nove */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_05 = 0x85627d,
		/** Perseus */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_06 = 0xdc2919c5,
		/** Leopard */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_07 = 0xe184247b,
		/** Zebra */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_08 = 0xd8ef9356,
		/** Geometric */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_09 = 0xef29bfca,
		/** Boom! */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_10 = 0x67aeb165,
		/** Patriotic */
		COMPONENT_PUMPSHOTGUN_MK2_CAMO_IND_01 = 0x46411a1d
	}

	const enum Heavy_Shotgun {
		/** Default Clip */
		COMPONENT_HEAVYSHOTGUN_CLIP_01 = 0x324f2d5f,
		/** Extended Clip */
		COMPONENT_HEAVYSHOTGUN_CLIP_02 = 0x971cf6fd,
		/** Drum Magazine */
		COMPONENT_HEAVYSHOTGUN_CLIP_03 = 0x88c7da53,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53
	}

	const enum Combat_Shotgun {
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa
	}

	const enum Assault_Rifle {
		/** Default Clip */
		COMPONENT_ASSAULTRIFLE_CLIP_01 = 0xbe5eea16,
		/** Extended Clip */
		COMPONENT_ASSAULTRIFLE_CLIP_02 = 0xb1214f9b,
		/** Drum Magazine */
		COMPONENT_ASSAULTRIFLE_CLIP_03 = 0xdbf0a53d,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Scope */
		COMPONENT_AT_SCOPE_MACRO = 0x9d2fbf29,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_ASSAULTRIFLE_VARMOD_LUXE = 0x4ead7533
	}

	const enum Carbine_Rifle {
		/** Default Clip */
		COMPONENT_CARBINERIFLE_CLIP_01 = 0x9fbe33ec,
		/** Extended Clip */
		COMPONENT_CARBINERIFLE_CLIP_02 = 0x91109691,
		/** Box Magazine */
		COMPONENT_CARBINERIFLE_CLIP_03 = 0xba62e935,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Scope */
		COMPONENT_AT_SCOPE_MEDIUM = 0xa0d89c42,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_CARBINERIFLE_VARMOD_LUXE = 0xd89b9658
	}

	const enum Advanced_Rifle {
		/** Default Clip */
		COMPONENT_ADVANCEDRIFLE_CLIP_01 = 0xfa8fa10f,
		/** Extended Clip */
		COMPONENT_ADVANCEDRIFLE_CLIP_02 = 0x8ec1c979,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Scope */
		COMPONENT_AT_SCOPE_SMALL = 0xaa2c45b4,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa,
		/** Gilded Gun Metal Finish */
		COMPONENT_ADVANCEDRIFLE_VARMOD_LUXE = 0x377cd377
	}

	const enum Special_Carbine {
		/** Default Clip */
		COMPONENT_SPECIALCARBINE_CLIP_01 = 0xc6c7e581,
		/** Extended Clip */
		COMPONENT_SPECIALCARBINE_CLIP_02 = 0x7c8bd10e,
		/** Drum Magazine */
		COMPONENT_SPECIALCARBINE_CLIP_03 = 0x6b59aeaa,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Scope */
		COMPONENT_AT_SCOPE_MEDIUM = 0xa0d89c42,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53,
		/** Etched Gun Metal Finish */
		COMPONENT_SPECIALCARBINE_VARMOD_LOWRIDER = 0x730154f2
	}

	const enum Bullpup_Rifle {
		/** Default Clip */
		COMPONENT_BULLPUPRIFLE_CLIP_01 = 0xc5a12f80,
		/** Extended Clip */
		COMPONENT_BULLPUPRIFLE_CLIP_02 = 0xb3688b0f,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Scope */
		COMPONENT_AT_SCOPE_SMALL = 0xaa2c45b4,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53,
		/** Gilded Gun Metal Finish */
		COMPONENT_BULLPUPRIFLE_VARMOD_LOW = 0xa857bc78
	}

	const enum Bullpup_Rifle_Mk_II {
		/** Default Clip */
		COMPONENT_BULLPUPRIFLE_MK2_CLIP_01 = 0x18929da,
		/** Extended Clip */
		COMPONENT_BULLPUPRIFLE_MK2_CLIP_02 = 0xefb00628,
		/** Tracer Rounds */
		COMPONENT_BULLPUPRIFLE_MK2_CLIP_TRACER = 0x822060a9,
		/** Incendiary Rounds */
		COMPONENT_BULLPUPRIFLE_MK2_CLIP_INCENDIARY = 0xa99cf95a,
		/** Armor Piercing Rounds */
		COMPONENT_BULLPUPRIFLE_MK2_CLIP_ARMORPIERCING = 0xfaa7f5ed,
		/** Full Metal Jacket Rounds */
		COMPONENT_BULLPUPRIFLE_MK2_CLIP_FMJ = 0x43621710,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS = 0x420fd713,
		/** Small Scope */
		COMPONENT_AT_SCOPE_MACRO_02_MK2 = 0xc7add105,
		/** Medium Scope */
		COMPONENT_AT_SCOPE_SMALL_MK2 = 0x3f3c8181,
		/** Default Barrel */
		COMPONENT_AT_BP_BARREL_01 = 0x659ac11b,
		/** Heavy Barrel */
		COMPONENT_AT_BP_BARREL_02 = 0x3bf26dc7,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa,
		/** Flat Muzzle Brake */
		COMPONENT_AT_MUZZLE_01 = 0xb99402d4,
		/** Tactical Muzzle Brake */
		COMPONENT_AT_MUZZLE_02 = 0xc867a07b,
		/** Fat-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_03 = 0xde11cbcf,
		/** Precision Muzzle Brake */
		COMPONENT_AT_MUZZLE_04 = 0xec9068cc,
		/** Heavy Duty Muzzle Brake */
		COMPONENT_AT_MUZZLE_05 = 0x2e7957a,
		/** Slanted Muzzle Brake */
		COMPONENT_AT_MUZZLE_06 = 0x347ef8ac,
		/** Split-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_07 = 0x4db62abe,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP_02 = 0x9d65907a,
		/** Digital Camo */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO = 0xae4055b7,
		/** Brushstroke Camo */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_02 = 0xb905ed6b,
		/** Woodland Camo */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_03 = 0xa6c448e8,
		/** Skull */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_04 = 0x9486246c,
		/** Sessanta Nove */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_05 = 0x8a390fd2,
		/** Perseus */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_06 = 0x2337fc5,
		/** Leopard */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_07 = 0xefffdb5e,
		/** Zebra */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_08 = 0xddbdb6da,
		/** Geometric */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_09 = 0xcb631225,
		/** Boom! */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_10 = 0xa87d541e,
		/** Patriotic */
		COMPONENT_BULLPUPRIFLE_MK2_CAMO_IND_01 = 0xc5e9ae52
	}

	const enum Special_Carbine_Mk_II {
		/** Default Clip */
		COMPONENT_SPECIALCARBINE_MK2_CLIP_01 = 0x16c69281,
		/** Extended Clip */
		COMPONENT_SPECIALCARBINE_MK2_CLIP_02 = 0xde1fa12c,
		/** Tracer Rounds */
		COMPONENT_SPECIALCARBINE_MK2_CLIP_TRACER = 0x8765c68a,
		/** Incendiary Rounds */
		COMPONENT_SPECIALCARBINE_MK2_CLIP_INCENDIARY = 0xde011286,
		/** Armor Piercing Rounds */
		COMPONENT_SPECIALCARBINE_MK2_CLIP_ARMORPIERCING = 0x51351635,
		/** Full Metal Jacket Rounds */
		COMPONENT_SPECIALCARBINE_MK2_CLIP_FMJ = 0x503dea90,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS = 0x420fd713,
		/** Small Scope */
		COMPONENT_AT_SCOPE_MACRO_MK2 = 0x49b2945,
		/** Large Scope */
		COMPONENT_AT_SCOPE_MEDIUM_MK2 = 0xc66b6542,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Flat Muzzle Brake */
		COMPONENT_AT_MUZZLE_01 = 0xb99402d4,
		/** Tactical Muzzle Brake */
		COMPONENT_AT_MUZZLE_02 = 0xc867a07b,
		/** Fat-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_03 = 0xde11cbcf,
		/** Precision Muzzle Brake */
		COMPONENT_AT_MUZZLE_04 = 0xec9068cc,
		/** Heavy Duty Muzzle Brake */
		COMPONENT_AT_MUZZLE_05 = 0x2e7957a,
		/** Slanted Muzzle Brake */
		COMPONENT_AT_MUZZLE_06 = 0x347ef8ac,
		/** Split-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_07 = 0x4db62abe,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP_02 = 0x9d65907a,
		/** Default Barrel */
		COMPONENT_AT_SC_BARREL_01 = 0xe73653a9,
		/** Heavy Barrel */
		COMPONENT_AT_SC_BARREL_02 = 0xf97f783b,
		/** Digital Camo */
		COMPONENT_SPECIALCARBINE_MK2_CAMO = 0xd40bb53b,
		/** Brushstroke Camo */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_02 = 0x431b238b,
		/** Woodland Camo */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_03 = 0x34cf86f4,
		/** Skull */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_04 = 0xb4c306dd,
		/** Sessanta Nove */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_05 = 0xee677a25,
		/** Perseus */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_06 = 0xdf90dc78,
		/** Leopard */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_07 = 0xa4c31ee,
		/** Zebra */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_08 = 0x89cfb0f7,
		/** Geometric */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_09 = 0x7b82145c,
		/** Boom! */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_10 = 0x899caf75,
		/** Patriotic */
		COMPONENT_SPECIALCARBINE_MK2_CAMO_IND_01 = 0x5218c819
	}

	const enum Assault_Rifle_Mk_II {
		/** Default Clip */
		COMPONENT_ASSAULTRIFLE_MK2_CLIP_01 = 0x8610343f,
		/** Extended Clip */
		COMPONENT_ASSAULTRIFLE_MK2_CLIP_02 = 0xd12aca6f,
		/** Tracer Rounds */
		COMPONENT_ASSAULTRIFLE_MK2_CLIP_TRACER = 0xef2c78c1,
		/** Incendiary Rounds */
		COMPONENT_ASSAULTRIFLE_MK2_CLIP_INCENDIARY = 0xfb70d853,
		/** Armor Piercing Rounds */
		COMPONENT_ASSAULTRIFLE_MK2_CLIP_ARMORPIERCING = 0xa7dd1e58,
		/** Full Metal Jacket Rounds */
		COMPONENT_ASSAULTRIFLE_MK2_CLIP_FMJ = 0x63e0a098,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP_02 = 0x9d65907a,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS = 0x420fd713,
		/** Small Scope */
		COMPONENT_AT_SCOPE_MACRO_MK2 = 0x49b2945,
		/** Large Scope */
		COMPONENT_AT_SCOPE_MEDIUM_MK2 = 0xc66b6542,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Flat Muzzle Brake */
		COMPONENT_AT_MUZZLE_01 = 0xb99402d4,
		/** Tactical Muzzle Brake */
		COMPONENT_AT_MUZZLE_02 = 0xc867a07b,
		/** Fat-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_03 = 0xde11cbcf,
		/** Precision Muzzle Brake */
		COMPONENT_AT_MUZZLE_04 = 0xec9068cc,
		/** Heavy Duty Muzzle Brake */
		COMPONENT_AT_MUZZLE_05 = 0x2e7957a,
		/** Slanted Muzzle Brake */
		COMPONENT_AT_MUZZLE_06 = 0x347ef8ac,
		/** Split-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_07 = 0x4db62abe,
		/** Default Barrel */
		COMPONENT_AT_AR_BARREL_01 = 0x43a49d26,
		/** Heavy Barrel */
		COMPONENT_AT_AR_BARREL_02 = 0x5646c26a,
		/** Digital Camo */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO = 0x911b24af,
		/** Brushstroke Camo */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_02 = 0x37e5444b,
		/** Woodland Camo */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_03 = 0x538b7b97,
		/** Skull */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_04 = 0x25789f72,
		/** Sessanta Nove */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_05 = 0xc5495f2d,
		/** Perseus */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_06 = 0xcf8b73b1,
		/** Leopard */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_07 = 0xa9bb2811,
		/** Zebra */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_08 = 0xfc674d54,
		/** Geometric */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_09 = 0x7c7fcd9b,
		/** Boom! */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_10 = 0xa5c38392,
		/** Patriotic */
		COMPONENT_ASSAULTRIFLE_MK2_CAMO_IND_01 = 0xb9b15db0
	}

	const enum Carbine_Rifle_Mk_II {
		/** Default Clip */
		COMPONENT_CARBINERIFLE_MK2_CLIP_01 = 0x4c7a391e,
		/** Extended Clip */
		COMPONENT_CARBINERIFLE_MK2_CLIP_02 = 0x5dd5dbd5,
		/** Tracer Rounds */
		COMPONENT_CARBINERIFLE_MK2_CLIP_TRACER = 0x1757f566,
		/** Incendiary Rounds */
		COMPONENT_CARBINERIFLE_MK2_CLIP_INCENDIARY = 0x3d25c2a7,
		/** Armor Piercing Rounds */
		COMPONENT_CARBINERIFLE_MK2_CLIP_ARMORPIERCING = 0x255d5d57,
		/** Full Metal Jacket Rounds */
		COMPONENT_CARBINERIFLE_MK2_CLIP_FMJ = 0x44032f11,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP_02 = 0x9d65907a,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS = 0x420fd713,
		/** Small Scope */
		COMPONENT_AT_SCOPE_MACRO_MK2 = 0x49b2945,
		/** Large Scope */
		COMPONENT_AT_SCOPE_MEDIUM_MK2 = 0xc66b6542,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa,
		/** Flat Muzzle Brake */
		COMPONENT_AT_MUZZLE_01 = 0xb99402d4,
		/** Tactical Muzzle Brake */
		COMPONENT_AT_MUZZLE_02 = 0xc867a07b,
		/** Fat-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_03 = 0xde11cbcf,
		/** Precision Muzzle Brake */
		COMPONENT_AT_MUZZLE_04 = 0xec9068cc,
		/** Heavy Duty Muzzle Brake */
		COMPONENT_AT_MUZZLE_05 = 0x2e7957a,
		/** Slanted Muzzle Brake */
		COMPONENT_AT_MUZZLE_06 = 0x347ef8ac,
		/** Split-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_07 = 0x4db62abe,
		/** Default Barrel */
		COMPONENT_AT_CR_BARREL_01 = 0x833637ff,
		/** Heavy Barrel */
		COMPONENT_AT_CR_BARREL_02 = 0x8b3c480b,
		/** Digital Camo */
		COMPONENT_CARBINERIFLE_MK2_CAMO = 0x4bdd6f16,
		/** Brushstroke Camo */
		COMPONENT_CARBINERIFLE_MK2_CAMO_02 = 0x406a7908,
		/** Woodland Camo */
		COMPONENT_CARBINERIFLE_MK2_CAMO_03 = 0x2f3856a4,
		/** Skull */
		COMPONENT_CARBINERIFLE_MK2_CAMO_04 = 0xe50c424d,
		/** Sessanta Nove */
		COMPONENT_CARBINERIFLE_MK2_CAMO_05 = 0xd37d1f2f,
		/** Perseus */
		COMPONENT_CARBINERIFLE_MK2_CAMO_06 = 0x86268483,
		/** Leopard */
		COMPONENT_CARBINERIFLE_MK2_CAMO_07 = 0xf420e076,
		/** Zebra */
		COMPONENT_CARBINERIFLE_MK2_CAMO_08 = 0xaae14df8,
		/** Geometric */
		COMPONENT_CARBINERIFLE_MK2_CAMO_09 = 0x9893a95d,
		/** Boom! */
		COMPONENT_CARBINERIFLE_MK2_CAMO_10 = 0x6b13cd3e,
		/** Patriotic */
		COMPONENT_CARBINERIFLE_MK2_CAMO_IND_01 = 0xda55cd3f
	}

	const enum Compact_Rifle {
		/** Default Clip */
		COMPONENT_COMPACTRIFLE_CLIP_01 = 0x513f0a63,
		/** Extended Clip */
		COMPONENT_COMPACTRIFLE_CLIP_02 = 0x59ff9bf8,
		/** Drum Magazine */
		COMPONENT_COMPACTRIFLE_CLIP_03 = 0xc607740e
	}

	const enum Military_Rifle {
		/** Default Clip */
		COMPONENT_MILITARYRIFLE_CLIP_01 = 0x2d46d83b,
		/** Extended Clip */
		COMPONENT_MILITARYRIFLE_CLIP_02 = 0x684ace42,
		/** Iron Sights */
		COMPONENT_MILITARYRIFLE_SIGHT_01 = 0x6b82f395,
		/** Scope */
		COMPONENT_AT_SCOPE_SMALL = 0xaa2c45b4,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa
	}

	const enum MG {
		/** Default Clip */
		COMPONENT_MG_CLIP_01 = 0xf434ef84,
		/** Extended Clip */
		COMPONENT_MG_CLIP_02 = 0x82158b47,
		/** Scope */
		COMPONENT_AT_SCOPE_SMALL_02 = 0x3c00afed,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_MG_VARMOD_LOWRIDER = 0xd6dababe
	}

	const enum Combat_MG {
		/** Default Clip */
		COMPONENT_COMBATMG_CLIP_01 = 0xe1ffb34a,
		/** Extended Clip */
		COMPONENT_COMBATMG_CLIP_02 = 0xd6c59cd6,
		/** Scope */
		COMPONENT_AT_SCOPE_MEDIUM = 0xa0d89c42,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53,
		/** Etched Gun Metal Finish */
		COMPONENT_COMBATMG_VARMOD_LOWRIDER = 0x92feccdd
	}

	const enum Combat_MG_Mk_II {
		/** Default Clip */
		COMPONENT_COMBATMG_MK2_CLIP_01 = 0x492b257c,
		/** Extended Clip */
		COMPONENT_COMBATMG_MK2_CLIP_02 = 0x17df42e9,
		/** Tracer Rounds */
		COMPONENT_COMBATMG_MK2_CLIP_TRACER = 0xf6649745,
		/** Incendiary Rounds */
		COMPONENT_COMBATMG_MK2_CLIP_INCENDIARY = 0xc326bdba,
		/** Armor Piercing Rounds */
		COMPONENT_COMBATMG_MK2_CLIP_ARMORPIERCING = 0x29882423,
		/** Full Metal Jacket Rounds */
		COMPONENT_COMBATMG_MK2_CLIP_FMJ = 0x57ef1cc8,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP_02 = 0x9d65907a,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS = 0x420fd713,
		/** Medium Scope */
		COMPONENT_AT_SCOPE_SMALL_MK2 = 0x3f3c8181,
		/** Large Scope */
		COMPONENT_AT_SCOPE_MEDIUM_MK2 = 0xc66b6542,
		/** Flat Muzzle Brake */
		COMPONENT_AT_MUZZLE_01 = 0xb99402d4,
		/** Tactical Muzzle Brake */
		COMPONENT_AT_MUZZLE_02 = 0xc867a07b,
		/** Fat-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_03 = 0xde11cbcf,
		/** Precision Muzzle Brake */
		COMPONENT_AT_MUZZLE_04 = 0xec9068cc,
		/** Heavy Duty Muzzle Brake */
		COMPONENT_AT_MUZZLE_05 = 0x2e7957a,
		/** Slanted Muzzle Brake */
		COMPONENT_AT_MUZZLE_06 = 0x347ef8ac,
		/** Split-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_07 = 0x4db62abe,
		/** Default Barrel */
		COMPONENT_AT_MG_BARREL_01 = 0xc34ef234,
		/** Heavy Barrel */
		COMPONENT_AT_MG_BARREL_02 = 0xb5e2575b,
		/** Digital Camo */
		COMPONENT_COMBATMG_MK2_CAMO = 0x4a768cb5,
		/** Brushstroke Camo */
		COMPONENT_COMBATMG_MK2_CAMO_02 = 0xcce06bbd,
		/** Woodland Camo */
		COMPONENT_COMBATMG_MK2_CAMO_03 = 0xbe94cf26,
		/** Skull */
		COMPONENT_COMBATMG_MK2_CAMO_04 = 0x7609be11,
		/** Sessanta Nove */
		COMPONENT_COMBATMG_MK2_CAMO_05 = 0x48af6351,
		/** Perseus */
		COMPONENT_COMBATMG_MK2_CAMO_06 = 0x9186750a,
		/** Leopard */
		COMPONENT_COMBATMG_MK2_CAMO_07 = 0x84555aa8,
		/** Zebra */
		COMPONENT_COMBATMG_MK2_CAMO_08 = 0x1b4c088b,
		/** Geometric */
		COMPONENT_COMBATMG_MK2_CAMO_09 = 0xe046dfc,
		/** Boom! */
		COMPONENT_COMBATMG_MK2_CAMO_10 = 0x28b536e,
		/** Patriotic */
		COMPONENT_COMBATMG_MK2_CAMO_IND_01 = 0xd703c94d
	}

	const enum Gusenberg_Sweeper {
		/** Default Clip */
		COMPONENT_GUSENBERG_CLIP_01 = 0x1ce5a6a5,
		/** Extended Clip */
		COMPONENT_GUSENBERG_CLIP_02 = 0xeac8c270
	}

	const enum Sniper_Rifle {
		/** Default Clip */
		COMPONENT_SNIPERRIFLE_CLIP_01 = 0x9bc64089,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP_02 = 0xa73d4664,
		/** Scope */
		COMPONENT_AT_SCOPE_LARGE = 0xd2443ddc,
		/** Advanced Scope */
		COMPONENT_AT_SCOPE_MAX = 0xbc54da77,
		/** Etched Wood Grip Finish */
		COMPONENT_SNIPERRIFLE_VARMOD_LUXE = 0x4032b5e7
	}

	const enum Heavy_Sniper {
		/** Default Clip */
		COMPONENT_HEAVYSNIPER_CLIP_01 = 0x476f52f4,
		/** Scope */
		COMPONENT_AT_SCOPE_LARGE = 0xd2443ddc,
		/** Advanced Scope */
		COMPONENT_AT_SCOPE_MAX = 0xbc54da77
	}

	const enum Marksman_Rifle_Mk_II {
		/** Default Clip */
		COMPONENT_MARKSMANRIFLE_MK2_CLIP_01 = 0x94e12dce,
		/** Extended Clip */
		COMPONENT_MARKSMANRIFLE_MK2_CLIP_02 = 0xe6cfd1aa,
		/** Tracer Rounds */
		COMPONENT_MARKSMANRIFLE_MK2_CLIP_TRACER = 0xd77a22d2,
		/** Incendiary Rounds */
		COMPONENT_MARKSMANRIFLE_MK2_CLIP_INCENDIARY = 0x6dd7a86e,
		/** Armor Piercing Rounds */
		COMPONENT_MARKSMANRIFLE_MK2_CLIP_ARMORPIERCING = 0xf46fd079,
		/** Full Metal Jacket Rounds */
		COMPONENT_MARKSMANRIFLE_MK2_CLIP_FMJ = 0xe14a9ed3,
		/** Holographic Sight */
		COMPONENT_AT_SIGHTS = 0x420fd713,
		/** Large Scope */
		COMPONENT_AT_SCOPE_MEDIUM_MK2 = 0xc66b6542,
		/** Zoom Scope */
		COMPONENT_AT_SCOPE_LARGE_FIXED_ZOOM_MK2 = 0x5b1c713c,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa,
		/** Flat Muzzle Brake */
		COMPONENT_AT_MUZZLE_01 = 0xb99402d4,
		/** Tactical Muzzle Brake */
		COMPONENT_AT_MUZZLE_02 = 0xc867a07b,
		/** Fat-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_03 = 0xde11cbcf,
		/** Precision Muzzle Brake */
		COMPONENT_AT_MUZZLE_04 = 0xec9068cc,
		/** Heavy Duty Muzzle Brake */
		COMPONENT_AT_MUZZLE_05 = 0x2e7957a,
		/** Slanted Muzzle Brake */
		COMPONENT_AT_MUZZLE_06 = 0x347ef8ac,
		/** Split-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_07 = 0x4db62abe,
		/** Default Barrel */
		COMPONENT_AT_MRFL_BARREL_01 = 0x381b5d89,
		/** Heavy Barrel */
		COMPONENT_AT_MRFL_BARREL_02 = 0x68373ddc,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP_02 = 0x9d65907a,
		/** Digital Camo */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO = 0x9094fba0,
		/** Brushstroke Camo */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_02 = 0x7320f4b2,
		/** Woodland Camo */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_03 = 0x60cf500f,
		/** Skull */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_04 = 0xfe668b3f,
		/** Sessanta Nove */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_05 = 0xf3757559,
		/** Perseus */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_06 = 0x193b40e8,
		/** Leopard */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_07 = 0x107d2f6c,
		/** Zebra */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_08 = 0xc4e91841,
		/** Geometric */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_09 = 0x9bb1c5d3,
		/** Boom! */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_10 = 0x3b61040b,
		/** Boom! */
		COMPONENT_MARKSMANRIFLE_MK2_CAMO_IND_01 = 0xb7a316da
	}

	const enum Heavy_Sniper_Mk_II {
		/** Default Clip */
		COMPONENT_HEAVYSNIPER_MK2_CLIP_01 = 0xfa1e1a28,
		/** Extended Clip */
		COMPONENT_HEAVYSNIPER_MK2_CLIP_02 = 0x2cd8ff9d,
		/** Incendiary Rounds */
		COMPONENT_HEAVYSNIPER_MK2_CLIP_INCENDIARY = 0xec0f617,
		/** Armor Piercing Rounds */
		COMPONENT_HEAVYSNIPER_MK2_CLIP_ARMORPIERCING = 0xf835d6d4,
		/** Full Metal Jacket Rounds */
		COMPONENT_HEAVYSNIPER_MK2_CLIP_FMJ = 0x3be948f6,
		/** Explosive Rounds */
		COMPONENT_HEAVYSNIPER_MK2_CLIP_EXPLOSIVE = 0x89ebdaa7,
		/** Zoom Scope */
		COMPONENT_AT_SCOPE_LARGE_MK2 = 0x82c10383,
		/** Advanced Scope */
		COMPONENT_AT_SCOPE_MAX = 0xbc54da77,
		/** Night Vision Scope */
		COMPONENT_AT_SCOPE_NV = 0xb68010b0,
		/** Thermal Scope */
		COMPONENT_AT_SCOPE_THERMAL = 0x2e43da41,
		/** Suppressor */
		COMPONENT_AT_SR_SUPP_03 = 0xac42df71,
		/** Squared Muzzle Brake */
		COMPONENT_AT_MUZZLE_08 = 0x5f7dce4d,
		/** Bell-End Muzzle Brake */
		COMPONENT_AT_MUZZLE_09 = 0x6927e1a1,
		/** Default Barrel */
		COMPONENT_AT_SR_BARREL_01 = 0x909630b7,
		/** Heavy Barrel */
		COMPONENT_AT_SR_BARREL_02 = 0x108ab09e,
		/** Digital Camo */
		COMPONENT_HEAVYSNIPER_MK2_CAMO = 0xf8337d02,
		/** Brushstroke Camo */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_02 = 0xc5bedd65,
		/** Woodland Camo */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_03 = 0xe9712475,
		/** Skull */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_04 = 0x13aa78e7,
		/** Sessanta Nove */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_05 = 0x26591e50,
		/** Perseus */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_06 = 0x302731ec,
		/** Leopard */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_07 = 0xac722a78,
		/** Zebra */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_08 = 0xbea4cedd,
		/** Geometric */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_09 = 0xcd776c82,
		/** Boom! */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_10 = 0xabc5acc7,
		/** Patriotic */
		COMPONENT_HEAVYSNIPER_MK2_CAMO_IND_01 = 0x6c32d2eb
	}

	const enum Marksman_Rifle {
		/** Default Clip */
		COMPONENT_MARKSMANRIFLE_CLIP_01 = 0xd83b4141,
		/** Extended Clip */
		COMPONENT_MARKSMANRIFLE_CLIP_02 = 0xccfd2ac5,
		/** Scope */
		COMPONENT_AT_SCOPE_LARGE_FIXED_ZOOM = 0x1c221b1a,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Suppressor */
		COMPONENT_AT_AR_SUPP = 0x837445aa,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53,
		/** Yusuf Amir Luxury Finish */
		COMPONENT_MARKSMANRIFLE_VARMOD_LUXE = 0x161e9241
	}

	const enum Grenade_Launcher {
		/** Default Clip */
		COMPONENT_GRENADELAUNCHER_CLIP_01 = 0x11ae5c97,
		/** Flashlight */
		COMPONENT_AT_AR_FLSH = 0x7bc4cddc,
		/** Grip */
		COMPONENT_AT_AR_AFGRIP = 0xc164f53,
		/** Scope */
		COMPONENT_AT_SCOPE_SMALL = 0xaa2c45b4
	}
}
