import { Box, Button } from '@mui/material';
import { CEF, Client } from '@shared';
import { useAppDispatch } from '../../redux/hooks';
import { pageManagerActions } from '../../redux/slices/pageManagerSlice';
import ClothesMenu from '../ClothesMenu/ClothesMenu';
import { ToastManager } from '../Toast/ToastManager';
import CreatorFaceFeaturesTab from './CreatorFaceFeaturesTab/CreatorFaceFeaturesTab';
import CreatorHairTab from './CreatorHairTab/CreatorHairTab';
import CreatorHeadOverlaysTab from './CreatorHeadOverlaysTab/CreatorHeadOverlaysTab';
import CreatorParentsTab from './CreatorParentsTab/CreatorParentsTab';
import CreatorPersonalDetailsTab from './CreatorPersonalDetailsTab/CreatorPersonalDetailsTab';
function CharacterCreatorMenu() {
	const dispatch = useAppDispatch();

	const handleClick = async () => {
		if (await mp.events.callProc(Client.Events.CharacterCreator.Save)) {
			dispatch(pageManagerActions.setPage(CEF.Pages.CharacterSelector));
			ToastManager.instance.success('Character created');
		} else {
			ToastManager.instance.error('Something went wrong');
		}
	};

	return (
		<Box sx={{ maxHeight: '90vh', overflow: 'hidden', overflowY: 'auto' }}>
			<CreatorPersonalDetailsTab />
			<CreatorParentsTab />
			<CreatorHairTab />
			<CreatorFaceFeaturesTab />
			<CreatorHeadOverlaysTab />
			<ClothesMenu />
			<Button variant="contained" fullWidth onClick={handleClick}>
				Save
			</Button>
		</Box>
	);
}

export default CharacterCreatorMenu;
