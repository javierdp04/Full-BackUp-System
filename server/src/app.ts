import express from 'express';
import authRoutes from "./routes/index.ts"

const app = express();
const port = 3000;

app.use(authRoutes);

app.listen(port);