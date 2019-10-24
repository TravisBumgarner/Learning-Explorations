let inline zazz a b =
    a + b

[<EntryPoint>]
let foo argv =
    printfn "%s" (zazz "a" "b")
    printfn "%i" (zazz 1 2)
    0
    