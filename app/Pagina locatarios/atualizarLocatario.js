import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function atualizarLocatario() {
  const [id, setLocatarioId] = useState('');
  const [nomeLocatario, setNomeLocatario] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [userInfoTemp, setUserInfoTemp] = useState(null);

  const router = useRouter();

  const verificarLocatario = async () => {
    setLoading(true);
    setErro('');
    setSucesso('');
  
    setNomeLocatario('');
    setAnoNascimento('');
  
    try {
      const response = await fetch(`http://localhost:5014/api/Locatarios/ExibirLocatarios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const locatarios = await response.json();
        const locatarioEncontrado = locatarios.find((Locatario) => Locatario.id.toString() === id);
  
        if (locatarioEncontrado) {
          setUserInfoTemp({
            nome: locatarioEncontrado.nomeLocatario,
            ano: locatarioEncontrado.anoNascimento,
          });
          setModalVisible(false);
        } else {
          setErro('Por favor, insira um ID válido!');
          setUserInfoTemp(null); 
          setModalVisible(true);
        }
      } else {
        setErro('Erro de conexão. Tente novamente mais tarde.');
        setModalVisible(true);
      }
    } catch (error) {
      setErro('Ocorreu um erro ao buscar o locatário. Tente novamente.')
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const atualizarLocatario = async () => {
    setLoading(true);
    setErro('');
    setSucesso('');

    const novoNome = nomeLocatario || userInfoTemp?.nome;
    const novoAno = anoNascimento || userInfoTemp?.ano;

    try {
      const response = await fetch(`http://localhost:5014/api/Locatarios/AtualizarLocatario/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeLocatario: novoNome,
          anoNascimento: novoAno, 
        }),
      });

      if (response.ok) {
        setSucesso('Locatário atualizado com sucesso!');
        setUserInfoTemp({
          nome: novoNome,
          ano: novoAno,
        });
      } else {
        setErro('Erro ao atualizar o locatário. Verifique os campos e tente novamente.');
      }
    } catch (error) {
      setErro('Ocorreu um erro ao atualizar o locatário.');
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

  const voltarParaInicio = () => {
    router.push('/Pagina locatarios/locatarios');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atualizar locatário</Text>

      <TextInput
        style={styles.input}
        placeholder="ID do locatário"
        value={id}
        onChangeText={setLocatarioId}
      />

      <Pressable style={styles.button} onPress={verificarLocatario} disabled={loading}>
        <Text style={styles.textoBotao}>
          {loading ? 'Buscando...' : 'Buscar locatário'}
        </Text>
      </Pressable>

      {userInfoTemp && (
        <View style={styles.card}>
          <Text style={styles.cardText}>Nome: {userInfoTemp.nome}</Text>
          <Text style={styles.cardText}>Ano de nascimento: {userInfoTemp.ano}</Text>
        </View>
      )}

      {userInfoTemp && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Novo nome"
            value={nomeLocatario}
            onChangeText={setNomeLocatario}
          />
          <TextInput
            style={styles.input}
            placeholder="Novo Ano de nascimento"
            value={anoNascimento}
            onChangeText={setAnoNascimento}
          />

          <Pressable style={styles.button} onPress={atualizarLocatario} disabled={loading}>
            <Text style={styles.textoBotao}>
              {loading ? 'Atualizando...' : 'Salvar Alterações'}
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
    backgroundColor: '#007BFF',
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
