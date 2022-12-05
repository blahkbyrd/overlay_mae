const axios = require('axios')




const auth = async (req, res, next) => {
    try {
        const credientals = {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        }
        const response = await axios.post('http://api.cup2022.ir/api/v1/user/login', credientals)
        const token = response.data.data.token;
        req.token = token
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
    next()
}




module.exports = { auth }