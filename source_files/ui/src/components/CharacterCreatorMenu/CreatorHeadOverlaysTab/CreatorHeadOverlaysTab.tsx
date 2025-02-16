import { FormLabel, Slider, Stack } from '@mui/material';
import { Client, headOverlaysNames } from '@shared';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import ExpandableMenu from '../../ExpandableMenu/ExpandableMenu';

const initialHeadOverlays = [
	{
		name: 'Blemishes',
		numHeadOverlayValues: 0
	},
	{
		name: 'Facial hair',
		numHeadOverlayValues: 0
	},
	{
		name: 'Eyebrows',
		numHeadOverlayValues: 0
	},
	{
		name: 'Ageing',
		numHeadOverlayValues: 0
	},
	{
		name: 'Makeup',
		numHeadOverlayValues: 0
	},
	{
		name: 'Blush',
		numHeadOverlayValues: 0
	},
	{
		name: 'Complexion',
		numHeadOverlayValues: 0
	},
	{
		name: 'Sun damage',
		numHeadOverlayValues: 0
	},
	{
		name: 'Lipstick',
		numHeadOverlayValues: 0
	},
	{
		name: 'Mole/freckles',
		numHeadOverlayValues: 0
	},
	{
		name: 'Chest hair',
		numHeadOverlayValues: 0
	},
	{
		name: 'Body blemishes',
		numHeadOverlayValues: 0
	}
];

export default function CreatorHeadOverlaysTab() {
	const initialUserHeadOverlays = useAppSelector(
		(state: RootState) => state.characterCreator.creatorData.headOverlays
	);
	const [userHeadOverlays, setUserHeadOverlays] = useState(initialUserHeadOverlays);
	const [headOverlays, setHeadOverlays] = useState<
		{ name: string; numHeadOverlayValues: number }[] | null
	>(null);

	useEffect(() => {
		Promise.all(
			initialHeadOverlays.map(
				async (
					overlay,
					index: number
				): Promise<{ name: string; numHeadOverlayValues: number }> => {
					const result = await mp.events.callProc(
						Client.Events.CharacterCreator.GetNumHeadOverlayValues,
						index
					);
					overlay.numHeadOverlayValues = result;
					return overlay;
				}
			)
		).then((result) => {
			setHeadOverlays(result);
		});
	}, []);

	const handleChange =
		(valueName: string, index: number) => (_: Event, value: number | number[]) => {
			setUserHeadOverlays((prev) => {
				const newArray = [...prev];
				newArray[index] = { ...newArray[index], [valueName]: value };
				return newArray;
			});

			mp.trigger(
				Client.Events.CharacterCreator.UpdateHeadOverlay,
				JSON.stringify({ valueName, index, value })
			);
		};

	return (
		<ExpandableMenu summary="Head overlays">
			<Stack sx={{ gap: '2rem', padding: '20px' }}>
				{headOverlays &&
					userHeadOverlays &&
					headOverlays.map(({ name, numHeadOverlayValues }, index) => {
						return (
							<ExpandableMenu key={name} summary={name}>
								<Slider
									key={'headOverlaySliderValue' + index}
									name={'headOverlaySliderValue' + index}
									value={
										userHeadOverlays[index].value == 255
											? -1
											: userHeadOverlays[index].value
									}
									aria-label="Always visible"
									step={1}
									min={-1}
									max={numHeadOverlayValues - 1}
									onChange={handleChange('value', index)}
								/>
								<FormLabel sx={{ textAlign: 'center' }}>
									Value:{' '}
									{userHeadOverlays[index].value == 255
										? ''
										: headOverlaysNames[index][userHeadOverlays[index]?.value]}
								</FormLabel>
								<Slider
									disabled={userHeadOverlays[index].value == -1}
									key={'headOverlaySliderOpacity' + index}
									name={'headOverlaySliderOpacity' + index}
									value={userHeadOverlays[index].opacity}
									aria-label="Always visible"
									step={0.01}
									min={0}
									max={1}
									onChange={handleChange('opacity', index)}
								/>
								<FormLabel sx={{ textAlign: 'center' }}>Opacity</FormLabel>

								{typeof userHeadOverlays[index].color != 'undefined' && (
									<>
										<Slider
											disabled={userHeadOverlays[index].value == -1}
											key={'headOverlaySliderFirstColor' + index}
											name={'headOverlaySliderValueFirstColor' + index}
											value={userHeadOverlays[index].color}
											aria-label="Always visible"
											step={1}
											min={0}
											max={63}
											onChange={handleChange('color', index)}
										/>
										<FormLabel sx={{ textAlign: 'center' }}>
											First color
										</FormLabel>
									</>
								)}
								{typeof userHeadOverlays[index].secondColor != 'undefined' && (
									<>
										<Slider
											disabled={userHeadOverlays[index].value == -1}
											key={'headOverlaySliderSecondColor' + index}
											name={'headOverlaySliderSecondColor' + index}
											value={userHeadOverlays[index].secondColor}
											aria-label="Always visible"
											step={1}
											min={0}
											max={63}
											onChange={handleChange('secondColor', index)}
										/>
										<FormLabel sx={{ textAlign: 'center' }}>
											Second color
										</FormLabel>
									</>
								)}
							</ExpandableMenu>
						);
					})}
			</Stack>
		</ExpandableMenu>
	);
}
