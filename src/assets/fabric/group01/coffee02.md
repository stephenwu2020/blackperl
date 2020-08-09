# 从0开始搭建Fabric网络:Orderer
##  创建网络
Fabric网络的重中之重是orderer节点。交易是如何在Fabric网络处理的呢？假设客户要买一杯咖啡，首先，在peer节点创建交易信息，随后发送给orderer节点，orderer把多个交易打包成区块，再把区块发送给peer节点，写入ledger中。
为此，小明决定先创建只有一个orderer节点的网络，并且打了一份配置草稿：
- 网络名称: `coffeeshop.com`
- orderer名称: `orderer.coffeesop.com`
- orderer类型： EtcdRaft
- orderer数量：1

## 现在进入正式编码环节
第一、Fabric中，所有的资源都必须认证，我们首先创建orderer的证书文件：
1. 创建文件夹： 01-creating-the-network
2. 进入文件夹，创建文件：crypto-config.yaml，添加以下内容：
   ```
   OrdererOrgs:
    - Name: Orderer
      Domain: coffeeshop.com
      EnableNodeOUs: true
      Specs:
        - Hostname: orderer
          SANS:
            - localhost
   ```
3. 执行创建证书的指令:
   ```
   ./network.sh crypto
   ```
   证书文件存放在organizations目录下

第二、定义网络的组织形式，创建文件configtx.yaml，这里大部分内容是默认配置，有几点需要解释:
1. Orderer的配置，指定类型etcdraft，配置tls证书的路径：
    ```
    Orderer: &OrdererDefaults
        OrdererType: etcdraft

        EtcdRaft:
            Consenters:
            - Host: orderer.coffeeshop.com
              Port: 7050
              ClientTLSCert: ./organizations/ordererOrganizations/coffeeshop.com/orderers/orderer.coffeeshop.com/tls/server.crt
              ServerTLSCert: ./organizations/ordererOrganizations/coffeeshop.com/orderers/orderer.coffeeshop.com/tls/server.crt
        Addresses:
            - orderer.coffeeshop.com:7050
        ......
    ```
2. 全局通道的配置：
    ```
    Profiles:
        Genesis:
            <<: *ChannelDefaults
            Orderer:
                <<: *OrdererDefaults
                Organizations:
                    - *Orderer
                Capabilities:
                    <<: *OrdererCapabilities
            Consortiums:
                SampleConsortium:
                    Organizations:
    ```
3. Fabric的创世块就是依据此文件产生的。执行创建创世块的指令: 
   ```
   ./network.sh genesis
   ```
   创世块存放路径为: ./system-genesis-block/genesis.block 

第三、编写orderer的容器文件: docker-compose.yml:
```
version: '2'

networks:
  basic:

services:
  orderer.coffeeshop.com:
    container_name: orderer.coffeeshop.com
    image: hyperledger/fabric-orderer:$IMAGE_TAG
    environment:
      - FABRIC_LOGGING_SPEC=info
      - ORDERER_GENERAL_LISTENADDRESS=0.0.0.0
      - ORDERER_GENERAL_BOOTSTRAPMETHOD=file
      - ORDERER_GENERAL_BOOTSTRAPFILE=/etc/hyperledger/configtx/genesis.block
      - ORDERER_GENERAL_LOCALMSPID=OrdererMSP
      - ORDERER_GENERAL_LOCALMSPDIR=/etc/hyperledger/msp/orderer/msp
        # enabled TLS
      - ORDERER_GENERAL_TLS_ENABLED=true
      - ORDERER_GENERAL_TLS_PRIVATEKEY=/etc/hyperledger/orderer/tls/server.key
      - ORDERER_GENERAL_TLS_CERTIFICATE=/etc/hyperledger/orderer/tls/server.crt
      - ORDERER_GENERAL_TLS_ROOTCAS=[/etc/hyperledger/orderer/tls/ca.crt]
      - ORDERER_KAFKA_TOPIC_REPLICATIONFACTOR=1
      - ORDERER_KAFKA_VERBOSE=true
      - ORDERER_GENERAL_CLUSTER_CLIENTCERTIFICATE=/etc/hyperledger/orderer/tls/server.crt
      - ORDERER_GENERAL_CLUSTER_CLIENTPRIVATEKEY=/etc/hyperledger/orderer/tls/server.key
      - ORDERER_GENERAL_CLUSTER_ROOTCAS=[/etc/hyperledger/orderer/tls/ca.crt]
    working_dir: /opt/gopath/src/github.com/hyperledger/fabric/orderer
    command: orderer
    ports:
      - 7050:7050
    volumes:
        - ./system-genesis-block/:/etc/hyperledger/configtx
        - ./organizations/ordererOrganizations/coffeeshop.com/orderers/orderer.coffeeshop.com/:/etc/hyperledger/msp/orderer
        - ./organizations/ordererOrganizations/coffeeshop.com/orderers/orderer.coffeeshop.com/msp:/etc/hyperledger/orderer/msp
        - ./organizations/ordererOrganizations/coffeeshop.com/orderers/orderer.coffeeshop.com/tls/:/etc/hyperledger/orderer/tls

    networks:
      - basic
```
执行启动网络的指令:
```
./network.sh up
```
此时orderer节点已经启动，执行 docker ps 可以看到orderer的运行状态：
```
CONTAINER ID        IMAGE                              COMMAND             CREATED             STATUS              PORTS                    NAMES
df23933ad957        hyperledger/fabric-orderer:2.2.0   "orderer"           4 seconds ago       Up 2 seconds        0.0.0.0:7050->7050/tcp   orderer.coffeeshop.com
```
咖啡馆网络的启动工作就大功告成了

## 网络示意图
![orderer](/book/fabric/coffee01.png)

## 命令讲解
./networks.sh每一个命令相对应一个操作：
- 创建证书: ./network.sh crypto
- 创建创世块: ./network.sh genesis
- 启动网络: ./network.sh up
- 关闭网络： ./network.sh down
- 清理目录：./network.sh clear
- 启动网络一步到位： ./network.sh custom

注：
- 这一节的所有文件存放在[01-creating-the-network](https://github.com/stephenwu2020/hfcoffeeshop/tree/master/01-creating-the-network)目录