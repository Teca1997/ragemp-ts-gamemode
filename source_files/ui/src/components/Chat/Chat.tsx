import { Box, Stack, Typography } from '@mui/material';

function Chat() {
	const messages = [
		{ id: 0, text: 'Michael_Townley: Hey, are we ready for the heist?' },
		{ id: 1, text: 'Franklin_Clinton: Almost, just waiting on Trevor.' },
		{ id: 2, text: "Trevor_Philips: I'm here! Let's get this started!" },
		{ id: 3, text: "Lamar_Davis: Y'all better not mess this up." },
		{ id: 4, text: "Lester_Crest: I've got the security feed hacked. You're clear to go!" },
		{ id: 5, text: "Amanda_DeSanta: Michael, don't get yourself killed again." },
		{ id: 6, text: 'Jimmy_DeSanta: Yo, can I join? I wanna be part of the action!' },
		{ id: 7, text: 'Simeon_Yetarian: Franklin! I have a new car deal for you, my friend!' },
		{ id: 8, text: 'Officer_Tenpenny: I better not catch any of you breaking the law!' },
		{ id: 9, text: 'Ron_Jakowski: Trevor, we need to talk about business… NOW!' }
	];

	return (
		<>
			<Box
				sx={{
					position: 'absolute',
					top: 16,
					left: 16,
					width: '33vw',
					height: '25vh'
				}}
			>
				<Stack sx={{ gap: '1rem' }}>
					<Stack
						sx={{
							background: 'blue',
							gap: '0.5rem',
							width: '100%',
							height: 'calc(25vh - 2rem)',
							backgroundColor: 'rgba(0, 0, 0, 0.3)',
							padding: '0.5rem',
							overflowY: 'auto',
							scrollbarWidth: 'none',
							'&::-webkit-scrollbar': { display: 'none' }
						}}
					>
						{messages.map((message) => (
							<Typography
								key={message.id}
								fontSize={12}
								lineHeight={1}
								sx={{ color: 'white' }}
							>
								{message.text}
							</Typography>
						))}
					</Stack>
					<Stack
						sx={{
							width: '100%',
							backgroundColor: 'rgba(0, 0, 0, 0.3)'
						}}
					>
						<input
							type="text"
							placeholder="Type a message"
							style={{
								background: 'transparent',
								border: 'none',
								outline: 'none',
								width: '100%',
								padding: '0.5rem',
								color: 'white'
							}}
						></input>
					</Stack>
				</Stack>
			</Box>
		</>
	);
}

export default Chat;
