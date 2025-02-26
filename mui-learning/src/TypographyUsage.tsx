import { Typography } from "@mui/material";
import Wrapper from "./Wrapper.tsx";

const TypographyUsage = () => {
	return (
		<Wrapper>
			<Typography variant="h1">H1 - Hello world</Typography>
			<Typography variant="h2">H2 - Hello world</Typography>
			<Typography variant="h3">H3 - Hello world</Typography>
			<Typography variant="h4">H4 - Hello world</Typography>
			<Typography variant="h5">H5 - Hello world</Typography>
			<Typography variant="h6">H6 - Hello world</Typography>
			<Typography variant="subtitle1">subtitle1 - Hello world</Typography>
			<Typography variant="subtitle2">subtitle2 - Hello world</Typography>
			<Typography variant="body1">body1 - Hello world</Typography>
			<Typography variant="body2">body2 - Hello world</Typography>
			<Typography variant="caption">caption - Hello world</Typography>
		</Wrapper>
	);
};

export default TypographyUsage;
