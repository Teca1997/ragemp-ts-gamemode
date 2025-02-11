import ColorLensIcon from '@mui/icons-material/ColorLens';
import {
	Box,
	Button,
	Card,
	CardContent,
	Drawer,
	FormLabel,
	IconButton,
	Paper,
	Slider,
	Stack,
	Typography
} from '@mui/material';
import { Client } from '@shared';
import { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import ExpandableMenu from '../../ExpandableMenu/ExpandableMenu';
import { HairColor, hairColors, hairStyleList } from './mock';

export default function CreatorHairTab() {
	const [isColorDrawerOpen, setIsColorDrawerOpen] = useState(false);
	const [userHairData, setUserHairData] = useState<HairColor>();

	const initialHairStyle = useAppSelector(
		(state: RootState) => state.characterCreator.creatorData.clothes
	)[2];

	const initialHairColors = useAppSelector(
		(state: RootState) => state.characterCreator.creatorData.hairColors
	);

	const gender = useAppSelector((state: RootState) => state.characterCreator.creatorData.gender);

	return (
		<ExpandableMenu summary="Hair">
			<Stack sx={{ padding: '1rem' }}>
				<Button
					variant={'outlined'}
					startIcon={<ColorLensIcon />}
					onClick={() => setIsColorDrawerOpen(!isColorDrawerOpen)}
				>
					{`${isColorDrawerOpen ? 'Close' : 'Open'} hair color picker`}
				</Button>
			</Stack>

			<>
				<Slider
					name="hairStyleSlider"
					defaultValue={initialHairStyle.drawable}
					step={1}
					min={0}
					max={gender === 0 ? hairStyleList[0].length : hairStyleList[1].length}
					onChange={(_, value) => {
						mp.trigger(
							Client.Events.CharacterCreator.UpdateComponentVariation,
							JSON.stringify({ id: 2, drawable: value, texture: 0, palette: 0 })
						);
					}}
				/>
				<FormLabel sx={{ textAlign: 'center' }}>
					{hairStyleList[gender].find((style) => style.id == initialHairStyle.id)?.name}
				</FormLabel>
			</>

			{/* Izdvojit */}
			<Drawer
				anchor="left"
				open={isColorDrawerOpen}
				onClose={() => setIsColorDrawerOpen(false)}
				sx={{
					'& .MuiDrawer-paper': {
						width: 400,
						boxSizing: 'border-box',
						padding: 2
					}
				}}
				hideBackdrop
				variant="persistent"
			>
				<Box
					sx={{
						height: '100%',
						overflow: 'hidden',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Typography variant="h6" component="h2" sx={{ mb: 2 }}>
						Color Picker
					</Typography>

					<Box sx={{ flexGrow: 1, overflow: 'auto', pr: 1, pb: 2 }}>
						<Card>
							<CardContent>
								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns: 'repeat(4, 1fr)',
										gap: 1
									}}
								>
									{hairColors.map((color, index) => (
										<IconButton
											key={color.hex}
											onClick={() => {
												setUserHairData(color);
												mp.trigger(
													Client.Events.CharacterCreator.UpdateHairColor,
													JSON.stringify({
														color: color.id,
														highlightColor: 0
													})
												);
											}}
											sx={{
												width: 48,
												height: 48,
												backgroundColor: color.hex,
												borderRadius: 1,
												transition: 'transform 0.2s',
												border:
													userHairData?.hex === color.hex
														? '2px solid #2196f3'
														: '1px solid #e0e0e0',
												'&:hover': {
													transform: 'scale(1.1)',
													backgroundColor: color.hex
												}
											}}
										/>
									))}
								</Box>

								{userHairData && (
									<Paper
										elevation={0}
										sx={{
											mt: 3,
											p: 2,
											bgcolor: 'background.paper',
											borderRadius: 1
										}}
									>
										<Typography variant="subtitle1" sx={{ mb: 1 }}>
											Selected Color:
										</Typography>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
											<Box
												sx={{
													width: 32,
													height: 32,
													borderRadius: 1,
													backgroundColor: userHairData.hex
												}}
											/>
											<Box>
												<Typography>HEX: {userHairData.hex}</Typography>
												<Typography>
													RGB: {userHairData.rgb.join(', ')}
												</Typography>
											</Box>
										</Box>
									</Paper>
								)}
							</CardContent>
						</Card>
					</Box>
				</Box>
			</Drawer>
		</ExpandableMenu>
	);
}
