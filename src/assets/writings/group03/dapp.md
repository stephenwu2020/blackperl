Ethereum发展早起，创立者的愿景比Smart Contract的定义要宽广的多，甚至要重新创造互联网的世界，直接称之为Web3。而Smart Contract是实现控制逻辑与支付功能分散化一种方式。Web3 DApp的目标是分散化一切应用，包括存储，信息传递，命名等等。如图：

![img](/book/dapp.jpg)

# 什么是DApp?

# DApp

DApp是去中心化的应用程序，一个应用程序，这些方面皆可去中心化：

- 后端软件，应用逻辑
- 前段软件
- 数据存储
- 消息交互
- 命名解释

每一方面都可以使用中心化设计，或是去中心化设计。例如，前端软件可以设计成运行在中心化服务器的web应用，也可以设计成运行在各自的手机里；后端软件和数据存储可以放在私人的服务器和数据库上，也可以设计成Smart Contract运行在P2P的网络。DApp有一些优势，是中心化的架构无法拥有的：

### 弹性

由于业务逻辑写在了Smart Contract，DApp后端程序在Blockchain平台分布式部署和管理。与部署在中心服务器的程序不同，DApp永远不会下线，只要Blockchain运行，它就运行。

### 透明

>DApp在链上的自然属性，使得任何人都可以审查它的代码，功能。与DApp发生的任何交互都会永远记录在Blockchain上。

### 不受干扰

>用户只要使用Ethereum的节点，就可以使用DApp，不受任何权威机构的干扰。DApp一旦部署到网络中，服务的提供商，甚至Smart Contract的拥有者，都无法修改代码。

Ethereum生态系统直至今日，只有非常少的完全去中心化的应用，绝大部分应用部分依赖与中心服务器提供功能支持，我们希望未来的DApp能够完全去中心化。

# 后端(Smart Contract)

在DApp里，Smart Contract存储业务逻辑(程序代码)，运行状态。你可以将Smart Contract看作传统应用的服务端程序，它们主要的区别是，Smart Contract的运行非常昂贵，应尽可能少访问。因此Smart Contract适合于开发高信任度的，在分散化平台运行的应用。

Ethereum提供了这样子的一个网络，Smart Contract之间互相调用，互相传递信息，修改状态，逻辑的复杂度仅仅受到gas消耗的限制。在部署Smart Contract之后，它的逻辑能够被其它DApp使用。有一点值得我们细虑，Smart Contract一旦部署，无法被修改，如果Contract实现了selfdestruct函数功能，它可以被销毁。除了被销毁，没有任何办法改变代码。另外值得细虑的是DApp的大小，整体庞大的DApp在部署和使用上会话费昂贵的gas，因此有些应用将计算量大的操作放到Blockchain之外。如果DApp的核心逻辑不在Blockchain上，使用它意味着你对服务提供商的信任。

# 前端(Web用户接口)

DApp后端商业逻辑要求程序员理解EVM，Smart Contract编程语言如solidy，而前端的开发可以使用标准的web技术，HTML，CSS，JavaScript，等等。传统的前端开发者可以使用他熟识的程序库，程序框架。与Ethereum的交互操作，如消息签名，发送交易，管理钥匙，一般由web浏览器整合，提供扩展工具，如MetaMask。当然，前端程序也可以是手机软件，但目前很少开发资源用于手机应用，没有支持手机的，管理钥匙，签名，交易发送的的轻量级服务。与Ethereum交互的应用库主要是web3.js。

# 数据存储

由于gas价格贵，限量低，Smart Contract不适合存储和处理大Block，因此绝大部分应用将数据存储在Blockchain之外。存储服务可以中心化的(云存储)，也可以是分散化的，如存储在P2P网络的IPFS，Ethereum自身的Swarm。分散化的P2P存储平台适合存储大的静态资源，如图片，视频，前端程序的资源文件等等。

### IPFS
Inter Planetary File System，简称IPFS，星际文件系统，是去中心化的，内容可寻址的，分布式存储于P2P网络的存储系统。内容可选址的意思是，文件的每一块都被哈希，哈希值用于该一Block的唯一标识。之后可以IPFS的节点上使用该哈希来获取数据。IPFS的目标是替代HTTP，用分布式的方式传递web应用，文件。

### Swarm
Swarm也是内容可寻址分布式存储系统，与IPFS相似，由Ethereum Fundation创建，作为geth的一整套工具。与IPFS相似，Swarm将数据存储在swarm node里，通过哈希值访问，数据存储在P2P网络中。

# 分布式消息交流协议

应用程序的另外一个重要组件是内部进程交流协议，它是指消息在应用程序之间，应用程序的实例之间以及应用程序的用户之间的传递。传统的消息由中心服务器接收转发，当然也有许多去中心化的服务在P2P网络转发消息，值得一提的是用于DApp的Whisper，是geth的一组应用工具。

# Ethereum命名服务(ENS)
假设你设计了世界上最好的Smart Contract，但是没有提供良好的用户接口，人们就不会使用它。传统互联网，DNS服务为每个域名连接人们能看懂的名字，因此可以在浏览器输入名字访问到相对应的服务。在Ethereum Blockchain里，ENS的作用与DNS是一样的，不同的是它用去中心化的方式实现。举个例子，Ethereum Fundation的捐款地址是0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359，支持ENS的钱包，可以用ethereum.eth来表示它。

ENS不仅仅是Smart Contract，同时是一个基础DApp，它提供名字解释服务，支持其它DApp进行地址命名的注册，管理和拍卖。ENS本身是基础DApp，为其它DApp提供服务，嵌入其它DApp一起工作。
