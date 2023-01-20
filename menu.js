const express=require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(express.json())

var database

app.get('/', (req, resp) => {
    resp.send('Welcome to mongodb Menu API')
})
app.get('/api/menu',(req,resp)=>{
    database.collection('menu').find({}).toArray((error, result)=>{
        if(error) throw error
        resp.send(result)
    })
})
app.get('/api/menu/:title', (req, resp)=>{
    let isInteger=false;
    let title=req.params.title;
    
    for(i=0; i<title.length; i++){
     let ascii=title[0].charCodeAt(0);
    if((ascii>=48 && ascii<=57)){
        isInteger=true;
    }
    }
    if(isInteger){database.collection('menu').find({id: parseInt(title)}).toArray((error, result)=>{
        if(error) throw error
        resp.send(result)
    })}
    else{
        database.collection('menu').find({title: req.params.title}).toArray((error, result)=>{
            if(error) throw error
            resp.send(result)
        })
    }
})
app.post('/api/menu/additem', (req, resp)=>{
    let res=database.collection('menu').find({}).sort({id:-1}).limit(1)
    res.forEach(obj => {
        if(obj){
            let item={
                id: obj.id+1,
                title: req.body.title,
                price: req.body.price
            }
            database.collection('menu').insertOne(item, (error, result)=>{
                if(error) resp.status(500).send(error)
                resp.send("Added Successfully!")
            })
        }
        
    })
})
app.put('/api/menu/:id', (req,resp)=>{
    let res=database.collection('menu').find({x:id})
   let query={id: parseInt(req.params.id)}
    let item ={
        id: parseInt(req.params.id),
        title: req.body.title,
        price: req.body.price
    }
    let dataSet={
        $set: item
    }
    database.collection('menu').updateOne(query, dataSet, (error, result)=>{
        if(error) throw error
        resp.send(item)
    })
})
app.delete('/api/menu/:id', (req, resp)=>{
    database.collection('menu').deleteOne({id: parseInt(req.params.id)}, (error, result)=>{
            if(error) throw error
            resp.send("item Deleted!")
    })
})
app.listen(7070, () => {
    MongoClient.connect('mongodb://0.0.0.0:27017', { useNewUrlParser: true}, (error, result) =>{
        if(error) throw error
        database = result.db('mydatabase')
        console.log('Connection sucessful!')
    })
})