import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Emprestimos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerenciamento de empréstimos</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina emprestimos/exibirEmprestimos')}
      >
        <Text style={styles.buttonText}>Exibir Empréstimos</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina emprestimos/adicionarEmprestimo')}
      >
        <Text style={styles.buttonText}>Adicionar Empréstimo</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/Pagina emprestimos/devolucao')}
      >
        <Text style={styles.buttonText}>Devolução de Livro</Text>
      </Pressable>

      <Pressable style={styles.voltarButton} onPress={() => router.push('/')}>
        <Text style={styles.textoVoltar}>Voltar</Text>
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
    textAlign: "center",
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
  voltarButton: {
    padding: 15,
    backgroundColor: '#FF5733',
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1, 
    marginTop: 20,
  },
  textoVoltar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
