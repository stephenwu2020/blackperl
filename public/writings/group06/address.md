# 地址

Ethereum 使用非对称钥匙加密的方法，对 transaction 进行安全保护，认证，与 Bitcoin 的一样。公钥-私钥键值对被创建，消息用私钥签名，只有相对应的公钥可以解密。用 Keccak256 算法，对公钥进行哈希，得到的结果的最后20位，作为账户的地址。 Keccak256 是 Ethereum 的标准哈希算法。

与地址绑定的 ether 账户余额，可以被任何能够证明是该账户私钥的拥有者使用。这个过程是这样的，所有 Ethereum 的 transaction 被发送者的私钥加密，如果一个用户提供的公钥能够解密出原文，那就证明了该用户就是私钥的拥有者，该 transaction 是他发出的。

Ethereum 有两种类型的账户：外部账户和 contract。外部账户由用户控制，而 contract，是 blockchain 上半自治的条目，通过函数调用来触发它的功能。所有的账户，都相对应着 balance 和 nonce。这里账户的 nonce 与 block header 的 nonce 是不同的概念，账户的 nonce 记录账户发送 transaction，每次一个 transaction 发出后， nonce的值自增，避免发送重复的 transaction。除了拥有这两个属性，contract 可以访问存储空间，存储代码指定的数据。
