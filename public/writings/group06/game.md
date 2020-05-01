# 赌博

当今，赌博的开发者很难处理好支付系统，特别是 web 上的赌博。各个支付系统，如 Stripe，Paypal，执行转账，取款的功能，往往需要几天的时间。Ethereum 使得赌博的支付系统开发变得很轻松。

使用开源的 smart contract 开发的赌博系统更加透明，公开，稳定。以往，玩家把钱交给网站托管，这样会面临一个风险，网站拥有者可能把钱卷走，人间蒸发。2011年，FBI关闭了许多扑克网站，许多人存在网站的钱也跟着没了。 Ethereum 上的 smart contract 永远不会被关闭或者审查，除非整个网络都没了。只要 contract 能够让用户把钱取走，用户就敢把钱存进去。优秀的赌博 contract 降低甚至消灭了交易对手风险。

赌博网站往往有暗箱操作，赌博 contract 公开透明，对于不信任的 contract，人们不会参与的。

Ethereum 上的赌博，也有缺点。新的 block 的诞生时间是15 - 30秒，意味着每次更新至少得15-30秒。在这个期间，transaction 对网络上所有的节点都是公开的，一般 transaction 在 block 的排序，是以 gas price 的大小排序的，如果有的节点发现某个 transaction 将会赢得奖励，它可能会复制 transaction 的数据，然后以更加高的 gas price 使得 transaction 的排名靠前，从而获得奖励。
