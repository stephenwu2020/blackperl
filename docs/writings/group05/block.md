# Blockchain结构

Blockchain，从技术的角度来看，是一棵巨大的Merkle Tree。每一个Block包含了许多Transaction (Tx)，所有的Tx形成一个小的Mercle Tree，同时每一个Block都包含前一个Block的Merkle Root。整体上，就是不同的小Mercle Tree拼接在一起，形成巨大的Mercle Tree。如图：

![img](/book/block-merkle-tree.png)

如果Block里面的某个Tx被修改了，那么Tx的Hash会改变，同时Merkle Root也会改变；如果Block里面Tx的排列顺序修改了，Merkle Root也会改变。因此，凭借Merkle Tree的信息，能够证明某个Tx是否在Block里面，是以什么样的顺序排列的。而且这个证明所需要的信息量不大，仅仅需要所有Tx的Hash，而不是Tx的所有信息。

# Bitcoin与Ethereum的区别
在Bitcoin里，对交易信息Hash，形成Merkle Tree。比如，A给B转了10个比特币，这个交易Hash后得到T1，它与T2, T3, T4...形成Merkle Tree。而在Ethereum里，首先，数据具有普遍性，可以代表任意的东西；其次，Tx通常是让某个程序执行某段代码，从而改变了数据的状态，这些状态形成了Merkle Tree。例如，苹果是红色的，然后在下一个Tx里，执行了一段代码，使得苹果的状态变成绿色。简单对它们进行区分，如图：

![img](/book/bitcoin-ethereum-diff.png)

# Bitcoin Block的数据结构
Bitcoin Block的大致结构如下：

![img](/book/block-inner.png)

Magic No 是Bitcoin Blockchain的网络ID，Block Size记录该Block的大小，Block Header有很多重要的东西：

![img](/book/block-header.png)

Header包含了上一个Block的Merkle Root和当前Block所有Tx形成的Merkle Root。Bits决定了挖矿的难度，用于控制新的Block诞生所需要的时间。Nonce是一个自增值，它在挖矿过程中使用。
