const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Define a simple schema and model
const TestSchema = new mongoose.Schema({ message: String });
const TestModel = mongoose.model('Test', TestSchema);

// Define a test route
fastify.get('/test', async (request, reply) => {
  const testDocument = await TestModel.findOne(); // Fetch a document from MongoDB
  return testDocument || { message: "No documents found" }; // Return the document or a message
});

// Start the server
const PORT = process.env.PORT || 8000;
fastify.listen(PORT, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});
