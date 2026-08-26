import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 20,
      color: '#666',
    },
    logo: {
      width: '80%',
      aspectRatio: 3,
      resizeMode: 'contain',
      maxWidth: 400,
    },
    navButton: {
      backgroundColor: '#8b3dff',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonContainer: {
      width: '60%',
      gap: 15,
      paddingBottom: 30,
    },
});