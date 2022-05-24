import SHA256 from 'crypto-js/sha256'

class Block {
    index: number
    timestamp: string
    data: string
    previousHash: string
    hash: string

    constructor(index: number, timestamp: string, data: string, previousHash: string = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class Blockchain {
    chain: Block[]

    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2017', "Test String", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock: Block) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            const isHashValid = currentBlock.hash === currentBlock.calculateHash()
            const areBlocksLinked = currentBlock.previousHash === previousBlock.hash

            if (!(isHashValid && areBlocksLinked)) {
                return false
            }
        }
        return true
    }
}

const newCoin = new Blockchain()

newCoin.addBlock(new Block(1, '01/01/2017', 'foo'))
newCoin.addBlock(new Block(1, '01/01/2018', 'bar'))

// newCoin.chain[1].hash = 'foobar' // Makes Chain Invalid

console.log(JSON.stringify(newCoin, null, 4))
console.log('Valid', newCoin.isChainValid())