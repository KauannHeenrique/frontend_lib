import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';  

export default function ConsultarLivros() {
  const [tituloLivro, setTituloLivro] = useState('');
  const [autorLivro, setAutorLivro] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [livros, setLivros] = useState([]);  
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const buscarLivros = async () => {
    if (!tituloLivro && !autorLivro) {
      setErro('Por favor, preencha ao menos um campo de pesquisa');
      setModalVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5014/api/Livros/BuscarLivroPor?nomeLivro=${tituloLivro}&nomeAutor=${autorLivro}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`Oi`);
      console.log(response);

      if (response.status === 404){
        setErro('Nenhum livro encontrado');
        setModalVisible(true);
      }
      
      if (response.ok) {
        const dadosLivros = await response.json();
        setLivros(dadosLivros); 
      } 
    } catch (error) {
      setErro('Ocorreu um erro ao buscar livros');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.livroItem}>
      <Text style={styles.livroTitulo}>{item.tituloLivro}</Text>
      <Text style={styles.livroAutor}>{item.autorLivro}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Procurar livro</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={tituloLivro}
        onChangeText={setTituloLivro}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={autorLivro}
        onChangeText={setAutorLivro}
      />

      <Pressable style={styles.button} onPress={buscarLivros} disabled={loading}>
        <Text style={styles.textoBotao}>{loading ? 'Buscando...' : 'Buscar Livro'}</Text>
      </Pressable>

      <Pressable style={styles.voltarButton} onPress={() => router.back()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </Pressable>

      <FlatList
        data={livros}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listaLivros}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{erro}</Text>

            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  button: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  voltarButton: {
    padding: 15,
    backgroundColor: '#FF5733',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    zIndex: 1, 
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listaLivros: {
    width: '100%',
    marginTop: 20,
  },
  livroItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  livroTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  livroAutor: {
    fontSize: 16,
    color: '#777',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
