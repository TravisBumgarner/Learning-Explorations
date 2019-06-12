import React from 'react';

enum Animal { Dog, Cat, Bird }

const App: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = React.useState<Animal>(Animal.Cat)
  return <div><button onClick={() => setSelectedAnimal(Animal.Dog)}>Woof.</button>{Animal[selectedAnimal]}</div>
}

export default App;
