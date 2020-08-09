# 从0开始搭建Fabric网络:链码
Fabric的商业逻辑通过chaincode，即链码来实现。链码的作用，简单来说，就是操作Fabric的数据库，修改变量的值，同时给Fabric之外的应用程序提供操作接口。

## 现在开始为我们的咖啡馆网络部署链码

第一，创建目录06-smart-contract-chaincode，并且进入该目录
```
mkdir 06-smart-contract-chaincode
cd 06-smart-contract-chaincode
```

第二，此前网络已经成型，配置文件无需修改

第三，链码的操作相对来说比较复杂，因此修改了shell脚本的逻辑，新增的`builder.sh`大致思路如下：
1. 操作分割为三个模块：网络操作，channel操作，chaincode操作，对应./scripts下的三个文件
2. 网络相关操作：./builder.sh network
3. channel相关操作：./builder.sh channel
4. chaincode相关操作：./builder.sh chaincode
   
由于网络操作，channel操作已经在前面介绍，这里快速启动网络，创建channel，加入channel：
```
./builder.sh network custom
./builder.sh channel custom
```

第四，下面集中讲解chaincode的操作:
1.  我们将要部署的链码位于根目录下的./chaincode/abstore/go
2.  执行打包指令，会在./pkg目录下生成mycc.tar.gz包：
    ```
    ./builder.sh chaincode package
    ```
3. 执行安装指令：
    ```
    ./builder.sh chaincode install
    ```
4. 执行approve指令，可以理解为，这个代码我审核了，我支持它运行：
    ```
    ./builder.sh chaincode approve
    ```
5. 执行commit指令
    ```
    ./builder.sh chaincode commit
    ```
6. 执行invoke指令，进行实例化：
    ```
    ./builder.sh chaincode invoke
    ```
7. 执行query指令，查询：
    ```
    ./builder.sh chaincode query
    ```
熟悉上述操作之后，将他们合并成custom指令，免得一句一句从新打

## 查看容器的状态
```
CONTAINER ID        IMAGE                                                                                                                                                                       COMMAND                  CREATED             STATUS              PORTS                    NAMES
ef2e285c572a        dev-peer0.ming.coffeeshop.com-abstore_1-bf43a0391f5bac984beb7e55751e7f33432c517800406c12b6a2fd789480fe95-79103ebc9b8d25cd59dfd065e96be85d38c4f6332047cc67349cabdcd3fc0c23   "chaincode -peer.add…"   7 minutes ago       Up 7 minutes                                 dev-peer0.ming.coffeeshop.com-abstore_1-bf43a0391f5bac984beb7e55751e7f33432c517800406c12b6a2fd789480fe95
41ec607e9883        hyperledger/fabric-tools:2.2.0                                                                                                                                              "/bin/bash"              15 minutes ago      Up 15 minutes                                cli
49d5ecbf55bd        hyperledger/fabric-orderer:2.2.0                                                                                                                                            "orderer"                15 minutes ago      Up 15 minutes       0.0.0.0:7050->7050/tcp   orderer.coffeeshop.com
70ff2d210d98        hyperledger/fabric-peer:2.2.0                                                                                                                                               "peer node start"        15 minutes ago      Up 15 minutes       0.0.0.0:7051->7051/tcp   peer0.ming.coffeeshop.com
```
发现多了一个容器，以dev-peer0.ming.coffeeshop.com开头，这个是链码执行的容器
好了，链码部署成功！

## 网络示意图
![consortium](/book/fabric/coffee06.png)

注
- 本节源码位于:[06-smart-contract-chaincode](https://github.com/stephenwu2020/hfcoffeeshop/tree/master/06-smart-contract-chaincode)