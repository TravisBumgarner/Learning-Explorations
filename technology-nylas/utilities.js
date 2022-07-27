require('dotenv').config()
const Nylas = require('nylas');

Nylas.config({
    clientId: process.env.NYLAS_CLIENT_ID,
    clientSecret: process.env.NYLAS_CLIENT_SECRET,
});

const deleteAccount = (accountId) => {
    Nylas.accounts.delete(accountId)
}

const getAccounts = async () => {
    const accounts = await Nylas.accounts.list()
    const badAccounts = accounts
        .filter(({ syncState }) => syncState != 'running')
        .map(({ accountId, syncState }) => ({ accountId, syncState }))

    console.log(badAccounts)
}

export {
    getAccounts,
    deleteAccount
}
