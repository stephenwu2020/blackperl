# State Tree

Ethereum 最主要的数据库是它的 state tree，由 key/value 键值对组成，键值对的键是 Keccak256 哈希，值是一个32位的数。 Solidity 的数据结构，使用一个，或者多个 state tree 条目来组织程序，非常有利于程序的编写。简单的数据类型，32位，或者少于32位的，可以存储在一个 state tree 的条目中；复杂的数据类型，如数组，需要多个 state tree 的条目。

由于 Keccak256 哈希是256位的，Ethereum 的 state tree 设计上可以存储2^256个不同的条目。但是，2^80个条目之后，由于 hash 碰撞，整个存储空间的可用性会极速降低。然而，目前存储的值远远少于2^80，开发者仍然可认为存储空间是无限的。因占用存储空间的消费也是一个问题，存储操作的消费很昂贵，contract 的开发，应尽量避免频繁插入和更新 state tree 的存储。

State tree 的修改是在 transaction 的运行过程中发生的，绝大部分的 transaction 的执行，会修改 state tree 。

State tree 用 Merkle Patricia trie 的数据结果实现。用 Solidity 编写 smart contract，并不要求理解这个数据结构，但是有兴趣的话，可以在这里查看它的资料：https://github.com/ethereum/wiki/wiki/Patricia-Tree
