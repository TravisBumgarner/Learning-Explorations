import React, { useState } from 'react';
import styled from 'styled-components';
import ColorCirclePicker from './ColorCirclePicker';
import LinearGradientPicker from './LinearGradientPicker';

import './App.css';

enum Components {
  ColorCirclePicker = 'ColorCirclePicker',
  LinearGradientPicker = 'LinearGradientPicker'
}

const DrawerMenu = styled.div<{ isOpen: boolean }>`
  width: 250px;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  top: 0;
  transition: left 0.3s ease;
  box-sizing: border-box;
  z-index: 999;
`;

const DrawerButton = styled.button`
  margin: 10px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
`;

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;

const ToggleDrawerButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

function App() {
  const [selectedComponent, setSelectedComponent] = useState<Components>(Components.ColorCirclePicker);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderComponent = () => {
    switch (selectedComponent) {
      case Components.ColorCirclePicker:
        return <ColorCirclePicker />;
      case Components.LinearGradientPicker:
        return <LinearGradientPicker />;
      default:
        return null;
    }
  };

  return (
    <>
      <ToggleDrawerButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        {isDrawerOpen ? 'Close Menu' : 'Open Menu'}
      </ToggleDrawerButton>
      <DrawerMenu isOpen={isDrawerOpen}>
        <DrawerButton onClick={() => setSelectedComponent(Components.ColorCirclePicker)}>
          Color Circle Picker
        </DrawerButton>
        <DrawerButton onClick={() => setSelectedComponent(Components.LinearGradientPicker)}>
          Linear Gradient Picker
        </DrawerButton>
      </DrawerMenu>
      <Wrapper>
        <AppContainer>
          {renderComponent()}
        </AppContainer>
      </Wrapper>
    </>
  );
}

export default App;