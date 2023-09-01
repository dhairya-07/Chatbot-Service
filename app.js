const express = require('express');
const userRoutes = require('./routes/adminRoutes');
const endUserRoutes = require('./routes/endUserRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const { globalErrorHandler } = require('./controllers/errorController');
const { sequelize } = require('./models');

const app = express();
const PORT = 5001;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on port: ${PORT}`);
    });
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Error:', err);
  });

app.use(express.json());

app.use('/api/admin', userRoutes);
app.use('/api/end-user', endUserRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/conversation', conversationRoutes);

app.use(globalErrorHandler);
