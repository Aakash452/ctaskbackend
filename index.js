const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const cModel = require('./models/companyDetails');
const User = require('./models/userSchema');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/task')
.then(()=>{
    console.log("MongoDB is connected");
}).catch((err)=>{
console.log(err)
});

app.post('/data', async (req, res) => {
    try {
      
      cModel.create(req.body).then((respond)=>{
        res.json(respond);
      })
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/data', async (req, res) => {
    try {
      
      const data = await cModel.find();
  
      // Respond with the fetched data
      res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/data/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      // Use findByIdAndDelete to delete the document by its ID
      const deletedData = await cModel.findByIdAndDelete(id);
  
      if (!deletedData) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
      res.json({ message: 'Data deleted successfully', deletedData });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/data/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const updatedData = await cModel.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedData) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
      res.json({ message: 'Data updated successfully', updatedData });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/signup',async(req,res)=>{
try{

    User.create(req.body).then((respond)=>{
        res.json(respond);
    })
}
catch{
console.log("Error!");
}
})

// app.post('/checkPassword', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Find the user by email
//       const user = await User.findOne({ email });
//       const isPasswordValid = false;
  
//       if (!user || password!=user.password) {
//         return res.status(404).json({ error: 'User not found' });
//       }else{
//         isPasswordValid == true;
//       }
      
      
  
//       if (isPasswordValid==true) {
//         res.json({ message: 'Password is correct' });
//       } else {
//         res.status(401).json({ error: 'Incorrect password' });
//       }
//     } catch (error) {
//       console.error('Error checking password:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


app.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  const isPasswordValid = false;
  console.log(identifier)
  try {
    // Find the user by email or phone number
    const user = await User.findOne({email:identifier});
    console.log(user);
    
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }else{
      console.log(user.password)
            if(user.password == password){
              res.json({ success: true, message: 'Login successful' });
              console.log("login Successfull");
            }else{
              res.json({ success: false, message: 'Incorrect password' });
            }
            }


    // if (isPasswordValid == true) {
    //   res.json({ success: true, message: 'Login successful' });
    // } else {
    //   res.json({ success: false, message: 'Incorrect password' });
    // }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(3001,()=>{
    console.log("Server is running");
})


