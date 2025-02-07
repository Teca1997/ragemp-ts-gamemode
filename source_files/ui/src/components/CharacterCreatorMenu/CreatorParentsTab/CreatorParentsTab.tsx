import { Divider, FormLabel, Stack } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Client, defaultParents } from '@shared';
import { useMemo, useState } from 'react';
import ExpandableMenu from '../../ExpandableMenu/ExpandableMenu';

type CreatorParentsTabProps = {
	defaultExpanded?: boolean;
};

export default function CreatorParentsTab({ defaultExpanded = false }: CreatorParentsTabProps) {
	const numberOfFathers = 24;
	const numberOfMothers = 22;

	const [father, setFather] = useState(defaultParents.father);
	const [mother, setMother] = useState(defaultParents.mother);
	const [similarity, setSimilarity] = useState(defaultParents.similarity);
	const [skinSimilarity, setSkinSimilarity] = useState(defaultParents.skinSimilarity);
	const maleParentImages = useMemo(() => {
		const imageMap: Record<number, string> = {};

		Array.from({ length: numberOfFathers }, (_, i) => i).forEach((num) => {
			imageMap[num] = new URL(
				`../../../assets/freemode-ped-parents/parent_male_${num.toString()}.png`,
				import.meta.url
			).href;
		});

		return imageMap;
	}, []);

	const femaleParentImages = useMemo(() => {
		const imageMap: Record<number, string> = {};

		Array.from({ length: numberOfMothers }, (_, i) => i).forEach((num) => {
			imageMap[num] = new URL(
				`../../../assets/freemode-ped-parents/parent_female_${num.toString()}.png`,
				import.meta.url
			).href;
		});

		return imageMap;
	}, []);

	const similarityMarks = [
		{
			value: 0,
			label: 'Mother'
		},
		{
			value: 1,
			label: 'Father'
		}
	];

	const marksFathers = [
		{
			value: 0,
			label: 1
		},
		{
			value: numberOfFathers,
			label: numberOfFathers
		}
	];
	const marksMothers = [
		{
			value: 0,
			label: 1
		},
		{
			value: numberOfMothers,
			label: numberOfMothers
		}
	];

	return (
		<ExpandableMenu summary={'Parents'} defaultExpanded={defaultExpanded}>
			<Stack sx={{ padding: '0 1rem' }}>
				<Stack sx={{ justifyContent: 'center' }}>
					<img
						src={maleParentImages[father]}
						style={{
							width: '100px',
							height: '100px',
							borderRadius: '1rem'
						}}
					/>
					<Slider
						name="fatherSlider"
						value={father}
						step={1}
						marks={marksFathers}
						min={0}
						max={numberOfFathers - 1}
						onChange={(_, value) => {
							setFather(value as number);
							mp.trigger(
								Client.Events.CharacterCreator.UpdateParents,
								JSON.stringify({
									father,
									mother,
									similarity,
									skinSimilarity
								})
							);
						}}
					/>
					<FormLabel sx={{ textAlign: 'center' }}>Father</FormLabel>
				</Stack>
				<Divider />
				<Stack sx={{ justifyContent: 'center' }}>
					<img
						src={femaleParentImages[mother]}
						style={{
							width: '100px',
							height: '100px',
							borderRadius: '1rem'
						}}
					/>
					<Slider
						name="motherSlider"
						value={mother}
						step={1}
						marks={marksMothers}
						min={0}
						max={numberOfMothers - 1}
						onChange={(_, value) => {
							setMother(value as number);
							mp.trigger(
								Client.Events.CharacterCreator.UpdateParents,
								JSON.stringify({
									father,
									mother,
									similarity,
									skinSimilarity
								})
							);
						}}
					/>
					<FormLabel sx={{ textAlign: 'center' }}>Mother</FormLabel>
				</Stack>
				<Divider />
				<Slider
					name="similaritySlider"
					value={similarity}
					step={0.01}
					marks={similarityMarks}
					min={0}
					max={1}
					onChange={(_, value) => {
						setSimilarity(value as number);
						mp.trigger(
							Client.Events.CharacterCreator.UpdateParents,
							JSON.stringify({
								father,
								mother,
								similarity,
								skinSimilarity
							})
						);
					}}
				/>
				<FormLabel sx={{ textAlign: 'center' }}>Similarity</FormLabel>
				<Divider />
				<Slider
					name="skinSimilaritySlider"
					value={skinSimilarity}
					step={0.01}
					marks={similarityMarks}
					min={0}
					max={1}
					onChange={(_, value) => {
						setSkinSimilarity(value as number);
						mp.trigger(
							Client.Events.CharacterCreator.UpdateParents,
							JSON.stringify({
								father,
								mother,
								similarity,
								skinSimilarity
							})
						);
					}}
				/>
				<FormLabel sx={{ textAlign: 'center' }}>Skin similarity</FormLabel>
			</Stack>
		</ExpandableMenu>
	);
}
