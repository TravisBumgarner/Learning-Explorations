import React from 'react';
import { render, Text } from 'ink';

type TypeScriptDemoProps = {
    language: string
}

const Demo = ({ language }: TypeScriptDemoProps) => <Text>Hello {language} World</Text>;

render(<Demo language="TypeScript" />);