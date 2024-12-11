import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdicionarLivro() {
  const [tituloLivro, setTituloLivro] = useState('');
  const [autorLivro, setAutorLivro] = useState('');
  const [anoLancamento, setAnoLancamento] = useState('');
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [livroExistente, setLivroExistente] = useState(false);
  const [idLivroCadastrado, setIdLivroCadastrado] = useState(null);

  const router = useRouter();

  const verificarLivro = async (titulo, autor) => {
    setErro('');
    setSucesso('');
    setLivroExistente(false);

    try {
      const response = await fetch(`http://localhost:5014/api/Livros/BuscarLivroPor?nomeLivro=${titulo}&nomeAutor=${autor}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const livros = await response.json();
        return livros;
      } else {
        return null;
      }
    } catch (error) {
      setErro('Ocorreu um erro ao verificar se o livro já existe');
      setModalVisible(true);
      return null;
    }
  };

  const AdicionarLivro = async () => {
    setErro('');
    setSucesso('');
    setLivroExistente(false);

    if (!tituloLivro || !autorLivro || !anoLancamento || !quantidadeDisponivel) {
      setErro('Por favor, preencha todos os campos');
      setModalVisible(true);
      return;
    }

    setLoading(true);

    const livrosExistentes = await verificarLivro(tituloLivro, autorLivro);

    if (livrosExistentes) {
      const livroExistente = livrosExistentes.find(
        (livro) => livro.tituloLivro === tituloLivro && livro.autorLivro === autorLivro
      );

      if (livroExistente) {
        setLivroExistente(true);
        setSucesso('Este livro já está cadastrado no acervo');
        setModalVisible(true);
        setLoading(false);
        return;
      } else {
        const livro = {
          id: 0, 
          tituloLivro: tituloLivro,
          autorLivro: autorLivro,
          anoLancamento: parseInt(anoLancamento),
          quantidadeDisponivel: parseInt(quantidadeDisponivel),
        };

        try {
          const response = await fetch('http://localhost:5014/api/Livros/AdicionarLivro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
          });

          if (response.ok) {
            const data = await response.json();
            setIdLivroCadastrado(data.id); 
            setSucesso(`Livro cadastrado com sucesso! ID: ${data.id}`);
            setModalVisible(true);
            setTituloLivro('');
            setAutorLivro('');
            setAnoLancamento('');
            setQuantidadeDisponivel('');
          } else {
            setErro('Ocorreu um erro ao adicionar o livro');
            setModalVisible(true);
          }
        } catch (error) {
          setErro('Ocorreu um erro ao adicionar o livro');
          setModalVisible(true);
        } finally {
          setLoading(false);
        }
      }
    } else {
      const livro = {
        id: 0, 
        tituloLivro: tituloLivro,
        autorLivro: autorLivro,
        anoLancamento: parseInt(anoLancamento),
        quantidadeDisponivel: parseInt(quantidadeDisponivel),
      };

      try {
        const response = await fetch('http://localhost:5014/api/Livros/AdicionarLivro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(livro),
        });

        if (response.ok) {
          const data = await response.json();
          setIdLivroCadastrado(data.id); 
          setSucesso(`Livro cadastrado com sucesso! ID: ${data.id}`);
          setModalVisible(true);
          setTituloLivro('');
          setAutorLivro('');
          setAnoLancamento('');
          setQuantidadeDisponivel('');
        } else {
          setErro('Ocorreu um erro ao adicionar o livro');
          setModalVisible(true);
        }
      } catch (error) {
        setErro('Ocorreu um erro ao adicionar o livro');
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVoltar = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar livro</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Ano de Lançamento"
        keyboardType="numeric"
        value={anoLancamento}
        onChangeText={setAnoLancamento}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidadeDisponivel}
        onChangeText={setQuantidadeDisponivel}
      />

      <Pressable style={styles.button} onPress={AdicionarLivro} disabled={loading}>
        <Text style={styles.textoBotao}>{loading ? 'Adicionando...' : 'Adicionar livro'}</Text>
      </Pressable>

      <Pressable style={styles.voltarButton} onPress={handleVoltar}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </Pressable>

      <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => {
          setModalVisible(false);
          setErro('');
          setSucesso('');
          setLivroExistente(false);
          }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {livroExistente ? 'Este livro já está cadastrado no acervo' : erro || sucesso}
            </Text>

            <View style={styles.modalButtonContainer}>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </Pressable>

              {livroExistente && (
                <Pressable
                  style={[styles.modalButton, styles.updateButton]}
                  onPress={() => {
                    setModalVisible(false);
                    router.push('Pagina livros/atualizarLivro');
                  }}
                >
                  <Text style={styles.modalButtonText}>Atualizar Livro</Text>
                </Pressable>
              )}
            </View>
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
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    maxWidth: 400, 
    alignItems: 'center',  
    justifyContent: 'center', 
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
    alignItems: "center",
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: '100%', 
    marginTop: 10, 
  },
  updateButton: {
    backgroundColor: 'green',
    marginLeft: 10, 
  },
});
