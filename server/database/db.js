import mongoose from "mongoose";




export const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@krishi-samadhan.aooraqs.mongodb.net/?retryWrites=true&w=majority&appName=krishi-samadhan`;
    try {
        await mongoose.connect(URL)
        console.log('Database connected successfully');
    } catch(error) {
        console.log(`error while connecting with database` , error.message);
    }
}

export default Connection;