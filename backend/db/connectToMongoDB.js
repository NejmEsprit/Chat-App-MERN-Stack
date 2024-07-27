import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CLOUD_URL)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error in connecting to MongoDB', error.message)
    }
}
export default connectToMongoDB;