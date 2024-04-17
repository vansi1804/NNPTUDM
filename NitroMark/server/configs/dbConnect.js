const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        mongoose.set('strictQuery', true);
        const connect = mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to mongoose");
    } catch (error) {
        console.log(`Database error ${error}`);
    }
}

module.exports = dbConnect;