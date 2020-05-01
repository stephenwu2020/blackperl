# Smart Contract安全

编写Smart Contract，安全性是最重要的考虑因素之一。Smart Contract编程领域，几乎所有的错误会付出惨痛的代价。

像其它程序一样，Smart Contract根据编码直接运行，有些情况并非程序员初衷。所有的Smart Contract都是公开的，所有人都可以通过交易信息操作它。所有漏洞都会暴露，许多是无法挽回的。使用最好的实践，遵循经过良好测试的设计模式至关重要。

# 最安全的实践
防御式编程最适合编写Smart Contract。它强调的以下这些最好的实践过程：

### 最简性
> 复杂度是安全性的敌人。代码越简单，逻辑越单一，出bug的概率越低。初次接触Smart Contract编程，程序员倾向于写很多很多的代码。相反，应该尽量让它做的逻辑变少，代码的数量变少，分离功能，降低复杂度。如果有人告诉你，它的Smart Contract有好几千行代码，你需要为它的安全性担忧了。越简单，越安全。

### 代码重用
> 不要重复造轮子。如果已经有一个库，或者Smart Contract，满足你的需求，放心地使用它。在自己的代码中，遵循DRY原则：Don't Repeat Yourself，不要重复！每次看到相同的代码出现在不同的地方，想办法封装到库里，封装成函数调用。频繁使用的代码，安全性比新写的代码要高。

### 代码质量
> Smart Contract代码是无情的。每个bug都可能导致资金损失。Smart Contract编程与一般的编程不能同等对待，创建DApp并不像用js编写一个组件。相反，它更像是盖一间房子，建一座桥，需要遵循严格的工程学和软件开发原则。一旦代码开始上线服务，几乎没有什么机会去修复bug。

### 可读性
> 你的代码需要容易被阅读和理解。越是容易阅读，越是容易审查。Smart Contract是公开的，任何人都可以获取源码，进行反编译。因此，把项目公开，使用开源的协作方式去开发程序，运用集体的智慧来解决问题，同时留下开发文档。

### 测试覆盖
> 测试所有能测试的。Smart Contract运行在开放的环境之中，任何人可以输入任意数据，永远不要假设函数应该输入什么数据，应该输出什么结果，尝试你认为无法理解的操作。

# 不好的设计模式与安全漏洞

Smart Contract程序员，要熟识最常见的安全漏洞，使用避免导致安全漏洞的编程模式。

### 重入
> Smart Contract可以调用外部的Smart Contract，可以发送ether给其它账户，这些操作可能被黑客劫持，强迫调用者执行设计好的回调函数，这种攻击方式常用于DAO攻击。

> 这种攻击有可能发生在转账给陌生用户的情景。攻击者在回调函数中设置恶意代码，当其它Contract的转资金到攻击者账户时，回调函数触发，恶意代码运行，恶意代码可能调用原先Contract的某些函数，把资金转走，修改原先的逻辑.
![img](/book/reentrancy.jpg)

> 上图第17行是转账到外部账户的调用，如果外部账户是一个Smart Contract，会触发它的默认函数，默认函数可以再发起withdrawFunds函数调用，把资金源源不断第转走。

> 有很多中方法可以避免潜在的重入漏洞。第一个方法，调用内置的transfer函数转账，调用这个函数的gasLimit是2300，不足以运行对方的回调函数的恶意代码。第二种方发是先修改账户余额，再做转钱的操作。第三种方法是加一个状态锁，每次调用，相关的状态只能改变一次。

### 数字溢出
> 整型在Ethereum虚拟机中是固定字节的，每个整型表示的数都有一个范围，举例，uint8存储的数字的范围是[0, 255]，把256赋值给uint8变量，结果是0.目前最有效的避免溢出的方法，是使用公共数据库的API取代内置的数学运算。例如OpenZepplin的SafeMath库。

### 超出预期的ether
> 一般来说，资金转移到Contract上，会触发Contract的回调函数。但有两个例外，Contract接受了资金却不触发回调函数，不执行任何代码。依赖回调函数来检测接收资金，进行相关逻辑，可能会被黑客找到漏洞，进行攻击。

> 为了保证状态转换正确，确保操作合法，防御式编程有一招叫恒量检查。这种技术设置一些不变的属性，参数，然后进行某些操作，回头检查属性参数是否发生了变化。这是一种很好的设计方法。但是Smart Contract编程中，有一些变量表面上是恒定的，实际上却可以被外部修改，这个变量是Contract存储ether的值。Smart Contract编程的初学者往往认为，必须通过payable函数给Contract转入资金，以此设计的逻辑是有漏洞的。有两种方式，ether被转入Contract而不经过Contract的payable函数.

> 第一，析构函数，selfdestruct，销毁自身，删除所有代码，同时资金转入参数定义的地址，如果该地址对应一个Contract，Contract上的回调函数不会触发。黑客可以设计一个攻击方案，在selfdestruct函数中销毁自身，强迫资金转入到攻击对象Contract之中。

