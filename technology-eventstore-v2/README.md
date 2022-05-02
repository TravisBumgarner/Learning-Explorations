# Setup

1. `npm install`
2. `npm run migration:run`
2. `npm run sd`
3. Create event by visiting http://localhost:5001/write
4. Observe logs in terminal with data
5. Stop `sd` command.
6. Run `npm run sd` again.
7. Observe stream starts at offset. 
(Note I haven't looked into events with `undefined` data.)