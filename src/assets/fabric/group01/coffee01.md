# 从0开始搭建Fabric网络:准备
## 从咖啡馆说起
小明经营一家咖啡馆已有2年时间了。他的咖啡味道独特，花样丰富，深受客户喜爱。随着业务的发展，小明正着手配套相应的软件应用，提高运营效率。经过3天3夜的艰苦探索，决定使用当前最火的技术--区块链，打造自个的咖啡帝国。
## 技术选材
小明打开Google的页面，输入“区块链”，排在首位的是比特币。然而比特币为电子支付而生，不适合他的咖啡馆，于是打开了Ethereum的官网。 多年的商海浮沉磨练了小明的大脑，一个绝妙的Smart Contract已跃然涌现脑海。小明正打算部署Etherem，忽然又打住了。他在想，未来咖啡馆做大了，如何隐藏商业机密不被泄漏，如何分配分店的权限呢？最后，经过深思熟虑，小明认为Hyperledger Fabric的技术，是最适合咖啡馆的，一切就这么定了。
## 环境搭建
跟着[Fabric的指导网站](https://hyperledger-fabric.readthedocs.io/en/master/prereqs.html)走，小明安装了git,curl,docker, docker compose等等软件，创建了[Github Reposity](https://github.com/stephenwu2020/hfcoffeeshop).
## Fabric镜像、工具软件部署
小明为咖啡馆网络创建了Github Reposity，仓库名字就叫[hfcoffeeshop](https://github.com/stephenwu2020/hfcoffeeshop)。为了方便拉取Fabric镜像，以及配置网络需要用到的软件，小明配置了简单的Makefile，在项目的根目录下执行：
```
make
```
将会调用`bootstrap.sh`，拉取镜像、下载bin软件，之后，项目根目录会产生两个文件夹: bin和config。执行：
```
docker images
```
确认fabric的镜像已经拉取：
```
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
hyperledger/fabric-tools     2.2                 5eb2356665e7        4 weeks ago         519MB
hyperledger/fabric-tools     2.2.0               5eb2356665e7        4 weeks ago         519MB
hyperledger/fabric-tools     latest              5eb2356665e7        4 weeks ago         519MB
hyperledger/fabric-peer      2.2                 760f304a3282        4 weeks ago         54.9MB
hyperledger/fabric-peer      2.2.0               760f304a3282        4 weeks ago         54.9MB
hyperledger/fabric-peer      latest              760f304a3282        4 weeks ago         54.9MB
hyperledger/fabric-orderer   2.2                 5fb8e97da88d        4 weeks ago         38.4MB
hyperledger/fabric-orderer   2.2.0               5fb8e97da88d        4 weeks ago         38.4MB
hyperledger/fabric-orderer   latest              5fb8e97da88d        4 weeks ago         38.4MB
hyperledger/fabric-ccenv     2.2                 aac435a5d3f1        4 weeks ago         586MB
hyperledger/fabric-ccenv     2.2.0               aac435a5d3f1        4 weeks ago         586MB
hyperledger/fabric-ccenv     latest              aac435a5d3f1        4 weeks ago         586MB
hyperledger/fabric-baseos    2.2                 aa2bdf8013af        4 weeks ago         6.85MB
hyperledger/fabric-baseos    2.2.0               aa2bdf8013af        4 weeks ago         6.85MB
hyperledger/fabric-baseos    latest              aa2bdf8013af        4 weeks ago         6.85MB
hyperledger/fabric-nodeenv   2.2                 ab88fe4d29dd        5 weeks ago         293MB
hyperledger/fabric-nodeenv   2.2.0               ab88fe4d29dd        5 weeks ago         293MB
hyperledger/fabric-nodeenv   latest              ab88fe4d29dd        5 weeks ago         293MB
hyperledger/fabric-javaenv   2.2                 56c30f316b23        5 weeks ago         504MB
hyperledger/fabric-javaenv   2.2.0               56c30f316b23        5 weeks ago         504MB
hyperledger/fabric-javaenv   latest              56c30f316b23        5 weeks ago         504MB
hyperledger/fabric-ca        1.4                 743a758fae29        2 months ago        154MB
hyperledger/fabric-ca        1.4.7               743a758fae29        2 months ago        154MB
hyperledger/fabric-ca        latest              743a758fae29        2 months ago        154MB
```
注：
- 大陆地区执行`bootstrap.sh`及docker镜像的拉取，可能会遇到网络问题。
- 源码地址: [hfcoffeeshop](https://github.com/stephenwu2020/hfcoffeeshop)