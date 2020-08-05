# Ethereum中的程序

Ethereum 中的程序，由一个或者多个互相交互的 smart contract 组成。Smart contract 可以调用其他 smart contract 中的函数。单独的 contract，非常类似传统编程语言中的类。

Smart contract 可以用 Ethereum 汇编，Solidity，Low-Level Lisp，或是 Serpent 编写。所有的 contract 都会被编译成 EVM 的字节码。当中，Solidity 是最常用的。

将代码作为数据，以空地址 null 作为接收目标，这样的 transaction 用于 smart contract 的部署.

Ethereum 在设计阶段，它的创造者希望新的 smart contract 可以调用已经存在的 contract，实现绝大部分的功能。例如，如果 contract 需要对 string 进行操作，可以调用已经存在的 StringUtils 这个 contract，进行字符串的拼接，裁剪等等不是 Solidity 原生支持的操作。

悲剧的是，这种风格的开发，需要在主网进行开发和调试，得花真金白银。作为替代的方案，开发者把 StringUtils 的代码复制到自己的项目当中，在私人网络中调用，最终把这个复制一起部署到网络中。

Smart contract 自动暴露程序二进制接口，ABI，这个相当于 API 的字节码版本，二进制版本。ABI 包含所有的公共方法，不包含私有的，内部的函数，ABI 可以被外部账户调用，也可以被 contract 调用。
