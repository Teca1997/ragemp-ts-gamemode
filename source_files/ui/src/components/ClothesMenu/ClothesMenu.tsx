import { FormLabel, Slider, Stack } from '@mui/material';
import { CharacterClothingItem, Client, ClothingCategory } from '@shared';
import React, { useEffect, useState } from 'react';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';

export default function ClothesMenu() {
	const [clothesData, setClothesData] = useState<null | ClothingCategory[]>(null);

	const [currentSelections, setSurrentSelections] = useState<CharacterClothingItem[]>([
		{ id: 1, drawable: 0, texture: 0, palette: 0 },
		{ id: 2, drawable: 0, texture: 0, palette: 0 },
		{ id: 3, drawable: 0, texture: 0, palette: 0 },
		{ id: 4, drawable: 0, texture: 0, palette: 0 },
		{ id: 5, drawable: 0, texture: 0, palette: 0 },
		{ id: 6, drawable: 0, texture: 0, palette: 0 },
		{ id: 7, drawable: 0, texture: 0, palette: 0 },
		{ id: 8, drawable: 0, texture: 0, palette: 0 },
		{ id: 9, drawable: 0, texture: 0, palette: 0 },
		{ id: 10, drawable: 0, texture: 0, palette: 0 },
		{ id: 11, drawable: 0, texture: 0, palette: 0 }
	]);

	const clothingCategories: ClothingCategory[] = [
		{ id: 1, name: 'Masks', numOfComVarPermutions: [] },
		{ id: 4, name: 'Pants', numOfComVarPermutions: [] },
		{ id: 5, name: 'Bags and Parachutes', numOfComVarPermutions: [] },
		{ id: 6, name: 'Shoes', numOfComVarPermutions: [] },
		{ id: 7, name: 'Accessories', numOfComVarPermutions: [] },
		{ id: 8, name: 'Undershirts', numOfComVarPermutions: [] },
		{ id: 9, name: 'Body Armors', numOfComVarPermutions: [] },
		{ id: 10, name: 'Decals', numOfComVarPermutions: [] },
		{ id: 11, name: 'Tops', numOfComVarPermutions: [] }
	];

	useEffect(() => {
		Promise.all(
			clothingCategories.map(async ({ id, name }) => {
				const result = await mp.events.callProc(
					Client.Events.PlayerService.GetNumOfComVarPermutions,
					id
				);

				return {
					id,
					name,
					numOfComVarPermutions: JSON.parse(result)
				};
			})
		).then((result) => {
			setClothesData(result);
		});
	}, []);

	const handleChange =
		(id: number, valueName: string) =>
		(_event: Event, value: number | number[], _activeThumb: number) => {
			const nextUserSelections = currentSelections.map((selection) => {
				const nextUserSelection: CharacterClothingItem = JSON.parse(
					JSON.stringify(selection)
				);
				if (nextUserSelection.id == id) {
					nextUserSelection[valueName as keyof typeof nextUserSelection] =
						value as number;
					mp.trigger(
						Client.Events.CharacterCreator.UpdateComponentVariation,
						JSON.stringify(nextUserSelection)
					);
				}

				return nextUserSelection;
			});

			setSurrentSelections(nextUserSelections);
		};

	return (
		<ExpandableMenu summary="Clothes">
			<Stack sx={{ gap: '2rem', padding: '20px' }}>
				{clothesData &&
					clothesData.map(({ id, name, numOfComVarPermutions }, index) => {
						const drawable =
							currentSelections[
								currentSelections.findIndex((category) => category.id == id)
							].drawable;
						const texture =
							currentSelections[
								currentSelections.findIndex((category) => category.id == id)
							].texture;

						return (
							<React.Fragment key={name}>
								<ExpandableMenu summary={name}>
									<Slider
										key={'clothesMenuSliderDrawable' + name}
										name={'clothesMenuSliderDrawable' + name}
										value={drawable}
										aria-label="Always visible"
										step={1}
										min={0}
										onChange={handleChange(id, 'drawable')}
										max={numOfComVarPermutions.length}
									/>
									<FormLabel sx={{ textAlign: 'center' }}>Drawable</FormLabel>
									<Slider
										disabled={numOfComVarPermutions[index] < 2}
										key={'clothesMenuSliderTexture' + name}
										name={'clothesMenuSliderTexture' + name}
										value={texture}
										aria-label="Always visible"
										step={1}
										min={0}
										onChange={handleChange(id, 'texture')}
										max={numOfComVarPermutions[index]}
									/>
									<FormLabel sx={{ textAlign: 'center' }}>Texture</FormLabel>
								</ExpandableMenu>
							</React.Fragment>
						);
					})}
			</Stack>
		</ExpandableMenu>
	);
}
