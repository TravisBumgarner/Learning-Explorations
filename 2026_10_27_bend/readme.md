# Bend, Laws and Proofs

The "Winning Is Impossible" game from https://bend-lang.com/#lab, run locally so you can change its laws and watch the proofs pass or fail.

- `main.bend` is the game: a 12×8 board with wrapping edges and a flag sealed in a walled room.
- `LAWS.bend` holds the rules the game must obey (you can't win, you never stand on the flag).
- `PROOF.bend` proves every law. `bend PROOF.bend` prints `ALL PROOFS CHECK` when they hold.
- `web/` is the local lab: the game in the browser plus a chat box wired to Claude Code.

## Setup

Install Bend (it lands in `~/.bend/bin/bend`):

```sh
curl -fsSL https://bend-lang.com/install.sh | sh
export PATH="$HOME/.bend/bin:$PATH"   # add to ~/.zshrc to keep it
```

Check the proofs:

```sh
bend PROOF.bend
```

## Running the lab

```sh
node web/server.mjs
```

Open http://localhost:4321 and play with W/A/S/D or the arrow keys. Every time a `.bend` file is saved, the server rebuilds `main.bend` to `web/game.mjs` and reruns `bend PROOF.bend`, and the page updates on its own.

Set `PORT` to use a different port, or `BEND` if bend lives somewhere other than `~/.bend/bin/bend`.

## Connecting to local Claude

The "Ask Claude" box sends your message to the [Claude Code](https://claude.com/claude-code) CLI already installed and logged in on your machine. It doesn't use an API key.

1. Install Claude Code and log in once by running `claude` in a terminal.
2. Start the lab with `node web/server.mjs` from this folder.
3. Type something like `use bend: add a law that the player never reaches the top row` and press Enter.

Under the hood the server runs `claude -p` in this folder with these limits:

- it can only read and edit files and run `bend` commands, and anything else is denied
- it follows `AGENTS.md`, so it keeps every law proved
- every message continues the same conversation until the server restarts

The page shows each step Claude takes, then its reply. Set `CLAUDE` if the `claude` command isn't on your PATH.