> 第二，提前向某个地址转钱，如果有新的Contract正好在这个地址部署，新的Contract就是这笔钱的拥有者。Contract的地址是可以提前计算出来的，address=sha3(rlp.encode([account_address, transaction_nonce])).黑客如果知道某个Contract的细节，提前计算出Contract的地址，则可以让Contract诞生之际即获得一笔资金。
![img](/book/unexpected.jpg)

> 上面代码，大意是到达里程碑的玩家会获得一个奖励。如果黑客通过前面说的两种方式，提前给这个Contract转入一笔钱，this.balance字段的值是不可预测的，那么这个Contract的功能就不能正确实现了。例如，通过selfdestruct函数，给Contract强制转入0.1ether，则if的判断不会出现刚到到达里程碑的值。要解决这个问题，代码不能使用self.balance来做判断，可以在Contract内部创建另一个属性，此时这个属性只能在代码中修改，即可防止这种攻击。

### 委托调用
> 调用与委托调用的操作方便开发者模块化代码，Ethereum用CALL操作处理标准外部消息，代码运行在调用者Contract的上下文中，委托调用的运行差不多，唯一的区别是，它在被调用的Contract的上下文运行。委托调用的这个特点使得程序库的设计得以实现，程序员可以将常用的代码部署到Ethereum中让其它Contract重用。

> 由于委托调用保留上下文的特点，要开发没有漏洞的公共库不是那么简单。库代码在自身中运行或许是安全的，没有漏洞的，但在其它Contract的上下文中运行，可能会出现意想不到的bug。
![img](/book/delegate.jpg)

> 上面的Contract，自身运行时，自身上下文的内存槽第一块分配start，第二块分配calculateFibNumber；但在作为委托调用时，由于上下文切换到了其它Contract，start指向的第一内存不是它认为的start字段的值，从而会出现意外的结果。为了避免这种库，Solidity提供了library关键字，libraray关键字的Contract自身无状态，没有析构函数。

### 默认的访问等级
> Solidity的函数有访问修饰器，表明它们在什么情况下可以被调用。访问修饰器决定了函数能够被外部用户调用，派生的Contract调用，仅仅内部函数调用或者仅仅外部调用。有4个修饰器，默认是public，允许所有人调用。
![img](/book/visibilities.jpg)

> Contract原意是判断地址的最后8位如果为0，则可以获取资金，但是_sendWinnings的访问属性是public，黑客可以直接调用它把资金转走。为了防止这种疏忽，编写代码给所有函数都加上访问修饰器，即使它是public。

### 随机数
> Ethereum Blockchain所有的交易信息导致的状态切换结果是确定的，可以预先计算的，没有任何不确定性。这说明了Ethereum上一些随机数都不是真随机。Ethereum最早的一批Contract是赌博，而赌博都需要一定的不确定性。人们希望使用未来的变量产生随机数，比如，下一个挂到Blockchain的Block的序号的最后一位是基数，则可以获得一笔大奖。那么，下一个验证成功的Block，如果不是基数，人们会选择把它废弃。使用过往的或者现在的变量，更加糟糕。因此，所有的随机数只能从Ethereum外部产生，不能使用Ethereum的状态信息，Block的参数信息。

### 引用外部Contract
> Ethereum开发中，通过调用外部的Contract实现代码重用。导致的结果是大量的外部Contract引用，大量的外部消息调用，黑客可能从中找到攻击的目标。
![img](/book/ref.png)

> 在1路线的引用是安全路线，在2路线上，函数及其功能是一样的，但是你需要加密的数据已经被打印出来了。黑客可以通过放这样的钓鱼地址到工具上，从而获取了用户的数据。

> 为了解决这个问题，其一，我们使用new关键字创建引用的对象，避免钓鱼地址；其二，发布外部Contract,库Contract，把地址公开让大家验证。
![img](/book/ref2.jpg)

### 短地址参数攻击
> 传递给Smart Contract的参数根据ABI的定义序列化。如果ABI规定对应的参数长度为20个字节，而你实际传递的参数只有19个字节，这也是可以的，EVM默认补0.
![img](/book/addr.png)

> 第一段序列化，调用函数向某个地址转100ether；第二段序列化参数，假设输入地址的时候少了1个字节，整个序列化数据在最后补2个0，结果是给别的地址转了25600个ether。因此，对函数的参数做检查非常有必要。

### 未经检查的返回值
> Solidity进行外部调用的方式有很多，转账到外部账号常用的方法是transfer，有时候需要用到send或者call。Send和call返回布尔值，表示调用成功与否。如果调用失败，会产生一个警告，但是资金不会回退。
![img](/book/return.jpg)

