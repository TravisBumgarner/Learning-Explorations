let databaseRecord = {owner: 'travis', title: "Travis's content"}

const gqlResolver = (payload) => {
 const isOwner = payload.user === databaseRecord.owner
 if (!isOwner && payload.title) throw new Error('Only the owner can edit the title of content')
 databaseRecord.title = payload.title
}

gqlResolver({
 user: 'Joe',
 title: ""
})

console.log(databaseRecord)

