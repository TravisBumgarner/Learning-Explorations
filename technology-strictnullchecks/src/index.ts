import { Collection } from 'mongodb'

export class FooBar {
    private collection: Collection<{ foo: string }>

    async fetchCollection(id: string) {
        return await this.collection.findOne({ id })
    }
}

const main = async () => {
    const fooBar = new FooBar()
    const result = await fooBar.fetchCollection('abc123')
    console.log(result.foo) // Member is possibly nullish and should be checked. Consider accessing the member using the optional chaining operator (?.)eslintstrict-null-checks/all

}