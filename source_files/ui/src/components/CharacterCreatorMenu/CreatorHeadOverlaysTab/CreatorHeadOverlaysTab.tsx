import { FormLabel, Slider, Stack } from '@mui/material';
import { Client, defaultHeadOverlays } from '@shared';
import { SyntheticEvent, useEffect, useState } from 'react';
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
	},
	{
		name: 'Add Body Blemishes',
		numHeadOverlayValues: 0
	}
];

export default function CreatorHeadOverlaysTab() {
	const [userHeadOverlays, setUserHeadOverlays] = useState(defaultHeadOverlays);
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
					setHeadOverlays(initialHeadOverlays);
					return overlay;
				}
			)
		).then((result) => {
			setHeadOverlays(result);
		});
	});

	useEffect(() => {
		console.log(userHeadOverlays);
	}, [userHeadOverlays]);

	const handleChange =
		(valueName: string, index: number) =>
		(_: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
			const nextOverlays = userHeadOverlays.map((overlay, i) => {
				if (index == i) {
					const newOverlay = JSON.parse(JSON.stringify(overlay));
					newOverlay[valueName as keyof typeof overlay] = value as number;
					return newOverlay;
				}
				return JSON.parse(JSON.stringify(overlay));
			});
			setUserHeadOverlays(nextOverlays);
			mp.trigger(
				Client.Events.CharacterCreator.UpdateHeadOverlay,
				JSON.stringify(nextOverlays[index])
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
								<FormLabel sx={{ textAlign: 'center' }}>Value</FormLabel>
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
								<Slider
									disabled={userHeadOverlays[index].value == -1}
									key={'headOverlaySliderFirstColor' + index}
									name={'headOverlaySliderValueFirstColor' + index}
									value={userHeadOverlays[index].firstColor}
									aria-label="Always visible"
									step={1}
									min={0}
									max={63}
									onChange={handleChange('firstColor', index)}
								/>
								<FormLabel sx={{ textAlign: 'center' }}>First color</FormLabel>
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
								<FormLabel sx={{ textAlign: 'center' }}>Second color</FormLabel>
							</ExpandableMenu>
						);
					})}
			</Stack>
		</ExpandableMenu>
	);
}
