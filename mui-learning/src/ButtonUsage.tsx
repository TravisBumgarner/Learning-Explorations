import { Button, Stack } from "@mui/material";
import Wrapper from "./Wrapper.tsx";

function ButtonUsage() {
	// Colors come from https://mui.com/material-ui/customization/default-theme/ they're the main ones.
	return (
		<Wrapper>
			<Stack direction="row" spacing={2} display="block">
				<Button color="secondary" variant="text" size="large">
					Text
				</Button>
				<Button color="error" variant="contained" size="medium">
					Contained
				</Button>
				<Button variant="outlined" size="small">
					Outlined
				</Button>
			</Stack>
		</Wrapper>
	);
}

export default ButtonUsage;
