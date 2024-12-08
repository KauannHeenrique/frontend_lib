import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native';

export default function ExibirAcervo() {
  const router = useRouter();
  const [locatarios, setLocatarios] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  const fetchLocatarios = async () => {
    try {
      const response = await fetch("http://localhost:5014/api/Locatarios/ExibirLocatarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar Locatário');
      }
      const textData = await response.text(); 
      const data = JSON.parse(textData);
      console.log(data); 

      return (data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchLocatarios();
        setLocatarios(resp);
        setLoading(false);
      } catch (ex) {
        console.error(ex)
        setError('Erro ao carregar locatários');
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exibir locatários</Text>

      {/* Indicador de carregamento */}
      {loading && <ActivityIndicator size="large" color="#007BFF" />}

      {/* Mensagem de erro */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Lista de locatários */}
      {!loading && !error && (
        <FlatList
          data={locatarios}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.locatarioItem}>
              <Text style={styles.locatarioId}>ID {item.id}</Text> 
              <Text style={styles.livroTitulo}>Locatário: {item.nomeLocatario}</Text>
              <Text style={styles.locatarioData}>Ano de nascimento: {item.anoNascimento}</Text> 

            </View>
          )}
        />
      )}

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
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  locatarioItem: {
  padding: 15,
  marginVertical: 8,
  backgroundColor: '#ffffff',
  borderRadius: 8,
  width: '100%',
  borderWidth: 1,
  borderColor: '#ddd',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3, 
  },
  locatarioData: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000000',
  },
  locatarioId: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: "#000000"
  },
  livroTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  livroAutor: {
    fontSize: 12,
    fontWeight: '450',
    color: '#333',
    fontStyle: "italic",
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
