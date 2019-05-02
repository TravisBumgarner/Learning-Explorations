A set of inputs should always result in the same output.

A function grabs its variables moving from left to write. Given `let sum x y = x + y` and `sum 2 1 + 3`, F# will solve it like so `(sum 2 1) + 3` 
-> `3 + 3` -> `6`.

polymorphic function - a function that will behave differently depending on the input type

If you have a function with more than one input, you can provide them all at once or one at a time
```
let exponent power basee = float basee ** float power
let cubed = exponent 3
System.Console.WriteLine(cubed 5)
```

prefix functions `distance 5 2`

infix functions `1 + 2` Can use an infix as a prefix if you surround it with () -> `(+) 1 2`
Could apply the previous to make `let add1 = (+) 1`

Can create infix functions but their names have to be symbols. A distance function could be:
`let (|><|) x y = x - y |> abs`
`5 |><| 3` -> 2

lambdas - `fun x -> x * x`

recursion - must use rec
```
let rec length = function
  | [] -> 0
  | x::xs -> 1 + length xs
  ```
The function pattern matches on whats sent in and either it's an empty array or `x::xs` splits the head off the array and rest.

Piping - pass arguments into next function. Can then chain them together 
`|>` Pipe forward
`<|` Pipe backward
Can pipe multiple values with double and triple pipe `||>` `|||>`

function composition - given x which goes from a->b and y which goes from b->c we can compose them together such that we can a->c
Done with `>>` and `<<`