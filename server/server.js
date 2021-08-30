import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './index.js';

dotenv.config();

//----------------------------------Connet with DB----------------------------------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successfull');
  })
  .catch((err) => {
    console.log(err.message);
  });

mongoose.set('useFindAndModify', true);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
