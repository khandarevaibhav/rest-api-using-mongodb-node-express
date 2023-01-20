const express = require('express')
const app=express()
app.use(express.json())
const customers = [
    { 
        "id":1,
    
        "age": 27  
    
      }, 
      { 
        "id":2,
        "firstName": "James", 
    
        "age": 32 
      }, 
      { 
        
        "id":3,
        "firstName": "Robert", 
    
        "age": 45 
      } 
    ]
    app.get('/', (req, resp)=>{
        resp.send("This is my first Rest project by Vaibhav")
    })
    app.listen(8080,()=>console.log(`Listening on port 8080`))
 
    app.get('/api/customers', (req, resp)=>{
        resp.send(customers)
    })
     /*   read  all customer */
     app.get('/api/customers/:id', (req, resp)=>{
      const customer=customers.find(id===parseInt(req.params.id))
      if(!customer)resp.status(404).send("customer not found")
      resp.send(customer)
  }) 
    app.get('/api/customers/:dummy', (req, resp)=>{
      const customer=customers.find(firstName===req.params.dummy)
      if(!customer)resp.status(404).send("customer not found")
      resp.send(customer)
  }) 
   
    
    /*create method or post for a new customer*/
    app.post('/api/customers/addcustomer', (req, resp)=>{
        const customer={
          id:customers.length+1,
          firstName: req.body.firstName,
          age: req.body.age
        };
        customers.push(customer)
        resp.send(customers)
    })
    /* to update the data*/
    app.put('/api/customers/:id', (req, resp)=>{
        const customer=customers.find(x=>x.id===parseInt(req.params.id)) 
        if(!customer) resp.status(404).send("customer not found")

        customer.firstName=req.body.firstName
        resp.send(customer)

    })
    app.delete('/api/customers/:id', (req, resp)=>{
        const customer=customers.find(x=> x.id===parseInt(req.params.id))
        if(!customer) resp.status(404).send("customer not found")

        const index=customers.indexOf(customer)
        customers.splice(index, 1)   /*here 1 is count*/
        resp.send(customer)
    })

