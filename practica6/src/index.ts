import express from 'express';
import router from './routes';
import { connectDB } from './config/db';

const PORT = 3000;
const app = express();

app.use(express.json()); //middleware que procesa JSON en las solicitudes
app.use('/', router); //configurando rutas

connectDB()
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;