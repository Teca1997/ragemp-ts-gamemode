import {
	Divider,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField
} from '@mui/material';
import { Client } from '@shared';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/hooks';
import { characterCreatorActions } from '../../../redux/slices/characterCreatorSlice';
import { RootState } from '../../../redux/store';
import ExpandableMenu from '../../ExpandableMenu/ExpandableMenu';
export default function CreatorPersonalDetailsTab({
	defaultExpanded = false
}: {
	defaultExpanded?: boolean;
}) {
	const dispatch = useAppDispatch();

	const { gender, firstName, lastName } = useSelector(
		(state: RootState) => state.characterCreator.creatorData
	);

	const handleGenderChange = (_event: any, gender: string) => {
		mp.trigger(Client.Events.CharacterCreator.UpdateGender, gender);
		dispatch(characterCreatorActions.setGender(parseInt(gender)));
	};

	return (
		<>
			<ExpandableMenu summary="Personal details" defaultExpanded={defaultExpanded}>
				<Stack sx={{ gap: '2rem' }}>
					<FormLabel>Gender</FormLabel>
					<RadioGroup
						defaultValue={gender}
						name="gender"
						row
						onChange={handleGenderChange}
					>
						<FormControlLabel value="0" control={<Radio />} label="Female" />
						<FormControlLabel value="1" control={<Radio />} label="Male" />
					</RadioGroup>
					<Divider />
					<TextField
						id="firstName"
						size="small"
						label="First name"
						type="text"
						name="firstName"
						placeholder="First name....."
						defaultValue={firstName}
						onChange={(event) => {
							mp.trigger(
								Client.Events.CharacterCreator.UpdateFirstName,
								event.target.value
							);
						}}
					/>
					<Divider />
					<TextField
						id="lastName"
						size="small"
						label="Last name"
						type="text"
						name="lastName"
						placeholder="Last name....."
						defaultValue={lastName}
						onChange={(event) => {
							mp.trigger(
								Client.Events.CharacterCreator.UpdateLastName,
								event.target.value
							);
						}}
					/>
				</Stack>
			</ExpandableMenu>
		</>
	);
}
