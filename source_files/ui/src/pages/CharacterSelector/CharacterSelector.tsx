import { Box, Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Client } from '@shared';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function CharacterSelector() {
	const theme = useTheme();
	const authStore = useSelector((state: RootState) => state.auth.authInfo);

	const characters = authStore.characters;

	const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

	const handlePrevCharacter = () => {
		console.log(currentCharacterIndex);
		if (currentCharacterIndex == 0) {
			setCurrentCharacterIndex(characters!.length - 1);
		} else {
			setCurrentCharacterIndex(currentCharacterIndex - 1);
		}
		mp.trigger(Client.Events.CharacterSelector.ApplyCharacter, currentCharacterIndex);
		console.log(currentCharacterIndex);
	};

	const handleNextCharacter = () => {
		console.log(currentCharacterIndex);

		if (currentCharacterIndex == characters!.length - 1) {
			setCurrentCharacterIndex(0);
		} else {
			setCurrentCharacterIndex(currentCharacterIndex + 1);
		}
		console.log(currentCharacterIndex);
		mp.trigger(Client.Events.CharacterSelector.ApplyCharacter, currentCharacterIndex);
	};

	const handlePlay = () => {
		mp.trigger(Client.Events.CharacterSelector.Play, currentCharacterIndex);
	};
	return (
		<Box>
			<Box
				sx={{
					position: 'absolute',
					left: 0,
					top: '50%',
					transform: 'translateY(-50%)'
				}}
			>
				<IconButton onClick={handlePrevCharacter}>
					{characters!.length >= 2 && (
						<ChevronLeftIcon color={'primary'} sx={{ fontSize: '10rem' }} />
					)}
				</IconButton>
			</Box>
			<Box
				sx={{
					position: 'absolute',
					right: 0,
					top: '50%',
					transform: 'translateY(-50%)'
				}}
			>
				<IconButton onClick={handleNextCharacter}>
					{characters!.length >= 2 && (
						<ChevronRightIcon color={'primary'} sx={{ fontSize: '10rem' }} />
					)}
				</IconButton>
			</Box>
			{characters!.length > 0 && (
				<Button
					variant={'contained'}
					sx={{
						position: 'absolute',
						bottom: 10,
						left: '50%',
						transform: 'translateX(-50%)'
					}}
					onClick={handlePlay}
				>
					Play
				</Button>
			)}
			<Paper
				elevation={3}
				sx={{
					backgroundColor: 'rgba(0, 0, 0, 0.3)',
					position: 'absolute',
					top: 16,
					right: 16,
					padding: 2,
					minWidth: '30%'
				}}
			>
				<Stack
					sx={{
						flexDirection: 'row',
						flex: 1,
						justifyContent: 'space-between',
						borderBottom: `1px solid ${theme.palette.primary.main}`,
						paddingBottom: '0.5rem'
					}}
				>
					<Typography fontSize={20} fontWeight={'bold'} sx={{ color: 'white' }}>
						Character info
					</Typography>
					<Stack sx={{ flexDirection: 'row', gap: '0.5rem' }}>
						<IconButton sx={{ color: 'white' }}>
							<EditIcon />
						</IconButton>
						<IconButton sx={{ color: theme.palette.error.dark }}>
							<DeleteForeverIcon />
						</IconButton>
					</Stack>
				</Stack>

				<Stack sx={{ gap: '0.5rem' }}>
					<Typography color="primary" fontSize={'16'}>
						Name:{' '}
						{authStore.characters &&
							authStore?.characters[currentCharacterIndex].firstname +
								' ' +
								authStore?.characters[currentCharacterIndex].lastname}
					</Typography>
					<Typography color="primary" fontSize={'16'}>
						Time played:{' '}
						{authStore.characters &&
							authStore?.characters[currentCharacterIndex].timePlayed}
					</Typography>
					<Typography color="primary" fontSize={'16'}>
						Created:{' '}
						{authStore.characters &&
							authStore?.characters[currentCharacterIndex].dateCreated?.toString()}
					</Typography>
				</Stack>
			</Paper>
			<Box sx={{ padding: '24px' }}>
				<IconButton
					onClick={() => mp.trigger(Client.Events.Auth.Logout)}
					sx={{ color: 'white' }}
				>
					<LogoutIcon />
				</IconButton>
				<IconButton
					onClick={() => {
						mp.trigger(Client.Events.CharacterCreator.Start);
					}}
					sx={{ color: 'white' }}
				>
					<AddCircleOutlineIcon />
				</IconButton>
			</Box>
		</Box>
	);
}

export default CharacterSelector;
