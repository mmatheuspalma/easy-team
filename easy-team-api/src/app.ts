import express from 'express';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import roleRoutes from './routes/role.routes';
import permissionRoutes from './routes/permission.routes';
import locationRoutes from './routes/location.routes';

const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', permissionRoutes);
app.use('/api', locationRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the backend');
});

export default app;
