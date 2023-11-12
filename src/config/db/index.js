
const mongoose = require('mongoose');
async function Connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/SDN301m_FA23_PE_20231102_SE150463PE');
        console.log("ok!");
    } catch (error) {
        console.log("error!");
    }
}


module.exports = { Connect }