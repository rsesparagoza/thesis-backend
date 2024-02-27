const express = require('express');
require('dotenv').config();
require('./models/db'); 
const userRouter = require('./routes/user')
const port = 4000;

const User = require('./models/user');

const app = express();
app.use(express.json());
app.use(userRouter);

const test = async (email, password) => {
  const user = await User.findOne({email: email});
  const result = await user.comparePassword(password);
  console.log(result);
}


app.use((req, res, next) => {
  console.log(req.body); 
  next();
});


app.get('/test', (req, res) => {
  res.send('Hello, world!');
}); 

app.listen(port, () => {
  console.log(`Server is listening at Port ${port}`);
});



//app.post('/create-user', async (req, res) => {
/*   const isNewUser = User.EmailInUse('juan01@gmail.com')
  if(!isNewUser) return res.json({
      success: false,
      message: 'Email already in use'
    })
  const user = await User({
    fullname: 'Juan Serrano',
    username: 'juan01',
    email: 'juan04@gmail.com',
    password: '123',
    contact: '0909'
  });
  await user.save();
  res.json(user); */
//})

