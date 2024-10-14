// server.js
const fastify = require('fastify')();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define your Fastify routes here (optional)
fastify.get('/', async (request, reply) => {
    return { message: 'Welcome to the Fastify API' };
});

// Start the Fastify server
const PORT = process.env.PORT || 8000;
fastify.listen(PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running on ${address}`);
});
