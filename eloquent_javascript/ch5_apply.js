function noisy(f) {
    return function (arg) {
        var val = f.apply(null, arguments); // Calls f with arguments
        console.log("called with", arg, "- got", val)
    }
}

function foo(a, b, c){
    return a + b + c
}

var x = noisy(foo)
x(1, 2, 3)