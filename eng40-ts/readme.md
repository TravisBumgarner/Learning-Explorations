# Folder Structure

- `/bin` - scripts for running project on WebFaction
- `/design` - design docs for project
- `/dist` - static files and `index.html` for Webpack entry point
- `/src` - source code
- `index.html` - Express entry point
- `webpack.common.js` - Shared config between dev and prod
- `webpack.dev/prod.js` - Specific confgiurations for dev/prod

# Setup
- Install packages `npm i`
- Prod
    - `npm run build` then `node server.js`
- Dev
    - `npm start`

# Todo
- Figure out how to get a single index.html file or have webpack build from index.ejs