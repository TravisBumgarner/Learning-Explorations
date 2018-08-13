// console.log(varArrow()) -> TypeError: varArrow is not a function; typeof varArrow -> undefined
// console.log(constArrow()) -> ReferenceError: constArrow is not defined
// console.log(letArrow()) -> ReferenceError: letArrow is not defined
// TB: Lines 2 and 3 are examples of temporal dead zones (TDZ). Prior to let and const, JavaScript hoisted just
//     variable names and so line 1 results in undefined. let and const are not hoisted and therefore, if function
//     values with their names are called, the result is a ReferenceError.
var varArrow = () => {return 'varArrow'}
const constArrow = () => {return 'constArrow'}
let letArrow = () => {return 'letArrow'}

// console.log(varFunctionValue()) -> TypeError: varFunctionValue is not a function; typeof varFunctionValue -> undefined
// console.log(constFunctionValue()) -> ReferenceError: constFunctionValue is not defined
// console.log(letFunctionValue()) -> ReferenceError: letFunctionValue is not defined
var varFunctionValue = function(){return 'varFunctionValue'}
const constFunctionValue = function(){return 'constFunctionValue'}
let letFunctionValue = function(){return 'letFunctionValue'}

// console.log(functionFunction()) -> functionFunction
// TB: The above functions are all function values which are different than the function below. Since 
//     since functions are hoisted, this value is reurned. 
function functionFunction(){return 'functionFunction'}