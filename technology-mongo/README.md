`mongosh admin -u root -p rootpassword --port 27123` 
To run localhost of app and play around with Mongo ^ Need to change port. 

Build a field based on a previous one
```
db.scores.updateMany(
    {},
    [
        {"$set": {"fullName": { "$concat": ["$firstName", " ", "$lastName"]}}}
    ]
)
```