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
import { useDispatch, useSelector } from 'react-redux';
import { characterCreatorActions } from '../../../redux/slices/characterCreatorSlice';
import { RootState } from '../../../redux/store';
import ExpandableMenu from '../../ExpandableMenu/ExpandableMenu';
export default function CreatorPersonalDetailsTab({
	defaultExpanded = false
}: {
	defaultExpanded?: boolean;
	store: any;
}) {
	const dispatch = useDispatch();

	const { gender, firstName, lastName } = useSelector(
		(state: RootState) => state.characterCreator.creatorData
	);

	const handleGenderChange = (_event: any, gender: string) => {
		mp.trigger(Client.Events.CharacterCreator.UpdateGander, gender);
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
					/>
				</Stack>
			</ExpandableMenu>
		</>
	);
}
