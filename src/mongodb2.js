const MongoClient = require('mongodb').MongoClient

class MongoDb {
    constructor() {
        this.client = MongoClient
        this.url = null
        this.dbConfig = null
        this.model = null
        this.conn = null
    }

    connect(url, dbConfig) {
        this.url = url
        this.dbConfig = dbConfig
        return this
    }

    async insertOne(data) {
        const conn = await this.client.connect(this.url, {useNewUrlParser: true})
        const db = conn.db(this.dbConfig.name)
        let res = await db.collection(this.model).insertOne(data)
        conn.close()
        this.model = null
        return res
    }
}

let mongo = new MongoDb()
// 将connection代理为属性名
let ProxyMongo = new Proxy(mongo, {
    get(target, name) {
        if(!(name in target)) {
            target.model = name
            return target
        }else {
            return target[name]
        }
    }
})

module.exports = ProxyMongo


/* **********************************************test*********************************** */

!(async function() {
    const url = "mongodb://localhost:27017"
    const dbConfig = {
        name: 'test'
    }

    try {
        const db = ProxyMongo.connect(url, dbConfig)

        // 创建集合
        // let res1 = await db.createCollection('hello2')
        // console.log(res1)

        // 新增一条数据
        let data = { name: "菜鸟教程", url: "www.runoob" }
        let res2 = await db.hello111.insertOne(data)
        console.log(res2)

        // 新增多条数据
        // let dataMany = [
        //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
        //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
        // ];
        // let res3 = await db.collection('hello').insertMany(dataMany)
        // console.log(res3)

        // 查询
        // let where = {"name":/^菜鸟/}
        // let res4 = await db.collection('hello').find(where)
        // console.log(res4)


    }catch(err) {
        console.log(err)
    }
})()

