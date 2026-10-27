When using Bend:
- run `bend guide` to learn it
- use `LAWS.bend` to keep important rules
- run `bend PROOF.bend` before committing
- parallelize the code whenever possible

Local lab:
- `node web/server.mjs` serves the game at http://localhost:4321
- it rebuilds `main.bend` and re-runs `bend PROOF.bend` on every `.bend` save
- `bend` lives at `~/.bend/bin/bend` if it isn't on PATH
