const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const UserModal = require('./Modals/Users');
require('dotenv').config();
require('./Modals/db');

const PORT = process.env.PORT || 8080

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.get('/auth/users', async (req, res) => {
  try {
    const users = await UserModal.find({}, 'name email');
    res.json(users)

  } catch (error) {
    res.status(500).json({ message: 'error fetching users', error });
  }
})
// app.get('/auth/login', (req, res) => {
//   res.json({ message: "Login route reached", verified: req.query.verified });
// });

app.use(bodyparser.json());
app.use(cors());
app.use('/auth', authRouter);


app.listen(PORT, () => {
  console.log("Server is running on port 8080")
})