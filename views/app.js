const express=require('express')
const mongoose = require('mongoose')
const Menu = require('../models/menus')


const app = express()
app.use(express.json())


const dbURI = ''
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res)=>app.listen(3000,()=>console.log('listening on 3000')))
    .catch((err)=>console.log(err))




app.get('/', (req, resp) => {
    resp.send('Welcome to Mongoose API')
})
app.get('/api/all-menu',(req,resp)=>{
       Menu.find()
       .then((result)=>{
        resp.send(result)
       })
       .catch((error)=>{
        console.log(error)
       })
    })

app.get('/api/menu/:title', (req, resp)=>{
    

    Menu.findById(req.params.title)
        .then((result)=>{
            resp.send(result)
        })
        .catch((error)=>{
            resp.send("id not found")
            //console.log(error)
        })


app.get('/api/menu/findbyname/:name', (req, resp)=>{
    title=req.params.name
    console.log(title)
   let query= Menu.find({title})
    
   .then((result)=>{
        if(result.length==0){
            res.send("given name not in db")
        }

        resp.send(result)
    })
    .catch((error)=>{

        resp.send("Not in database")

    })
})

app.post('/api/menu/additem', (req, resp)=>{
    const menu=new Menu({
        title: req.body.title,
        price: req.body.price
    })
    menu.save()
     .then((result)=>{
        resp.send(result)
     })
     .catch((error)=>{
        console.log(error)
     })
})


app.put('/api/menu/:id', (req,resp,next)=>{
  
       Menu.findOneAndUpdate({_id:req.params.id},{

        $set:{

            title: req.body.title,
            price: req.body.price
        }
       })
       //adding promise
       .then((result)=>{
       
        resp.send("Successfully updated")
        resp.send(result)

       })

       .catch(err=>{

        resp.send('Cannot get Item')
        
      })

})




    
app.delete('/api/menu/:id', (req, resp)=>{
    const id = req.params.id
    Menu.deleteOne(id)
    .then((result)=>{

        resp.send("Deleted Successfully!")

    })
    .catch(err=>{
        resp.send("connot find Id")
    })
})


