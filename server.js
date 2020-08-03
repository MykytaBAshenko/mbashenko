
const express = require('express');
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import projectRoute from './routes/projectRoute';
import userRoute from './routes/userRoute';
require('dotenv').config();

const mongodbUrl =process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
console.log(mongodbUrl, PORT);

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).catch(error => console.log(error.reason));
  
  
  const connection = mongoose.connection;
  
  connection.once('open', () => {
      console.log("conect success");
  });
  
  const app = express();
  app.use(bodyParser.json());
  app.use("/api/projects", projectRoute);
  app.use("/api/user", userRoute);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
  }
app.listen(PORT, () => { console.log("Server started at ",PORT ) });
