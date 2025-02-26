import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Boxy = styled(Box)`
	background-color: ${({ theme }) => theme.palette.primary.dark};
	border: 2px solid ${({ theme }) => theme.status.danger};
	padding: 16px;
	margin: 32px;
	border-radius: 16px;
`;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return <Boxy>{children}</Boxy>;
};

export default Wrapper;
