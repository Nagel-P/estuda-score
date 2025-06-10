import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TelaListaAlunos.css';

function TelaListaAlunos() {
  const navigate = useNavigate();
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroMatricula, setFiltroMatricula] = useState('');
  const [filtroPontos, setFiltroPontos] = useState('');
  const [alunos, setAlunos] = useState([]);

useEffect(() => {
  async function fetchAlunos() {
    try {
      const response = await fetch('http://localhost:5210/api/Users');
      if (!response.ok) throw new Error('Erro ao buscar alunos');
      const data = await response.json();

      // ⚠️ Filtro flexível por variações de "aluno"
      const somenteAlunos = data.filter(user => {
        const role = (user.role || '').toLowerCase();
        return ['aluno', 'alunos', 'aluna', 'alunas'].includes(role);
      });

      console.log('Alunos filtrados:', somenteAlunos);
      setAlunos(somenteAlunos);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  }

  fetchAlunos();
}, []);


  const alunosFiltrados = alunos.filter(aluno => {
    const nome = (aluno.nome || '').toLowerCase();
    const matricula = (aluno.matricula || '').toString();
    const pontos = (aluno.pontos || '').toString();

    return (
      nome.includes(filtroNome.toLowerCase()) &&
      matricula.includes(filtroMatricula) &&
      pontos.includes(filtroPontos)
    );
  });

  const handleSelecionarAluno = (aluno) => {
    alert(`Aluno(a) ${aluno.username} selecionado(a)!`);
  };

  const handleAbrirPainelAluno = (aluno) => {
    navigate('/painel-aluno', { state: { alunoMatricula: aluno.matricula } });
  };

  return (
    <div className="tela-lista-alunos">
      <h1>Lista de Alunos</h1>
      <Link to="/instituicao" className="botao-voltar">
        Voltar ao Home
      </Link>

      <main className="conteudo-lista-alunos">
        <section className="filtro-pesquisa">
          <h2>Filtro de Pesquisa</h2>
          <div className="filtro-grid">
            <div className="filtro-item">
              <label htmlFor="filtroNome">Nome:</label>
              <input
                type="text"
                id="filtroNome"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
                placeholder="Pesquisar por nome..."
              />
            </div>
            <div className="filtro-item">
              <label htmlFor="filtroMatricula">Matrícula:</label>
              <input
                type="text"
                id="filtroMatricula"
                value={filtroMatricula}
                onChange={(e) => setFiltroMatricula(e.target.value)}
                placeholder="Pesquisar por matrícula..."
              />
            </div>
            <div className="filtro-item">
              <label htmlFor="filtroPontos">Pontos:</label>
              <input
                type="text"
                id="filtroPontos"
                value={filtroPontos}
                onChange={(e) => setFiltroPontos(e.target.value)}
                placeholder="Pesquisar por pontos..."
              />
            </div>
          </div>
        </section>

        <section className="tabela-lista-alunos">
          <h2>Alunos Registrados</h2>
          {alunosFiltrados.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Pontos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map((aluno) => (
                  <tr key={aluno.matricula || aluno.id || Math.random()}>
                    <td>{aluno.id || 'N/A'}</td>
                    <td>{aluno.username || 'N/A'}</td>
                    <td>{aluno.email || 'N/A'}</td>
                    <td>{aluno.pontos || '0'}</td>
                    <td className="acoes-botoes">
                      <button
                        className="botao-selecionar-aluno"
                        onClick={() => handleSelecionarAluno(aluno)}
                      >
                        Selecionar
                      </button>
                      <button
                        className="botao-abrir-painel"
                        onClick={() => handleAbrirPainelAluno(aluno)}
                      >
                        Abrir Painel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-results">Nenhum aluno encontrado com os filtros aplicados.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default TelaListaAlunos;
