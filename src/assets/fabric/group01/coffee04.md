# 从0开始搭建Fabric网络:联盟
## 定义联盟
要理解联盟，得搞清楚Fabric与链的关系。Fabric管理网络如何运行，谁可以加入，谁是管理员，但成员之间的生意，fabric是不管的。成员之间是如何做生意的呢？首先，成员自发成立一个联盟，或者说集团，邀请其他成员加入。同一个联盟的成员之间互相交易，交易的数据被记录在区块之中。这个联盟就是一条链。同一个成员可以加入多个联盟，每个联盟可以组织多个成员，这样就形成了各种各种的链。
小明的咖啡馆网络运行后，要开始真正的生意，必须有组织成立联盟，加入联盟。本节的任务非常简单：把企业Ming加入联盟。

第一，创建目录 03-defining-a-consortium，并且进入该目录
```
mkdir 03-defining-a-consortium
cd 03-defining-a-consortium
```

第二，在configtx.yaml中，定义联盟X1，定一个Ming为X1的成员:
```
        Consortiums:
            SampleConsortium:
                Organizations:
            X1:
                Organizations:
                    - *Ming
```
## 网络示意图
![consortium](/book/fabric/coffee03.png)
注：
- 本节源码位于: [03-defining-a-consortium](https://github.com/stephenwu2020/hfcoffeeshop/tree/master/03-defining-a-consortium)