const mongoDBClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017/budget';

mongoDBClient.connect(url,{useUnifiedTopology: true}, (operationError, dbHandler)=> {
    if(operationError){
        console.log("An error has occured during connection");
    } else {
        console.log("Connected to the database");
        //let newData = {$set: {title:"updated wifi bill", budget:40, color:"#00FFFF"}};
        //dbHandler.db('budget').collection('myBudget').updateOne({title: "wifi"},newData, (operr, opresult) =>{
        //    if (operr){
        //        console.log("Unable to update data")
        //    }else {
        //        console.log("update Successful")
                //dbHandler.close()
        //    }
        //})
        dbHandler.db('budget').collection('myBudget').deleteOne({title:"wifi"}, (operr,opresult) => {
            if(operr){
                console.log("unable to  delete data")
            } else {
                console.log("Deleted Successfully")
                //dbHandler.close()
            }
        })
        dbHandler.db('budget').collection('myBudget').find().toArray((operr,opresult) => {
            if(operr){
                console.log(operr)
            } else {
                for (var i=0; i < opresult.length; i++){
                    console.log(opresult[i])
                }
                dbHandler.close()
            }
        });
    }
});


