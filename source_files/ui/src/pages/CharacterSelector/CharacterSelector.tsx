import { Box, Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Client } from '@shared';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function CharacterSelector() {
	const theme = useTheme();
	const authData = useSelector((state: RootState) => state.auth.authInfo);

	const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

	useEffect(() => {}, [authData]);

	const handlePrevCharacter = () => {
		if (currentCharacterIndex == 0) {
			setCurrentCharacterIndex(authData.characters!.length - 1);
			mp.trigger(
				Client.Events.CharacterSelector.ApplyCharacter,
				authData.characters!.length - 1
			);
		} else {
			setCurrentCharacterIndex(currentCharacterIndex - 1);
			mp.trigger(Client.Events.CharacterSelector.ApplyCharacter, currentCharacterIndex - 1);
		}
	};

	const handleNextCharacter = () => {
		if (currentCharacterIndex == authData.characters!.length - 1) {
			setCurrentCharacterIndex(0);
			mp.trigger(Client.Events.CharacterSelector.ApplyCharacter, 0);
		} else {
			setCurrentCharacterIndex(currentCharacterIndex + 1);
			mp.trigger(Client.Events.CharacterSelector.ApplyCharacter, currentCharacterIndex + 1);
		}
		console.log(currentCharacterIndex);
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
					{authData.characters!.length >= 2 && (
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
					{authData.characters!.length >= 2 && (
						<ChevronRightIcon color={'primary'} sx={{ fontSize: '10rem' }} />
					)}
				</IconButton>
			</Box>
			{authData.characters!.length > 0 && (
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
						{authData.characters &&
							authData.characters[currentCharacterIndex].firstName +
								' ' +
								authData.characters[currentCharacterIndex].lastName}
					</Typography>
					<Typography color="primary" fontSize={'16'}>
						Time played:{' '}
						{authData.characters &&
							authData?.characters[currentCharacterIndex].timePlayed}
					</Typography>
					<Typography color="primary" fontSize={'16'}>
						Created:{' '}
						{authData.characters &&
							authData.characters[currentCharacterIndex].dateCreated?.toString()}
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
