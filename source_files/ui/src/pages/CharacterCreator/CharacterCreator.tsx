import DoorBackIcon from '@mui/icons-material/DoorBack';
import { Box, IconButton } from '@mui/material';
import { CEF, Client } from '@shared';
import { useDispatch } from 'react-redux';
import CharacterCreatorMenu from '../../components/CharacterCreatorMenu/CharacterCreatorMenu';
import { pageManagerActions } from '../../redux/slices/pageManagerSlice';

function CharacterCreator() {
	const dispatch = useDispatch();
	return (
		<Box>
			<Box
				sx={{
					backgroundColor: 'rgba(0, 0, 0, 0.3)',
					position: 'absolute',
					top: 16,
					right: 16,
					padding: 2,
					width: '25%'
				}}
			>
				<CharacterCreatorMenu />
			</Box>

			<Box sx={{ padding: '24px' }}>
				<IconButton
					onClick={() => {
						dispatch(pageManagerActions.setPage(CEF.Pages.CharacterSelector));
						mp.trigger(Client.Events.CharacterSelector.Start);
					}}
					sx={{ color: 'white' }}
				>
					<DoorBackIcon />
				</IconButton>
			</Box>
		</Box>
	);
}

export default CharacterCreator;
