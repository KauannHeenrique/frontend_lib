import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biblioteca Midland</Text>
      <StatusBar style="auto" />

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina livros/livros')}
      >
        <Text style={styles.buttonText}>Livros</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina locatarios/locatarios')}
      >
        <Text style={styles.buttonText}>Locatários</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina emprestimos/emprestimos')}
      >
        <Text style={styles.buttonText}>Empréstimos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
