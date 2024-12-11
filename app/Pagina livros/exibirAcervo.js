import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native';

export default function ExibirAcervo() {
  const router = useRouter();
  const [livros, setLivros] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  const fetchLivros = async () => {
    try {
      const response = await fetch("http://localhost:5014/api/Livros/ExibirAcervo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.status === 404) {
        throw new Error('Nenhum livro encontrado!');
      }

      else if (!response.ok){
        throw new Error('Erro ao buscar livros');
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
        const resp = await fetchLivros();
        setLivros(resp);
        setLoading(false);
      } catch (ex) {
        console.error(ex)
        setError('Erro ao carregar livros');
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exibir acervo</Text>

      {/* Indicador de carregamento */}
      {loading && <ActivityIndicator size="large" color="#007BFF" />}

      {/* Mensagem de erro */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Lista de livros */}
      {!loading && !error && (
        <FlatList
          data={livros}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.livroItem}>
              <View style={styles.livroHeader}>
                <Text style={styles.livroId}>ID {item.id}</Text>
                <Text style={styles.livroQuantidade}>Qtd: {item.quantidadeDisponivel}</Text>
              </View>
              <Text style={styles.livroTitulo}>{item.tituloLivro}</Text>
              <Text style={styles.livroAutor}>Autor: {item.autorLivro}</Text> 
              <Text style={styles.livroAutor}>Lançamento: {item.anoLancamento}</Text> 
            </View>
          )}
        />
      )}

      <Pressable style={styles.voltarButton} onPress={() => router.push('/Pagina livros/livros')}>
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
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  livroItem: {
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
  livroQuantidade: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff', 
    backgroundColor: '#000000', 
    paddingVertical: 2, 
    paddingHorizontal: 8, 
    borderRadius: 8, 
    overflow: 'hidden', 
  },
  livroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 5,
  },
  livroId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff', 
    backgroundColor: '#000000', 
    paddingVertical: 2, 
    paddingHorizontal: 8, 
    borderRadius: 8, 
    overflow: 'hidden', 
    fontSize: 15,
    fontWeight: '500',
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
