import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdicionarLivro() {
  const [nomeLocatario, setNomeLocatario] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userExistente, setUserExistente] = useState(false);
  const [idUserCadastrado, setIdUserCadastrado] = useState(null);

  const router = useRouter();

  const verificarUser = async (nomeLocatario, anoNascimento) => {
    try {
      const response = await fetch(`http://localhost:5014/api/Locatarios/BuscarLocatarioPor?nomeLocatario=${nomeLocatario}&anoNascimento=${anoNascimento}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const locatarios = await response.json();
        return locatarios;
      } else {
        return null;
      }
    } catch (error) {
      setErro('Ocorreu um erro ao verificar se o locatário já existe');
      setModalVisible(true);
      return null;
    }
  };

  const AdicionarLocatario = async () => {
    if (!nomeLocatario || !anoNascimento) {
      setErro('Por favor, preencha todos os campos');
      setModalVisible(true);
      return;
    }

    setLoading(true);

    const userExistente = await verificarUser(nomeLocatario, anoNascimento);

    if (userExistente) {
      const locatarioExistente = userExistente.find(
        (locatario) => locatario.nomeLocatario === nomeLocatario && locatario.anoNascimento === anoNascimento
      );
    
      if (userExistente) {
        setUserExistente(true);
        setErro('Já existe um locatário com esse nome e ano de nascimento. Por favor, adicione mais informações, como um sobrenome.');
        setModalVisible(true);
        setLoading(false);
        return;
      } else {
        const locatario = {
          id: 0, 
          nomeLocatario: nomeLocatario,
          anoNascimento: parseInt(anoNascimento),
        };


        try {
          const response = await fetch('http://localhost:5014/api/Locatarios/AdicionarLocatario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(locatario),
          });

          if (response.ok) {
            const data = await response.json();
            setIdUserCadastrado(data.id); 
            setSucesso(`Locatário cadastrado com sucesso! ID: ${data.id}`);
            setModalVisible(true);
            setNomeLocatario('');
            setAnoNascimento('');
          } else {
            setErro('Ocorreu um erro ao cadastrar o locatário!');
            setModalVisible(true);
          }
        } catch (error) {
          setErro('Ocorreu um erro ao cadastrar o locatário!');
          setModalVisible(true);
        } finally {
          setLoading(false);
        }
      }
    } else {
      const locatario = {
        id: 0, 
        nomeLocatario: nomeLocatario,
        anoNascimento: parseInt(anoNascimento),
      };

      try {
        const response = await fetch('http://localhost:5014/api/Locatarios/AdicionarLocatario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(locatario),
        });

        if (response.ok) {
          const data = await response.json();
          setIdUserCadastrado(data.id);  
          setSucesso(`Locatario cadastrado com sucesso! ID: ${data.id}`);
          setModalVisible(true);
          setNomeLocatario('');
          setAnoNascimento('');
        } else {
          setErro('Ocorreu um erro ao adicionar o locatário!');
          setModalVisible(true);
        }
      } catch (error) {
        setErro('Ocorreu um erro ao adicionar o locatário!');
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
      <Text style={styles.header}>Adicionar locatário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nomeLocatario}
        onChangeText={setNomeLocatario}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano de nascimento"
        value={anoNascimento}
        onChangeText={setAnoNascimento}
      />

      <Pressable style={styles.button} onPress={AdicionarLocatario} disabled={loading}>
        <Text style={styles.textoBotao}>{loading ? 'Adicionando...' : 'Adicionar locatário'}</Text>
      </Pressable>

      <Pressable style={styles.voltarButton} onPress={handleVoltar}>
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
            <Text style={styles.modalText}>
              {userExistente ? 'Este locatário já possui cadastrado. ' : erro || sucesso}
            </Text>

            <View style={styles.modalButtonContainer}>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </Pressable>

              {userExistente && (
                <Pressable
                  style={[styles.modalButton, styles.updateButton]}
                  onPress={() => {
                    setModalVisible(false);
                    router.push('Pagina locatarios/atualizarLocatario');
                  }}
                >
                  <Text style={styles.modalButtonText}>Atualizar cadastro</Text>
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
