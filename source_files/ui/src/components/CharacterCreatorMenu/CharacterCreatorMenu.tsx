import { Box, Button } from '@mui/material';
import { Client } from '@shared';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CreatorFaceFeaturesTab from './CreatorFaceFeaturesTab/CreatorFaceFeaturesTab';
import CreatorHeadOverlaysTab from './CreatorHeadOverlaysTab/CreatorHeadOverlaysTab';
import CreatorParentsTab from './CreatorParentsTab/CreatorParentsTab';
import CreatorPersonalDetailsTab from './CreatorPersonalDetailsTab/CreatorPersonalDetailsTab';
function CharacterCreatorMenu() {
	const creatorCharacterData = useSelector(
		(state: RootState) => state.characterCreator.creatorData
	);
	const handleClick = () => {
		console.log(creatorCharacterData);

		mp.trigger(Client.Events.CharacterCreator.Save);
	};

	return (
		<Box sx={{ maxHeight: '90vh', overflow: 'hidden', overflowY: 'auto' }}>
			<CreatorPersonalDetailsTab store={creatorCharacterData} />
			<CreatorParentsTab />
			<CreatorFaceFeaturesTab />
			<CreatorHeadOverlaysTab />
			<Button variant="contained" fullWidth onClick={handleClick}>
				Save
			</Button>
		</Box>
	);
}

export default CharacterCreatorMenu;
