// console.log(varArrow()) -> TypeError: varArrow is not a function; typeof varArrow -> undefined
// console.log(constArrow()) -> ReferenceError: constArrow is not defined
// console.log(letArrow()) -> ReferenceError: letArrow is not defined
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
function functionFunction(){return 'functionFunction'}