> 这个Contract，大概是让winner拿奖金，剩下一些零钱，谁都可以转走。但是代码没有对send的结果做检测，如果send返回的结果是false，资金并没有转到winner的账户，而payOut会继续执行，其他人就可以把winnner的资金一并带走了.一般来说，最好使用transfer，它可以回退资金，如果要使用send，一定要检查返回的结果是否成功。

### 竞争条件与抢先运行
> Ethereum Blockchain允许Contract调用外部的Contract，且存在同时多个Contract对同一个Contract的调用，有可能出现竞争条件，导致状态的变化超出预期的结果。Ethereum节点将交易信息存放到内存池，组装成Block，在矿工解决了共识验证之后才是合法的，此矿工选择有权选择哪些交易信息放到这个Block中，一般来说优先选择gasPrice高的。假设一个黑客监视内存池里面的交易，它发现其中一个交易解决了一个问题，于是把这个交易的数据抓取，自己发送同样数据的一个交易，把gasPrice设置得更高，那么黑客的交易信息会先于原本解决问题得那个交易进入块数据之中。
![img](/book/race.jpg)

> 上面Contract大意是，尝试找一个数，经过哈希函数计算，得出的结果等于设定的结果，那么给他转1000eth。现在，有一个用户找出了这个数，发送交易信息调用solve函数验证，黑客接收了这个交易，提前验证通过，于是马上把这个数抓取，发送一个交易，使用更高的gasPrice。然后有一个矿工接受了这两个交易，于是把黑客的交易放在前面，那么钱就转到黑客账户了。

> 实际上发起这种攻击的可以是普通用户，可以矿工。对于普通用户发起的攻击，可以设置一个gasPrice的最大值，找到解决方案的都使用最大值的gasPrice，黑客不能改变它的顺序，如果是矿工发起的攻击，矿工可以无视gasPrice，任意决定交易顺序，这种方式行不通了。另一种方式，不直接发送问题的答案，而是将答案加密后发送出去，等这个消息写入了Blokchain之后，再把解密的钥匙发送出去，让Contract去解密验证。这样黑客就无法验证答案，即使copy了我们的数据，也没有正确的钥匙提供验证。

### DoS拒绝服务攻击
> 令一个Contract停止服务的方式有很多！
![img](/book/dos1.jpg)
> 上述例子，黑客可以创建很多账户，使得distribute的循环消耗超出gasLimit而停止服务。
![img](/book/dos2.jpg)
> 上述例子，如果Contract的持有者没有初始化，那么整个系统都无法运行了。

### Blockchain时间戳修改
> 块数据的时间戳在很多应用中被使用，例如产生随机数，资金冻结一定时间，根据时间的状态修改等等。矿工可以调整机器的时间戳，可能会对Contract产生意外的结果。
![img](/book/timestamp.jpg)
> 上述Contract，每次接受一个交易，判断它的时间戳是否是15的整数倍，如果是，则可以奖励一笔资金。此时矿工可以略微调整Block的时间戳使得刚好是15的倍数。因此block.timestamp或者now不是一个好的选择。但是时间相关的应用很多，可以使用block.number * 平均时间来衡量总体的时间。

### 构造函数
> 构造函数是一个特殊的函数，通常在初始化Contract的时候执行一些关键的特殊的任务。Solidity版本v0.4.22，构造函数的名称与Contract的名称一致。日常开发中，如果Contract的名称改了，原本的构造函数就变成了一个普通函数。
![img](/book/constructor.jpg)
> 上述示例，ownerWallet以小写开头，Contract大写开头，这不是构造函数，而是普通函数，任何人都可以调用这个代码，把自己设为owner，取钱走人。在版本v0.4.22之后，构造函数名字统一为constructor，避免了这个问。

### Storage指针未初始化
> EVM存储数据有两种方式：storage和memory。了解内部机制对于每个开发者来说都是很有必要的，错误的使用方式会留下漏洞，被黑客攻击。函数内部变量存储在storage或是memory是由它的类型决定的。未初始化的storage变量可能指向了Contract的其它storage变量的值。
![img](/book/storage.jpg)
> 上述例子中，unlocked字段存储在slot[0]，registerNameRecord存储在slot[1]，在register函数里，newRecord定义了，但未赋值，后面的_name,_mappedAddress会写入slot[0]，slot[1]，实际上修改了unlocked和registerNameRecord的值。

### Tx.Origin认证
> Solidity有一个全局变量，tx.origin，它通过回溯所有的调用堆栈，找出发起这次调用的地址。用这个变量去做认证可能会被钓鱼。
![img](/book/origin1.jpg)
![img](/book/origin2.jpg)
> 上述例子中，Phishable取款的函数用tx.origin判断是否是owner。假设Phishable和AttackContract进行交易，Phishable向AttackContract转一笔钱，AttackContract回调触发Phishable的取款操作，由于这个操作最原始的发起者是Phishable，因此tx.origin == owner成立，钱却转到了AttackContract的账户了。










