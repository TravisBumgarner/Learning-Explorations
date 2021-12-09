const switchAnimalSound = (animal) => {
  switch (animal) {
    case "dog":
      console.log("Bark.");
      break;
    case "cat":
      console.log("Meow.");
      break;
    default:
      console.log(`???`);
  }
};

switchAnimalSound('cat')
switchAnimalSound('dog')
switchAnimalSound('owl')

const isEven = (n) => {
    switch (n) {
      case "dog":
        console.log("Bark.");
        break;
      case "cat":
        console.log("Meow.");
        break;
      default:
        console.log(`???`);
    }
  };
  
  // I hate `break`. So, so, very much.

  switchAnimalSound('cat')
  switchAnimalSound('dog')
  switchAnimalSound('owl')
  