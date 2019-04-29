# Thoughts

-   Had a component where I didn't properly supply the required props and it red lined where I was using it.
-   Getting `.tsx` correct is going to take some time with muscle memory. There are some weird bugs, perhaps just with `webpack-dev-server` that cause you to have to kill the running process and restart to get things chugging along again.
-   Build will just fail if you get types wrong.
-   Can go super lax in the beginning with `noEmitOnError` to still build with ts errors.
-   Crazy amounts of red lining. Luckily all bugs that show up will do so at the top of the Chrome console. Could probably look into a way to supress the errors.

# Todo

-   Figure out how hard it is to setup Styled-Components
-   Ask: How hard is it to go fast and break stuff with TypeScript?

# Refactor Steps

1. Copy everything over from eng40 into working skeleton swith Todo list.
2. Removed all Webpack.resolve stuff
3. Removed Sentry Error Handling, because unknown errors
4. Change imports to:

````
import * as React from 'react'
import * as ReactDOM from 'react-dom'```
````

5. Done...?!?
