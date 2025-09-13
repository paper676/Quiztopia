const mongoose=require('mongoose');

const connectToDb=async ()=>{
    await mongoose.connect(`${process.env.DB_CONNECT}/Quiztopia`).then(()=>{
        console.log("connected to dataBase");
    }).catch(err=>console.log(err))
}

module.exports=connectToDb;