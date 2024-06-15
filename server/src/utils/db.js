const mongoose= require("mongoose")

const mongoUrl=process.env.MONGO_URL
const mongoDbConnection= async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoUrl,{dbName:"PMT"}) 
        console.log('database connected')
    }
    catch(error) {
        console.log(error)
    }
}

module.exports={mongoDbConnection}