var t = require('io-ts');
var fooWithTypeScript = function (bar) {
    return bar;
};
var fooWithRunTypes = function (bar) {
    return t.string.decode(bar);
};
console.log(fooWithRunTypes('foo'));
console.log(fooWithRunTypes(null));
