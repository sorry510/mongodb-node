const MongoClient = require('mongodb').MongoClient;

class MongoDb {

    constructor(dbConfig, url) {
        this.client = MongoClient
        this.url = url
        this.dbConfig = dbConfig
        this.model = null
        this.conn = null
        this.cursor = null
    }

    // asyncWrapper(cb) {
    //     return (async function() {
    //         let res = await cb()
    //         return res
    //     })()
    //     // return new Promise((resolve, reject)=> {
    //     //     cb(resolve, reject)
    //     // })
    // }

    async connect() {
        this.conn = await this.client.connect(this.url, {useNewUrlParser: true})
        // return new Promise((resolve, reject)=> {
        //     if(url) this.url = url
        //     if(!this.url) reject('url must write')
        //     this.client.connect(this.url, (err, conn)=> {
        //         if (err) reject(err);
        //         console.log("Connected successfully to server")
        //         resolve(conn)
        //     })
        // })
    }

    close() {
        if(this.conn) this.conn.close()
        this.conn = null
        this.model = null
        this.cursor = null
    }

    collection(model) {
        this.model = model
        return this
    }

    async createCollection(model) {
        if (!this.conn) await this.connect()
        let res = await this.conn.db(this.dbConfig.name).createCollection(model)
        this.close()
        return res
    }

    async insertOne(data) {
        if (!this.conn) await this.connect()
        let res = await this.conn.db(this.dbConfig.name).collection(this.model).insertOne(data)
        this.close()
        return res
    }

    async insertMany(data) {
        if (!this.conn) await this.connect()
        let res = await this.conn.db(this.dbConfig.name).collection(this.model).insertMany(data)
        this.close()
        return res
    }

    find(where={}) {
        if(!this.conn) throw new Error('db is not connected')
        this.cursor = this.conn.db(this.dbConfig.name).collection(this.model).find(where)
        // process.exit()
        return this
    }

    sort(rule) {
        if(!this.conn) throw new Error('db is not connected')
        this.cursor = this.cursor.sort(rule)
        return this
    }

    limit(number=0) {
        if(!this.conn) throw new Error('db is not connected')
        this.cursor = this.cursor.limit(number)
        return this
    }

    skip(number=0) {
        if(!this.conn) throw new Error('db is not connected')
        this.cursor = this.cursor.skip(number)
        return this
    }

    // 聚合
    aggregate(condition) {
        if(!this.conn) throw new Error('db is not connected')
        this.cursor = this.conn.db(this.dbConfig.name).collection(this.model).aggregate(condition)
        return this
    }

    async toArray() {
        if(!this.cursor) throw new Error('cursor is not found')
        let res = await this.cursor.toArray()
        this.close()
        return res
    }

    async updateOne(where, data) {
        if (!this.conn) await this.connect()
        let res = await this.conn.db(this.dbConfig.name).collection(this.model).updateOne(where, data)
        this.close()
        return res
    }
    
    async updateMany(where, data) {
        if (!this.conn) await this.connect()
        let res = await this.conn.db(this.dbConfig.name).collection(this.model).updateMany(where, data)
        this.close()
        return res
    }

    async deleteOne(where) {
        if (!this.conn) await this.connect()
        let res = await this.conn.db(this.dbConfig.name).collection(this.model).deleteOne(where)
        this.close()
        return res
    }

    async deleteMany(where={}) {
        if (!this.conn) await this.connect()
        let res = await this.conn.db(this.dbConfig.name).collection(this.model).deleteMany(where)
        this.close()
        return res
    }

    // 删除集合
    async drop() {
        if (!this.conn) await this.connect()
        let res = await this.conn.db(this.dbConfig.name).collection(this.model).drop()
        this.close()
        return res
    }
}

module.exports = MongoDb

/* **********************************************test*********************************** */
// !(async function() {
//     const url = "mongodb://localhost:27017"
//     const dbConfig = {
//         name: 'test'
//     }
    
//     try {
//         const db = new MongoDb(dbConfig, url)

//         // 创建集合
//         // let res1 = await db.createCollection('hello4')
//         // console.log(res1)

//         // 新增一条数据
//         // let data = { name: "菜鸟教程1", url: "www.runoob" }
//         // let res2 = await db.collection('hello').insertOne(data)
//         // console.log(res2)

//         // 新增多条数据
//         // let dataMany = [
//         //     { name: 'baidu', url: 'https://c.runoob.com', type: 'cn'},
//         //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
//         //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
//         // ];
//         // let res3 = await db.collection('hello').insertMany(dataMany)
//         // console.log(res3)

//         // 查询
//         // await db.connect()
//         // let where = {"name":/^菜鸟/}
//         // let res4 = await db.collection('hello').find(where).toArray()
//         // console.log(res4)

//         // 排序 + 分页
//         // await db.connect()
//         // let rule = {name: 1}
//         // let res4 = await db.collection('hello').find().sort(rule).skip(1).limit(2).toArray()
//         // console.log(res4)

//         // 更新一条
//         // let findwhere = {"name":'菜鸟教程'};  // 查询条件
//         // let setData = {$set: {"url": "https://www.baidu.com" }}
//         // let res5 = await db.collection('hello').updateOne(findwhere, setData)
//         // console.log(res5)

//         // 更新多条
//         // let findwhere = {"name":/^菜鸟/};  // 查询条件
//         // let setData = {$set: {"url": "https://www.sign.com" }}
//         // let res6 = await db.collection('hello').updateMany(findwhere, setData)
//         // console.log(res6)

//         // 删除一条
//         // let delwhere = {"name":/^菜鸟/};  // 查询条件
//         // let res7 = await db.collection('hello').deleteOne(delwhere)
//         // console.log(res7)

//         // 删除多条
//         // let delwhere = {"name":/^菜鸟/};  // 查询条件
//         // let res8 = await db.collection('hello').deleteMany()
//         // console.log(res8)

//         // 聚合查询

//         // 删除集合
//         let res10 = await db.collection('hello111').drop()
//         console.log(res10)
//     }catch(err) {
//         db.close()
//         console.log(err)
//     }
// })()


