import { useRouter, useSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function BookDetails() {
  const { id } = useSearchParams(); // Pega o parâmetro da URL
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Livro</Text>
      <Text style={styles.text}>ID do Livro: {id}</Text>

      <Pressable style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Voltar para a Lista</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});
