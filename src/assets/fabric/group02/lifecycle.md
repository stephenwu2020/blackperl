# Chaincode 生命周期管理
广义的Chaincode的生命周期，指的是，网络中的多个组织共同协作，将源代码部署到channel的管理流程。总共有4大类操作：
- Chaincode的安装和定义
- Chaincode升级流程
- 不同场景下的部署
- 不同生命周期版本之间的迁移

从开发者的角度出发，重点了解前2类即可。

## Chaincode安装和定义流程
狭义的chaincode生命周期，是指使用peer lifecycle chaincode工具安装chaincode的流程，它包括以下步骤:
1. package，打包chaincode
2. install，在peer节点安装chaincode
3. approve，组织批准，根据channel的政策，一定数量的组织批准后，才可以提交
4. commit，提交，将chaincode的信息提交到channel

完成上述步骤之后，chaincode即可运行，供应用程序访问调用。

## 环境准备
- 拉取仓库[fabric-cases](https://github.com/stephenwu2020/fabric-cases)
- 拉取fabric工具与镜像
  ```
  make
  ```
  拉取成功之后，fabric的工具在bin目录下，具体细节请查看devnet的介绍
- 测试网络，新建网络
  ```
  cd devnet
  ./builder.sh new
  ```
- 销毁网络
  ```
  ./builder.sh destroy
  ```

## 操作流程分解
1. 启动网络:
   ```
   $ ./builder.sh network default
   ...
   Creating network "hfcases_devnet" with the default driver
   Creating orderer.develop.com    ... done
   Creating peer0.org1.develop.com ... done
   Creating cli                    ... done
   ...
   ```
2. 配置channel:
   ```
    ./builder.sh channel default
    wait for 5 seconds...
    wait for 5 seconds...
    wait for 5 seconds...
    Channels peers has joined: 
    c1
    Blockchain info: {"height":2,"currentBlockHash":"Id/MEifZ1obcwzo59H9RAhJr9VEUo8h+a4wFc+VfaSc=","previousBlockHash":"rJe/u88mn55zC+7tJzEEpPQbLcgiEfo7ZbTJJy0HUxM="}
    wait for 5 seconds...
    Channels peers has joined: 
    c1
    Blockchain info: {"height":2,"currentBlockHash":"Id/MEifZ1obcwzo59H9RAhJr9VEUo8h+a4wFc+VfaSc=","previousBlockHash":"rJe/u88mn55zC+7tJzEEpPQbLcgiEfo7ZbTJJy0HUxM="}
   ```
3. package, 打包chaincode:
   ```
   $ ./builder.sh chaincode package
    fetch go dependency
    ...
    package chaincode
   ```
4. install, 安装chaincode
   ```
   $ ./builder.sh chaincode install
   ```
5. approve, 批准chaincode
   ```
   $ ./builder.sh chaincode approve
   ```
6. commit, 提交chaincode
   ```
   $ ./builder.sh chaincode commit
   ```
7. invoke, 运行chaincode
   ```
   $ ./builder.sh chaincode invoke
   ```
8. query, 查询
   ```
   $ ./builder.sh chaincode query
   100
   ```

## 简单说明
- 上述指令做了一定的简化，具体请看shell脚本的定义，chaincode.sh:
  ```
  #!/bin/bash

  . ./scripts/env.sh

  function package(){
    if [ -f "pkg/${CHAINCODE_NAME}.tar.gz" ]; then
      echo "pkg already exist"
    else
      echo "fetch go dependency"
      pushd ${CHAINCODE_PATH}
      #GO111MODULE=on go mod vendor
      GO111MODULE=on go mod tidy -v
      if [ ! $? -eq 0 ]; then
        echo "Fetch go dependency fail! Check your network please!"
        exit 1
      fi
      popd

      echo "package chaincode"
      peer lifecycle chaincode package ${CHAINCODE_NAME}.tar.gz \
        --path ${CHAINCODE_PATH} \
        --lang golang \
        --label ${CHAINCODE_LABEL}_1

      cp ${CHAINCODE_NAME}.tar.gz /opt/gopath/src/github.com/hyperledger/fabric/peer/pkg
    fi
  }

  ```
- chaincode.sh脚本运行在cli容器之内，方便编写
  ```
  "chaincode")
    shift
    docker exec cli scripts/chaincode.sh "$@"
    ;;
  ```

## 更新Chaincode
假设chaincode源码修改了，进行更新，上述过程重走一遍，调用脚本:
```
./builder.sh chaincode upgrade
```