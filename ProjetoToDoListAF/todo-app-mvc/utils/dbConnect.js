import mongoose from "mongoose";
const DATABASE_URL = process.env.DATABASE_URL;
const connectMongo = async () => {
  mongoose
    .connect(DATABASE_URL) //estabelecendo conexão
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB", err));
};

export default connectMongo;
 