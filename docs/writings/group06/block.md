# Block

Blockchain 由一系列有序的 block 组成。一个 block 由包含着元数据的 header 和一系列 transaction 组成。Block 由矿工挖矿生成，并且广播到网络的其它节点。节点根据一系列的共识规则对接收的 block 进行验证。不满足共识规则的 block 会被网络拒绝。

当网络中出现了相互矛盾的共识规则，就会出现一个 fork，通常发生在官方客户端更新的时候。在 Ethereum 里，就是指 geth 客户端更新的时候。

如果新的规则诞生了，且是旧的规则的子集，导致的 fork 是 soft fork. 此时，使用最新共识规则的客户端创建的 block，仍然会被运行旧共识规则的客户端接受。这种情况下，只有矿工是必须要更新客户端的。

如果新的共识规则与旧的不能兼容，导致的 fork 是 hard fork. 这种情况下，所有的客户单都必须更新。Hard fork 往往会引起大争议。如果有一部分客户端拒绝更新客户端，会导致区块链分裂，在一条链合法的 block，在另一条链就是非法的。 Ethereum 历史上发生了6次 hard fork，其中一次导致了区块链分裂，Ethereum Classic (ETC) 的诞生。
