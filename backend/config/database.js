import mongoose from 'mongoose';

async function connectToDatabase(uri) {
  await mongoose.connect(uri);
}

export default connectToDatabase;
