// Learn more about F# at http://fsharp.org

namespace Foo
open System
module Main =
    [<EntryPoint>]
    let main argv =
        printfn "Hello World from F#!"
        FooBar.hello "dependency A"
        0 // return an integer exit code
