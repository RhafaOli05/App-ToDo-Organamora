import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#333',
    },
    input: {
      width: '60%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#fff',
      fontSize: 16,
    },
    logo:{
      width: '80%',
      aspectRatio: 3,
      resizeMode: 'contain',
      marginBottom: 30,
      maxWidth: 500,
    }
});