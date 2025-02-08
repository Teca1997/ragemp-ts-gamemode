import { FormLabel, Slider, Stack } from '@mui/material';
import { Client } from '@shared';
import { useEffect, useState } from 'react';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';

type ClothingCategory = {
	componentId: number;
	name: string;
	numOfComVarPermutions: number[];
};

type UserSelection = {
	componentId: number;
	drawableId: number;
	textureId: number;
};

export default function ClothesMenu() {
	const [clothesData, setClothesData] = useState<null | ClothingCategory[]>(null);

	const [currentSelections, setSurrentSelections] = useState<UserSelection[]>([
		{ componentId: 1, drawableId: 0, textureId: 0 },
		{ componentId: 2, drawableId: 0, textureId: 0 },
		{ componentId: 3, drawableId: 0, textureId: 0 },
		{ componentId: 4, drawableId: 0, textureId: 0 },
		{ componentId: 5, drawableId: 0, textureId: 0 },
		{ componentId: 6, drawableId: 0, textureId: 0 },
		{ componentId: 7, drawableId: 0, textureId: 0 },
		{ componentId: 8, drawableId: 0, textureId: 0 },
		{ componentId: 9, drawableId: 0, textureId: 0 },
		{ componentId: 10, drawableId: 0, textureId: 0 },
		{ componentId: 11, drawableId: 0, textureId: 0 }
	]);

	const clothingCategories: ClothingCategory[] = [
		{ componentId: 1, name: 'Masks', numOfComVarPermutions: [] },
		{ componentId: 2, name: 'Hair Styles', numOfComVarPermutions: [] },
		{ componentId: 3, name: 'Torsos', numOfComVarPermutions: [] },
		{ componentId: 4, name: 'Legs', numOfComVarPermutions: [] },
		{ componentId: 5, name: 'Bags and Parachutes', numOfComVarPermutions: [] },
		{ componentId: 6, name: 'Shoes', numOfComVarPermutions: [] },
		{ componentId: 7, name: 'Accessories', numOfComVarPermutions: [] },
		{ componentId: 8, name: 'Undershirts', numOfComVarPermutions: [] },
		{ componentId: 9, name: 'Body Armors', numOfComVarPermutions: [] },
		{ componentId: 10, name: 'Decals', numOfComVarPermutions: [] },
		{ componentId: 11, name: 'Tops', numOfComVarPermutions: [] }
	];

	useEffect(() => {
		Promise.all(
			clothingCategories.map(async ({ componentId, name }) => {
				const result = await mp.events.callProc(
					Client.Events.PlayerService.GetNumOfComVarPermutions,
					componentId
				);

				return {
					componentId,
					name,
					numOfComVarPermutions: result
				};
			})
		).then((result) => {
			setClothesData(result);
		});
	}, []);

	const handleChange =
		(componentId: number, valueName: string) =>
		(_event: Event, value: number | number[], _activeThumb: number) => {
			const nextUserSelections = currentSelections.map((selection) => {
				const nextUserSelection = JSON.parse(JSON.stringify(selection));
				if (nextUserSelection.componentId == componentId) {
					nextUserSelection[valueName] = value as number;
				}
				return nextUserSelection;
			});

			setSurrentSelections(nextUserSelections);
		};

	return (
		<ExpandableMenu summary="Clothes">
			<Stack sx={{ gap: '2rem', padding: '20px' }}>
				{clothesData &&
					clothesData.map(({ componentId, name, numOfComVarPermutions }, index) => {
						const drawableId =
							currentSelections[
								currentSelections.findIndex(
									(category) => category.componentId == componentId
								)
							].drawableId;
						const textureId =
							currentSelections[
								currentSelections.findIndex(
									(category) => category.componentId == componentId
								)
							].textureId;

						return (
							<ExpandableMenu summary={name}>
								<Slider
									key={'clothesMenuSliderDrawable' + name}
									name={'clothesMenuSliderDrawable' + name}
									value={drawableId}
									aria-label="Always visible"
									step={1}
									min={0}
									onChange={handleChange(componentId, 'drawableId')}
									max={numOfComVarPermutions.length}
								/>
								<FormLabel sx={{ textAlign: 'center' }}>Drawable</FormLabel>
								<Slider
									key={'clothesMenuSliderTexture' + name}
									name={'clothesMenuSliderTexture' + name}
									value={textureId}
									aria-label="Always visible"
									step={1}
									min={0}
									onChange={handleChange(componentId, 'textureId')}
									max={numOfComVarPermutions[index]}
								/>
								<FormLabel sx={{ textAlign: 'center' }}>Texture</FormLabel>
							</ExpandableMenu>
						);
					})}
			</Stack>
		</ExpandableMenu>
	);
}
