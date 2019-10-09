// Learn more about F# at http://fsharp.org

namespace Foo
open System

module Bar =
    // let evalWith5ThenAdd2 fn = fn 5 + 2
    // let add1 x = x + 1
    // let testA   = float 2
    // let testB x = float 2
    // let testD x = x.ToString().Length
    // let testE (x:float) = x.ToString().Length
    // let testF x = printfn "%s" x
    // let testG x = printfn "%f" x
    // let testH   = 2 * 2 |> ignore
    // let testI x = 2 * 2 |> ignore
    // let buzz = (+) 1 2
    // let foo input bar = input.ToString() + bar.ToString()
    let sadasd = "12" |> int |> (+) 2
    printf "%i" sadasd
    // let result = evalWith5ThenAdd2  add1

module Main =
    [<EntryPoint>]
    let main argv =
        printfn "Hello World from F#!"
        0 // return an integer exit code


