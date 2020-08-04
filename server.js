// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const projectRoute = require('./routes/projectRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
mongoose.connect(process.env.MONGODB_URI || 'link on your mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).catch(error => console.log(error.reason));

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// HTTP request logger
app.use(morgan('tiny'));
app.use("/api/projects", projectRoute);
app.use("/api/user", userRoute);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));