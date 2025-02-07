import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

interface ExpandableMenuProps {
	summary: string;
	defaultExpanded?: boolean;
}

function ExpandableMenu({
	children,
	summary,
	defaultExpanded = false
}: PropsWithChildren<ExpandableMenuProps>) {
	return (
		<Accordion disableGutters defaultExpanded={defaultExpanded}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<Typography fontWeight={'bold'}>{summary}</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	);
}

export default ExpandableMenu;
