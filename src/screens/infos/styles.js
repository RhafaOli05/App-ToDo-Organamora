import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2a0f3f',
  },

  // 👇 NOVA CAIXA
  card: {
    backgroundColor: '#faf4ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    width: '60%',

    // sombra iOS
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,

    // sombra Android
    elevation: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#2a0f3f',
    textAlign: 'justify',
  },
});