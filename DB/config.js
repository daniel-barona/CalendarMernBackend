const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        
        await mongoose.connect(process.env.DBconnetion);

        console.log('DB connected 😀🟢🚀');
        

    } catch (error) {
        console.log(error)
        throw new Error('Failed to initialize the database')
    }
}

module.exports = {
    dbConnection
}