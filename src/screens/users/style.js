import { StyleSheet } from 'react-native';

export const userStyles = StyleSheet.create({
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },

    // Estilos da barra de pesquisa
      searchBar: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 25,
      paddingHorizontal: 20,
      marginBottom: 20,
      fontSize: 16,
      backgroundColor: '#fff',
      color: '#333',
    },

    userList: {
      flex: 1,
      marginBottom: 20,
    },
    userCard: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#eee',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    userId: {
      fontSize: 14,
      color: '#666',
      marginBottom: 3,
    },
    userLogin: {
      fontSize: 14,
      color: '#666',
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: '#999',
      marginTop: 50,
    }
});