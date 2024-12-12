import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdicionarEmprestimo() {
  const [idLivro, setIdLivro] = useState('');
  const [idLocatario, setIdLocatario] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const adicionarEmprestimo = async () => {
    setErro('');
    setSucesso('');
    setModalVisible(false);
  
    if (!idLivro || !idLocatario) {
      setErro('Por favor, preencha todos os campos');
      setModalVisible(true);
      return;
    }
  
  
    setLoading(true);
  
    const emprestimo = {
      LivroId: parseInt(idLivro),
      LocatarioId: parseInt(idLocatario),
    };
  
    try {
      const response = await fetch('http://localhost:5014/api/Emprestimos/AdicionarEmprestimo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emprestimo),
      });

      console.log(response);

      console.log(`livro${idLivro}`);
      console.log(`livro${idLocatario}`);
  
      if (response.ok) {
        setSucesso('Empréstimo realizado com sucesso!');
        setIdLivro('');
        setIdLocatario('');
      } 

      if (response.status === 404) {
        setErro('ID do livro ou locatário inválido!');
      } 

      if (response.status === 400){
        setErro('Não há exemplares disponíveis!');
      }
      
    } catch (error) {
      setErro('Erro de conexão: não foi possível comunicar-se com o servidor.');
    } finally {
      setModalVisible(true); 
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar empréstimo</Text>

      <TextInput
        style={styles.input}
        placeholder="ID do livro"
        keyboardType="numeric"
        value={idLivro}
        onChangeText={setIdLivro}
      />
      <TextInput
        style={styles.input}
        placeholder="ID do locatário"
        keyboardType="numeric"
        value={idLocatario}
        onChangeText={setIdLocatario}
      />

      <Pressable style={styles.button} onPress={adicionarEmprestimo} disabled={loading}>
        <Text style={styles.textoBotao}>{loading ? 'Adicionando...' : 'Adicionar empréstimo'}</Text>
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
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});