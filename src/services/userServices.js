import axios from 'axios';
import { Alert } from "react-native";

const API_URL = 'http://localhost:3000/users';

//GET
export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//POST
export const postUser = async ({ nome, usuario, senha }) => {
  const response = await axios.post(API_URL, {
    nome,
    usuario,
    senha,
  });

  return response.data;
};

//DELETE
export const showNotification = (titulo, mensagem) => {
    Alert.alert(titulo, mensagem);
  };

export const deleteUser = async (id) => {
  try{
      console.log(`Enviando delete`);
  
      const response = await axios.delete(
        `${API_URL}/${id}`
      );
      console.log("Resposta do servidor:", response.data);

      showNotification("Sucesso", "Usuário excluído com sucesso!");
    } catch (error) {
        console.error("Erro completo ao deletar:");
        if (error.response) {
          showNotification("Erro no servidor");
        } else if (error.request){
          showNotification("Erro de conexão", "Não foi possível conectar o servidor backend.");
        } else {
          showNotification("Erro");
        }
    }
};
