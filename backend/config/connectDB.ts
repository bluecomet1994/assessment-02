import * as mongoose from 'mongoose';

// Connect Mongoose
export default async () => {
    await mongoose.connect(process.env.MONGO_URI!)
        .then(() => console.log('MongoDB Connected.'))
        .catch(error => console.log(error));
}