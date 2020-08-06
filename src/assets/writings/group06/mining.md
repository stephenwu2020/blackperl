# Mining

所有挖矿节点，使用专门的 proof-of-work 算法，Ethash，互相竞争，创建下一个 block。Ethash 算法的输入是 block 的 header，里面包含一个随机数，叫做 nonce。算法的输出，是一个32位的16进制的数。修改 nonce 会修改输出的值，并且是无法预测的。

为了使网络接受 block，Ethash 对 block header 的运算结果，必须少于整个网络设置的难度，difficulty，这是另外一个32位16进制的数，作为挖矿的目标要求。对于任何矿工，只要它广播的 block 满足目标要求的难度，会获得挖矿奖励，通过在 block 包含一个对 coinbase 的 transaction 发放。这个 coinbase 的 transaction，通常安排在 block 的第一个 transaction，奖励的目标是矿工账号。当前 block 的奖励，从 Byzanium hard fork之后，一直都是3个ether。

有的时候，两个矿工同时产生满足要求的 block，而最终只有1个能被主网接受。没有被接受的 block 被称为 uncle block Uncle block 会记录在 blockchain 之中，相应的矿工会获得相对少一点的奖励，但是， uncle block 的 transaction，不会修改 blockchain 的状态树。

Blockchain 的安全程度，与整个网络中的 hashpower 的数量成正比。越多的 hashpower，意味着单独的挖矿节点的 hashpower,在整个网络中的占比越少，使得网络被攻击，破坏，控制的难度更高。区块链中保留 uncle block，会增加自身的安全，因为创建 uncle block 的节点的 hashpower 没有被浪费掉。

网络的难度会定时调整，每过15 ～ 30秒，会有一个新的 block 诞生。
