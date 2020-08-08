# 从0开始搭建Fabric网络:Peer
## 记录区块的Peer
Peer的主要任务有：
- 接受客户请求，创建交易
- 发送交易至orderer
- 接收orderer的区块
- 将区块写入本地数据库

现在开始部署Peer节点
第一，创建目录05-peers-and-ledgers，进入该目录
```
mkdir 05-peers-and-ledgers
cd 05-peers-and-ledgers
```
第二，修改configtx.yaml，为企业Ming定义anchor peer:
```
        AnchorPeers:
            # AnchorPeers defines the location of peers which can be used
            # for cross org gossip communication.  Note, this value is only
            # encoded in the genesis block in the Application section context
            - Host: peer0.ming.coffeeshop.com
              Port: 7051
```
第三，为企业Ming添加peer的容器，修改docker-compose.yaml:
```
  peer0.ming.coffeeshop.com:
    container_name: peer0.ming.coffeeshop.com
    image: hyperledger/fabric-peer:$IMAGE_TAG
    environment:
      - CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock
      - CORE_VM_DOCKER_HOSTCONFIG_NETWORKMODE=${COMPOSE_PROJECT_NAME}_test
      - FABRIC_LOGGING_SPEC=info
      # peer env
      - CORE_PEER_TLS_ENABLED=true
      - CORE_PEER_PROFILE_ENABLED=true
      - CORE_PEER_TLS_CERT_FILE=/etc/hyperledger/fabric/tls/server.crt
      - CORE_PEER_TLS_KEY_FILE=/etc/hyperledger/fabric/tls/server.key
      - CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/tls/ca.crt
      # Peer specific variabes
      - CORE_PEER_ID=peer0.ming.coffeeshop.com
      - CORE_PEER_ADDRESS=peer0.ming.coffeeshop.com:7051
      - CORE_PEER_LISTENADDRESS=0.0.0.0:7051
      - CORE_PEER_CHAINCODEADDRESS=peer0.ming.coffeeshop.com:7052
      - CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:7052
      - CORE_PEER_GOSSIP_BOOTSTRAP=peer0.ming.coffeeshop.com:7051
      - CORE_PEER_GOSSIP_EXTERNALENDPOINT=peer0.ming.coffeeshop.com:7051
      - CORE_PEER_LOCALMSPID=MingMSP

    working_dir: /opt/gopath/src/github.com/hyperledger/fabric
    command: peer node start
    ports:
      - 7051:7051
    volumes:
        - /var/run/:/host/var/run/
        - ./system-genesis-block:/etc/hyperledger/configtx
        - ./organizations/peerOrganizations/ming.coffeeshop.com/peers/peer0.ming.coffeeshop.com/msp:/etc/hyperledger/fabric/msp
        - ./organizations/peerOrganizations/ming.coffeeshop.com/peers/peer0.ming.coffeeshop.com/tls:/etc/hyperledger/fabric/tls
        - ./channel-artifacts:/opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts
        - ./organizations:/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/
    networks:
      - basic
```
第四，启动网络:
```
./network.sh custom
```
检查docker容器状态：
```
docker ps
CONTAINER ID        IMAGE                              COMMAND             CREATED             STATUS              PORTS                    NAMES
b87e39044118        hyperledger/fabric-tools:2.2.0     "/bin/bash"         45 seconds ago      Up 44 seconds                                cli
733c894838be        hyperledger/fabric-peer:2.2.0      "peer node start"   47 seconds ago      Up 44 seconds       0.0.0.0:7051->7051/tcp   peer0.ming.coffeeshop.com
8ad4281a376c        hyperledger/fabric-orderer:2.2.0   "orderer"           47 seconds ago      Up 45 seconds       0.0.0.0:7050->7050/tcp   orderer.coffeeshop.com
```

命令解释：执行./network.sh custom启动网络，其中新增的命令是:
- joinChan: 将peer加入channel
- setAnchor：设置企业Ming的anchor peer为`peer0.ming.coffeeshop.com`
- listChan: 查看当前channel的信息

注：
- 本节源码位于:[05-peers-and-ledgers](https://github.com/stephenwu2020/hfcoffeeshop/tree/master/05-peers-and-ledgers)