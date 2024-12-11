import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, Pressable, FlatList, ActivityIndicator } from 'react-native';

export default function ExibirEmprestimos() {
  const router = useRouter();
  const [emprestimos, setEmprestimos] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  const fetchEmprestimos = async () => {
    try {
      const response = await fetch("http://localhost:5014/api/Emprestimos/ExibirEmprestimos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar empréstimos');
      }
      const textData = await response.text(); 
      const data = JSON.parse(textData);
      console.log(data); 

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchEmprestimos();
        setEmprestimos(resp);
        setLoading(false);
      } catch (ex) {
        console.error(ex)
        setError('Erro ao carregar empréstimos');
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exibir Emprestimos</Text>

      {/* Indicador de carregamento */}
      {loading && <ActivityIndicator size="large" color="#007BFF" />}

      {/* Mensagem de erro */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Lista de emprestimos */}
      {!loading && !error && (
        <FlatList
          data={emprestimos}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.emprestimoItem}>
              <Text style={styles.emprestimoId}>Locação {item.id}</Text> 
              <Text style={styles.livroTitulo}>Locatário: {item.locatario.nomeLocatario}</Text> 
              <Text style={styles.livroAutor}>Livro: {item.livro.tituloLivro}  |  Autor: {item.livro.autorLivro}</Text>
              <Text style={styles.livroData}>Data de locação: {formatDate(item.dataEmprestimo)}</Text>
              <Text style={styles.livroData}>Data de devolução: {item.dataDevolucao ? formatDate(item.dataDevolucao) : 'Não devolvido'}</Text> 
            </View>
          )}
        />
      )}

      <Pressable style={styles.backButton} onPress={() => router.push('/Pagina emprestimos/emprestimos')}>
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
  emprestimoItem: {
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
  emprestimoId: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: "#000000",
  },
  livroData: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000000',
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
