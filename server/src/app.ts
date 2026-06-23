import express from 'express';
import authRoutes from "./routes/index.ts"

const app = express();
const port = 3000;

app.use('/auth', authRoutes);

app.listen(port);