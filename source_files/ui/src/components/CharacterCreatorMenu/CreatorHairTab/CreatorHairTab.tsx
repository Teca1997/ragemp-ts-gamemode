import { Stack } from '@mui/material';
import { useState } from 'react';
import ExpandableMenu from '../../ExpandableMenu/ExpandableMenu';

export default function CreatorHairTab() {
	const [userHairData, setUserHairData] = useState();

	return (
		<ExpandableMenu summary="Hair">
			<Stack sx={{ gap: '2rem', padding: '20px' }}></Stack>
		</ExpandableMenu>
	);
}
