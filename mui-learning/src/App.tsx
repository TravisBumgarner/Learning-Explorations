import { ThemeProvider } from "@mui/material/styles";
import ButtonUsage from "./ButtonUsage.tsx";
import theme from "./theme.ts";
import TypographyUsage from "./TypographyUsage.tsx";
const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<ButtonUsage />
			<TypographyUsage />
		</ThemeProvider>
	);
};

export default App;
