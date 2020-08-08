# 从0开始搭建Fabric网络:管理
## 添加管理组织
小明的咖啡馆网络已经启动了，然而当前并不能做什么。Orderer就像企业的管理层，他们成天策划方案，但具体落实的，是底层的员工。在Fabric中扮演这个角色的是Peer节点。
经过一番大脑风暴，小明打好了第一个Peer节点草稿：
- peer名称：`ming.coffeeshop.com`
- peer权限：管理权限
- peer数量：1

现在开始编写peer节点配置:
第一，创建目录 02-adding-network-administrators，并且进入该目录：
```
mkdir 02-adding-network-administrators
cd 02-adding-network-administrators
```

第二，在crypto-config.yaml配置peer信息：
```
PeerOrgs:
  - Name: Ming
    Domain: ming.coffeeshop.com
    EnableNodeOUs: true
    Template:
      Count: 1
    Users:
      Count: 2
```

第三，在configtx.yaml配置peer的组织信息:
```
    - &Ming
        Name: Ming
        ID: MingMSP
        MSPDir: ./organizations/peerOrganizations/ming.coffeeshop.com/msp
        Policies:
            Readers:
                Type: Signature
                Rule: "OR('MingMSP.admin', 'MingMSP.peer', 'MingMSP.client')"
            Writers:
                Type: Signature
                Rule: "OR('MingMSP.admin', 'MingMSP.client')"
            Admins:
                Type: Signature
                Rule: "OR('MingMSP.admin')"
            Endorsement:
                Type: Signature
                Rule: "OR('MingMSP.peer')"
```
同时，将peer设置为网络组织：
```
Profiles:
    Genesis:
        <<: *ChannelDefaults
        Orderer:
            <<: *OrdererDefaults
            Organizations:
                - *Orderer
                - *Ming
            Capabilities:
                <<: *OrdererCapabilities
        Consortiums:
            SampleConsortium:
                Organizations:
```
第四，启动网络:
```
./network.sh custom
```

注:
- 在这一节中，重点是配置peer节点，相应组织Ming添加为网络管理组织，而peer节点的容器尚未启动
- 本节的源码位于[02-adding-network-administrators](https://github.com/stephenwu2020/hfcoffeeshop/tree/master/02-adding-network-administrators)