const express = require('express');
require('dotenv').config();
const cors = require('cors');
const VisitorRoute = require('./routes/VisitorRoutes');
const VehicleRoute = require('./routes/VehicleRoutes');
const AuthRoute = require('./routes/AuthRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./model/db');
const CompanyRoute = require('./routes/CompanyRoutes');
const TestRoutes = require('./routes/test');
connectDB()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/test', TestRoutes);
app.use('/api/visitor', VisitorRoute);
app.use('/api/vehicle',VehicleRoute);
app.use('/api/auth',AuthRoute);
app.use('/api/companies',CompanyRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
