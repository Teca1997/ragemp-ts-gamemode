import { Divider, FormLabel, Slider, Stack } from '@mui/material';
import { Client } from '@shared';
import ExpandableMenu from '../../ExpandableMenu/ExpandableMenu';

const faceFeatures = [
	{
		name: 'Nose width',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Narrow' },
			{ value: 1, label: 'Wide' }
		]
	},
	{
		name: 'Nose height',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Top' },
			{ value: 1, label: 'Bottom' }
		]
	},
	{
		name: 'Nose length',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Grand' },
			{ value: 1, label: 'Petitte' }
		]
	},
	{
		name: 'Nose bridge',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Round' },
			{ value: 1, label: 'Hollow' }
		]
	},
	{
		name: 'Nose tip',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Upward' },
			{ value: 1, label: 'Downward' }
		]
	},
	{
		name: 'Nose bridge shift',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'To the right' },
			{ value: 1, label: 'To the left' }
		]
	},
	{
		name: 'Brow height',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Top' },
			{ value: 1, label: 'Bottom' }
		]
	},
	{
		name: 'Brow width',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Inward' },
			{ value: 1, label: 'Outward' }
		]
	},
	{
		name: 'Cheekbone height',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Top' },
			{ value: 1, label: 'Bottom' }
		]
	},
	{
		name: 'Cheekbone width',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Narrow' },
			{ value: 1, label: 'Wide' }
		]
	},
	{
		name: 'Cheeks width',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Narrow' },
			{ value: 1, label: 'Wide' }
		]
	},
	{
		name: 'Eyes',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Opened' },
			{ value: 1, label: 'Closed' }
		]
	},
	{
		name: 'Lips',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Wide' },
			{ value: 1, label: 'Narrow' }
		]
	},
	{
		name: 'aw width',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Narrow' },
			{ value: 1, label: 'Wide' }
		]
	},
	{
		name: 'Jaw width',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Narrow' },
			{ value: 1, label: 'Wide' }
		]
	},
	{
		name: 'Chin length',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Small' },
			{ value: 1, label: 'Long' }
		]
	},
	{
		name: 'Chin position',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Inward' },
			{ value: 1, label: 'Outward' }
		]
	},
	{
		name: 'Chin width',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Narrow' },
			{ value: 1, label: 'Grand' }
		]
	},
	{
		name: 'Chin shape',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Simple chin' },
			{ value: 1, label: 'Double chin' }
		]
	},
	{
		name: 'Neck width',
		defaultValue: 0,
		marks: [
			{ value: -1, label: 'Narrow' },
			{ value: 1, label: 'Wide' }
		]
	}
];

export default function CreatorFaceFeaturesTab() {
	return (
		<ExpandableMenu summary="Face features">
			<Stack key={'s'} sx={{ gap: '1rem', padding: '0 20px' }}>
				{faceFeatures.map(({ name, defaultValue, marks }, index) => {
					return (
						<>
							<Slider
								key={'faceFeatureSlider' + index}
								name={index.toString()}
								aria-label="Always visible"
								defaultValue={defaultValue}
								step={0.01}
								marks={marks}
								min={-1}
								max={1}
								onChange={(event) => {
									mp.trigger(
										Client.Events.CharacterCreator.UpdateFaceFeature,
										JSON.stringify(event.target)
									);
								}}
							/>
							<FormLabel sx={{ textAlign: 'center' }}>{name}</FormLabel>
							<Divider />
						</>
					);
				})}
			</Stack>
		</ExpandableMenu>
	);
}
