import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';

  export default function DeletarLivro() {
  const [id, setLivroId] = useState('');
  const [tituloLivro, setTituloLivro] = useState('');
  const [autorLivro, setAutorLivro] = useState('');
  const [anoLancamento, setAnoLancamento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [livroInfoTemporario, setLivroInfoTemporario] = useState(null);

  const router = useRouter();

  const verificarLivro = async () => {
    setLoading(true);
    setErro('');
    setSucesso('');
  
    setTituloLivro('');
    setAutorLivro('');
    setAnoLancamento('');
    setQuantidade('');
  
    try {
      const response = await fetch(`http://localhost:5014/api/Livros/ExibirAcervo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const livros = await response.json();
        const livroEncontrado = livros.find((livro) => livro.id.toString() === id);
  
        if (livroEncontrado) {
          setLivroInfoTemporario({
            titulo: livroEncontrado.tituloLivro,
            autor: livroEncontrado.autorLivro,
            ano: livroEncontrado.anoLancamento,
            quantidade: livroEncontrado.quantidadeDisponivel,
          });
          setModalVisible(false);
        } else {
          setErro('Por favor, insira um ID válido!');
          setLivroInfoTemporario(null); 
          setModalVisible(true);
        }
      } else {
        setErro('Erro ao buscar os livros no acervo. Verifique a API.');
        setModalVisible(true);
      }
    } catch (error) {
      setErro('Ocorreu um erro ao buscar o livro. Tente novamente.')
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const deletarLivro = async () => {
    setLoading(true);
    setErro('');
    setSucesso('');

    try {
      const response = await fetch(`http://localhost:5014/api/Livros/ExcluirLivro/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSucesso('Livro deletado com sucesso!');
        setLivroInfoTemporario(null); 
        setModalVisible(true);
      } else {
        setErro('Erro ao deletar o livro. Tente novamente.');
      }
    } catch (error) {
      setErro('Ocorreu um erro ao deletar o livro.');
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

    const voltarParaInicio = () => {
    router.push('/Pagina livros/livros');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deletar livro</Text>

      <TextInput
        style={styles.input}
        placeholder="ID do Livro"
        value={id}
        onChangeText={setLivroId}
      />

      <Pressable style={styles.button} onPress={verificarLivro} disabled={loading}>
        <Text style={styles.textoBotao}>
          {loading ? 'Buscando...' : 'Buscar Livro'}
        </Text>
      </Pressable>

      {livroInfoTemporario && (
        <View style={styles.card}>
          <Text style={styles.cardText}>Título: {livroInfoTemporario.titulo}</Text>
          <Text style={styles.cardText}>Autor: {livroInfoTemporario.autor}</Text>
          <Text style={styles.cardText}>Ano de Lançamento: {livroInfoTemporario.ano}</Text>
          <Text style={styles.cardText}>Quantidade: {livroInfoTemporario.quantidade}</Text>
        </View>
      )}

      {livroInfoTemporario && (
        <>


          <Pressable style={styles.button} onPress={deletarLivro} disabled={loading}>
            <Text style={styles.textoBotao}>
              {loading ? 'Atualizando...' : 'Deletar Livro'}
            </Text>
          </Pressable>
        </>
      )}

      <Pressable style={styles.voltarButton} onPress={voltarParaInicio}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{erro || sucesso}</Text>

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
    marginBottom: 5,
  },
  voltarButton: {
    padding: 15,
    backgroundColor: '#FF5733',
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1, 
    width: '100%',
    marginTop: 5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});







