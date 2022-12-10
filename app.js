const express = require('express')
const app = express()
let { student }= require('./students')

app.use(express.json())

const fetchingStudentList = () => {
    app.get('/students', (req,res) => {
        res.status(200).json({
            success: true,
            data: student
        })
    })
}

const addStudentData = () => {
   app.post('/students', (req,res) => {  
      const name = req.body.name
      const address = req.body.address
      const rank = req.body.rank
    if(!name || !address || !rank){
         res.status(401).json({success:false, msg:'fill all the data'})
    }
      else{
        student.push({
            id: student.length + 1,
            name:name,
            address:address,
            rank:Number(rank)
        })     
        res.status(200).send('student added')
     }
   })
} 

const updataStudentData = () =>{
    app.put('/students/:id', (req,res) => {
        const {id} = req.params
        const name = req.body.name
        const address = req.body.address
        const rank = req.body.rank
          
       const kid = student.find((kid) => kid.id === Number(id))
        
       if(!kid){
        return res.status(401).json({success:false, msg:`student does not exist with id ${id}`})
       }
    else{
      const newStudent = student.map((kid) =>{
        if(kid.id === Number(id)){
            kid.name = name
            kid.address = address
            kid.rank = rank
        }
        return kid
      })
        res.status(200).json({success:true, data:newStudent})
    }
        
    })
}

const deleteStudentData = () =>{
    app.delete('/students/:id', (req,res) => {
        const {id} = req.params
        const kid = student.find((kid) => kid.id === Number(id))
        
        if(!kid){
         return res.status(404).json({success:false, msg:`student does not exist with id ${id}`})
        }
        else
        {
            const newStudent = student.filter((kid) => kid.id !== Number(id))
            return res.status(200).json({success:true,data:newStudent, msg:'student info deleted'})
        }
    })
}


fetchingStudentList()
addStudentData()
updataStudentData()
deleteStudentData()

app.listen(7000, () => {
    console.log('server is running on port 7000')
})