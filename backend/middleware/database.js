const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected')
  }
  catch (err) {
    console.log(`Database connection error: ${err}`)
  }
}

module.exports = connectDatabase;
