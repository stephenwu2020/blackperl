# 从0开始搭建Fabric网络:Channel
## 定义channel
上一节，小明定义了一个联盟X1，并且把企业Ming加入至联盟中。Channel与联盟，其实是同一个东西的不同表现。联盟在Fabric技术上的实现就是channel。企业之间结成联盟，在技术上就是指企业对应的peer节点加入同一个channel。

## 现在开始添加channel
第一，创建目录04-creating-a-channel, 进入该目录：
```
mkdir 04-creating-a-channel
cd 04-creating-a-channel
```

第二，在configtx.yaml中定义channel
```
    CC1:
        Consortium: X1
        <<: *ChannelDefaults
        Application:
            <<: *ApplicationDefaults
            Organizations:
                - *Ming
            Capabilities:
                <<: *ApplicationCapabilities
```
第三，在docker-compose.yaml中定义cli容器，用于创建channel
```
  cli:
    container_name: cli
    image: hyperledger/fabric-tools:$IMAGE_TAG
    tty: true
    stdin_open: true
    environment:
      - GOPATH=/opt/gopath
      - CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock
      #- FABRIC_LOGGING_SPEC=DEBUG
      - FABRIC_LOGGING_SPEC=INFO
      - CORE_PEER_ID=cli
      - CORE_PEER_ADDRESS=ming.coffeeshop.com:7051
      - CORE_PEER_LOCALMSPID=MingMSP
      - CORE_PEER_TLS_ENABLED=true
      - CORE_PEER_TLS_CERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/ming.coffeeshop.com/peers/peer0.ming.coffeeshop.com/tls/server.crt
      - CORE_PEER_TLS_KEY_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/ming.coffeeshop.com/peers/peer0.ming.coffeeshop.com/tls/server.key
      - CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/ming.coffeeshop.com/peers/peer0.ming.coffeeshop.com/tls/ca.crt
      - CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/ming.coffeeshop.com/users/Admin@ming.coffeeshop.com/msp
    working_dir: /opt/gopath/src/github.com/hyperledger/fabric/peer
    command: /bin/bash
    volumes:
        - /var/run/:/host/var/run/
        - ./organizations:/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/
        - ./channel-artifacts:/opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts
    depends_on:
      - orderer.coffeeshop.com
    networks:
      - basic
```
第四，启动网络:
```
./network.sh custom
```
## 检查docker容器状态
```
docker ps
CONTAINER ID        IMAGE                              COMMAND             CREATED             STATUS              PORTS                    NAMES
e04af9c615ad        hyperledger/fabric-tools:2.2.0     "/bin/bash"         5 minutes ago       Up 5 minutes                                 cli
9fccfa81938a        hyperledger/fabric-orderer:2.2.0   "orderer"           5 minutes ago       Up 5 minutes        0.0.0.0:7050->7050/tcp   orderer.coffeeshop.com
```
## 网络示意图
![consortium](/book/fabric/coffee04.png)

## 解释命令
执行./network.sh custom过程中，分别执行了下列的命令：
- clear： 清空上一次创建的网络
- crypto： 创建证书文件
- genesis： 创建创世块
- up：启动docker容器(orderer和cli)
- createChanTx: 这是本节新加的命令，用于创建交易数据./channel-artifacts/c1.tx
- createChan: 这是本节新加的命令，用于创建区块数据./channel-artifacts/c1.block

注：
- 本节源码位于：[04-creating-a-channel](https://github.com/stephenwu2020/hfcoffeeshop/tree/master/04-creating-a-channel)