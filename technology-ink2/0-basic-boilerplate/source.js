import React from 'react';
import { render, Text } from 'ink';

const Demo = ({ language }) => <Text>Hello {language} World</Text>;

render(<Demo language="JavaScript" />);