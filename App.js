import { ExpoRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function App() {
  return <ExpoRouter />;
}
// Componente Principals
function App() {
  const [livros, setLivros] = useState([]); // Estado para armazenar a lista de livros
  const [titulo, setTitulo] = useState(''); // Estado para o título do novo livro
  const [autor, setAutor] = useState(''); // Estado para o autor do novo livro

  // Função para buscar os livros do backend
  useEffect(() => {
    fetch('http://localhost:5014/api/Emprestimos') // Substitua pela URL correta do backend
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }
        return response.json();
      })
      .then(data => setLivros(data))
      .catch(error => console.error('Erro ao buscar os livros:', error));
  }, []);

  // Função para cadastrar um novo livro
  const cadastrarLivro = e => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    const novoLivro = { titulo, autor };

    fetch('http://localhost:5000/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoLivro),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar o livro');
        }
        return response.json();
      })
      .then(livro => {
        setLivros([...livros, livro]); // Adiciona o novo livro à lista existente
        setTitulo(''); // Limpa o campo do título
        setAutor(''); // Limpa o campo do autor
      })
      .catch(error => console.error('Erro ao cadastrar o livro:', error));
  };

  return (
    <div>
      <h1>Biblioteca</h1>

      {/* Formulário de Cadastro */}
      <form onSubmit={cadastrarLivro}>
        <h2>Cadastrar Livro</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={e => setAutor(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      {/* Lista de Livros */}
      <h2>Lista de Livros</h2>
      <ul>
        {livros.map(livro => (
          <li key={livro.id}>
            {livro.titulo} - {livro.autor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
