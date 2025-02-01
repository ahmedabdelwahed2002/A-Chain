const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index, lastHash, timestamp, data, hash) {
        this.index = index;
        this.lastHash = lastHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
    }

    toString() {
        return `Block - 
            Index: ${this.index}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Timestamp: ${this.timestamp}
            Data: ${this.data}
            Hash: ${this.hash.substring(0, 10)}`;
    }

    static genesis() {
        return new this(0, '----', '0', 'genesis', 'genesis-hash');
    }
    
    static mineBlock(lastBlock, data) {
        const index = lastBlock.index + 1;
        const lastHash = lastBlock.hash;
        const timestamp = Date.now();
        const hash = Block.hash(index, lastHash, timestamp, data);
        return new this(index, lastHash, timestamp, data, hash);
    }

    static hash(index, lastHash, timestamp, data) {
        return SHA256(`${index}${lastHash}${timestamp}${data}`).toString();
    }
}

module.exports = Block;