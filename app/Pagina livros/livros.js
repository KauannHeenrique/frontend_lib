import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Livros() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerenciamento de Livros</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina livros/exibirAcervo')}
      >
        <Text style={styles.buttonText}>Exibir acervo</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina livros/buscarLivroNome')}
      >
        <Text style={styles.buttonText}>Procurar livro</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina livros/adicionarLivro')}
      >
        <Text style={styles.buttonText}>Adicionar livro ao acervo</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina livros/atualizarLivro')}
      >
        <Text style={styles.buttonText}>Atualizar informações do livro</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina livros/deletarLivro')}
      >
        <Text style={styles.buttonText}>Excluir livro do acervo</Text>
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
