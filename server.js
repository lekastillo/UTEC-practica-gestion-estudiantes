import dotenv from 'dotenv';
import appServer from './app.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.PORT || 3000;
dotenv.config();
appServer()
  .then((app) => {

    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT} ${NODE_ENV}`));

  })
  .catch((err) => console.log(err));
