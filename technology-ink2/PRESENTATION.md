>  If you are already familiar with React, you already know Ink.
Ink Docs

> Since Ink is a React renderer, it means that all features of React are supported. 

npx create-ink-app
npx create-ink-app --typescript


# Demo 0

Basic Project structure
take a look at the output'd CLI

# Demo 1

# Demo 2

Inputs are a little weird, might be a better way

# Caveats

Be mindful of what you're typing in - don't forget about newlines, etc.
Styling is a bit weird coming from react

# Installing in the Terminal

Add the following to your package JSON

```
  "bin": {
    "weather-please": "./dist/cli.js"
  },
```

### Installing/Running Locally

`npm i -g`
`weather-please`

### Installing/Running with npmjs.com

`npm send-it`
`npm i -g travis-weather-app`
`weather-please`