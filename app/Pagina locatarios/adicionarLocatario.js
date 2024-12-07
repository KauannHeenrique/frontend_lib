import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function AdicionarLocatario() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar locatário</Text>

      <Pressable style={styles.backButton} onPress={() => router.push('/Pagina locatarios/locatarios')}>
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
