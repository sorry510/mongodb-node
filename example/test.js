const MongoDb = require('../src/mongodb')

!(async function() {
    const url = "mongodb://localhost:27017"
    const dbConfig = {
        name: 'test'
    }
    const db = new MongoDb(dbConfig, url)
    try {
        // 创建集合
        // let res1 = await db.createCollection('hello2')
        // console.log(res1)
        // process.exit()

        // 新增一条数据
        // let data = { name: "菜鸟教程1", url: "www.runoob" }
        // let res2 = await db.collection('hello').insertOne(data)
        // console.log(res2)

        // 新增多条数据
        // let dataMany = [
        //     {
        //         title: 'MongoDB Overview', 
        //         description: 'MongoDB is no sql database',
        //         by_user: 'runoob.com',
        //         url: 'http://www.runoob.com',
        //         tags: ['mongodb', 'database', 'NoSQL'],
        //         likes: 100
        //     },
        //     {
        //         title: 'NoSQL Overview', 
        //         description: 'No sql database is very fast',
        //         by_user: 'runoob.com',
        //         url: 'http://www.runoob.com',
        //         tags: ['mongodb', 'database', 'NoSQL'],
        //         likes: 10
        //     },
        //     {
        //         title: 'Neo4j Overview', 
        //         description: 'Neo4j is no sql database',
        //         by_user: 'Neo4j',
        //         url: 'http://www.neo4j.com',
        //         tags: ['neo4j', 'database', 'NoSQL'],
        //         likes: 750
        //     }
        // ];
        // let res3 = await db.collection('article').insertMany(dataMany)
        // console.log(res3)

        // 查询
        // await db.connect()
        // let where = {"name":/^菜鸟/}
        // let res4 = await db.collection('hello').find(where).toArray()
        // console.log(res4)

        // 排序 + 分页
        // await db.connect()
        // let rule = {name: 1}
        // let res4 = await db.collection('hello').find().sort(rule).skip(1).limit(2).toArray()
        // console.log(res4)

        // 更新一条
        // let findwhere = {"name":'菜鸟教程'};  // 查询条件
        // let setData = {$set: {"url": "https://www.baidu.com" }}
        // let res5 = await db.collection('hello').updateOne(findwhere, setData)
        // console.log(res5)

        // 更新多条
        // let findwhere = {"name":/^菜鸟/};  // 查询条件
        // let setData = {$set: {"url": "https://www.sign.com" }}
        // let res6 = await db.collection('hello').updateMany(findwhere, setData)
        // console.log(res6)

        // 删除一条
        // let delwhere = {"name":/^菜鸟/};  // 查询条件
        // let res7 = await db.collection('hello').deleteOne(delwhere)
        // console.log(res7)

        // 删除多条
        // let delwhere = {"name":/^菜鸟/};  // 查询条件
        // let res8 = await db.collection('hello').deleteMany()
        // console.log(res8)

        // 聚合查询
        // -分组
        // await db.connect()
        // let condition = [{$group: {_id: "$by_user", num_tutorial: {$sum : 1}}}]
        // let res9 = await db.collection('article').aggregate(condition).toArray()
        // console.log(res9)

        // -左连接
        // await db.connect()
        // let condition = [{
        //     $lookup: {
        //         from: 'products',            // 右集合
        //         localField: 'product_id',    // 左集合 join 字段
        //         foreignField: '_id',         // 右集合 join 字段
        //         as: 'orderdetails'           // 新生成字段（类型array）
        //     }
        // }]
        // let res9 = await db.collection('orders').aggregate(condition).toArray()
        // console.log(JSON.stringify(res9))

       
        // 删除集合
        // let res10 = await db.collection('col').drop()
        // console.log(res10)

        // db.collection('hello2').drop().then(res=>console.log(res)).catch(err=>{
        //     db.close()
        //     console.log('err', err)
        // })
    }catch(err) {
        db.close()
        console.log('error', err)
    }
})()