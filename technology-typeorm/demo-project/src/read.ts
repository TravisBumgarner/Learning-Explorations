// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { Inventory } from "./entity/Inventory";

// const eventStream = [
//     { sku: 'foo123', qty: 10 },
//     { sku: 'foo123', qty: 20 },
//     { sku: 'bar456', qty: 40 },
//     { sku: 'foo123', qty: 50 },
//     { sku: 'foo123', qty: 10 },
//     { sku: 'foo123', qty: 10 },
//     { sku: 'bar456', qty: 10 },
//     { sku: 'foo123', qty: 10 },
// ]

// createConnection().then(async connection => {
    
//     // console.log("Inserting a new user into the database...");
//     // const user = new User();
//     // user.firstName = "Timber";
//     // user.lastName = "Saw";
//     // user.age = 25;
//     // await connection.manager.save(user);
//     // console.log("Saved a new user with id: " + user.id);

//     // console.log("Loading users from the database...");
//     // const users = await connection.manager.find(User);
//     // console.log("Loaded users: ", users);

//     // console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
