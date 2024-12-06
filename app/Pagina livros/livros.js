import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Livros() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerenciamento de Livros</Text>

      <Pressable style={styles.button} onPress={() => console.log('Exibir acervo')}>
        <Text style={styles.buttonText}>Exibir Acervo</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => console.log('Consultar livro por nome')}>
        <Text style={styles.buttonText}>Consultar Livro</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => console.log('Adicionar livro ao acervo')}>
        <Text style={styles.buttonText}>Adicionar Livro</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => console.log('Atualizar dados do livro')}>
        <Text style={styles.buttonText}>Atualizar Livro</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => console.log('Excluir livro')}>
        <Text style={styles.buttonText}>Excluir Livro</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backButtonText}>Voltar</Text>
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
    marginBottom: 20,
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
  backButton: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});