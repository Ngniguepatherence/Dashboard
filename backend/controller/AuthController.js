const Auth = require('../model/login');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthController = {
    Login: async (req,res) => {
        try {
            const { email, password } = req.body;
            const user = await Auth.findOne({ email });
            if (!user) {
              return res.status(400).json({ error: 'Invalid username or password' });
            }
            // const passwordMatch = await bcrypt.compare(password, user.password);
            if (password != user.password) {
              return res.status(400).json({ error: 'Invalid username or password' });
            }
            const token = jwt.sign({ username: user.email }, process.env.JWT_SECRET);
            res.json({ token });
          } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'An error occurred while logging in' });
          }
    },
    
    Register: async(req,res) => {
        try {
            const { email, password } = req.body;
            // const hashedPassword = await bcrypt.hash(password, 10);
            const user = new Auth({ email, password: password });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
          } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'An error occurred while registering user' });
          }
    }
}

module.exports = AuthController;