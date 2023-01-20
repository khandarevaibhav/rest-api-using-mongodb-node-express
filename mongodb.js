const express = require('express')
const MongoClient = require('mongodb').MongoClient
 
const app = express()
 
app.use(express.json())
var database
 
app.get('/', (req, resp) => {
    resp.send('Welcome to mongodb API')
})
app.get('/api/customers',(req,resp)=>{
    database.collection('customers').find({}).toArray((error, result)=>{
        if(error) throw error
        resp.send(result)
    })
})
/*app.get('/api/customers/:id',(req,resp)=>{
    database.collection('customers').find({id: parseInt(req.params.id)}).toArray((error, result)=>{
        if(error) throw error
        resp.send(result)
    })
})*/
app.get('/api/customers/:firstName',(req,resp)=>{
    database.collection('customers').find({firstName: req.params.firstName}).toArray((error, result)=>{
        if(error) throw error
        resp.send(result)
    })
})

app.post('/api/customers/addcustomer', (req, resp)=>{
    let res = database.collection('customers').find({}).sort({id:-1}).limit(1)
    res.forEach( obj=> {
        if(obj){
            let customer={
                id: obj.id+1,
                firstName:req.body.firstName,
                age:req.body.age
            }
            database.collection('customers').insertOne(customer, (error, result ) =>{
                if(error) resp.status(500).send(error)
                resp.send("Added Successfully")
            })
        }
        
    })
})
app.put('/api/customers/:id', (req,resp)=>{
    let query={id: parseInt(req.params.id)}
    let customer={
        id: parseInt(req.params.id),
        firstName: req.body.firstName
    }
    let dataSet={
        $set: customer
    }
    database.collection('customers').updateOne(query, dataSet, (error, result)=>{
        if(error) throw error
        resp.send(customer)
    })
})
app.delete('/api/customers/:id', (req, resp)=>{
    database.collection('customers').deleteOne({id: parseInt(req.params.id)}, (error, result)=>{
            if(error) throw error
            resp.send("Customer Deleted!")
    })
})
app.listen(8080, () => {
    MongoClient.connect('mongodb://localhost:2701', { useNewUrlParser: true}, (error, result) =>{
        if(error) throw error
        database = result.db('mydatabase')
        console.log('Connection sucessful!')
    })
})
