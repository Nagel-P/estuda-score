import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TelaListaAlunos.css';

function TelaListaAlunos() {
  const navigate = useNavigate();
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroMatricula, setFiltroMatricula] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('');
  const [filtroTurma, setFiltroTurma] = useState('');

  const alunos = [
    { id: 1, matricula: '2023001', nome: 'João Silva', email: 'joao.silva@escola.com', curso: 'Engenharia Civil', turma: 'A' },
    { id: 2, matricula: '2023002', nome: 'Maria Souza', email: 'maria.souza@escola.com', curso: 'Ciência da Computação', turma: 'B' },
    { id: 3, matricula: '2023003', nome: 'Carlos Nogueira', email: 'carlos.nogueira@escola.com', curso: 'Administração', turma: 'A' },
    { id: 4, matricula: '2023004', nome: 'Ana Costa', email: 'ana.costa@escola.com', curso: 'Medicina', turma: 'C' },
    { id: 5, matricula: '2023005', nome: 'Pedro Almeida', email: 'pedro.almeida@escola.com', curso: 'Engenharia Civil', turma: 'B' },
    { id: 6, matricula: '2023006', nome: 'Juliana Lima', email: 'juliana.lima@escola.com', curso: 'Ciência da Computação', turma: 'A' },
  ];

  const alunosFiltrados = alunos.filter(aluno => {
    return (
      aluno.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
      aluno.matricula.includes(filtroMatricula) &&
      aluno.curso.toLowerCase().includes(filtroCurso.toLowerCase()) &&
      aluno.turma.toLowerCase().includes(filtroTurma.toLowerCase())
    );
  });

  const handleSelecionarAluno = (aluno) => {
    console.log('Aluno selecionado:', aluno.nome, aluno.matricula);
    alert(`Aluno(a) ${aluno.nome} selecionado(a)!`);
  };

  const handleAbrirPainelAluno = (aluno) => {
    console.log('Abrindo painel para:', aluno.nome, aluno.id);
    navigate('/painel-aluno', { state: { alunoId: aluno.id } });
  };

  return (
    <div className="tela-lista-alunos">
      <h1>Lista de Alunos</h1>
      <Link to="/" className="botao-voltar">
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
              <label htmlFor="filtroCurso">Curso:</label>
              <input
                type="text"
                id="filtroCurso"
                value={filtroCurso}
                onChange={(e) => setFiltroCurso(e.target.value)}
                placeholder="Pesquisar por curso..."
              />
            </div>
            <div className="filtro-item">
              <label htmlFor="filtroTurma">Turma:</label>
              <input
                type="text"
                id="filtroTurma"
                value={filtroTurma}
                onChange={(e) => setFiltroTurma(e.target.value)}
                placeholder="Pesquisar por turma..."
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
                  <th>Curso</th>
                  <th>Turma</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map(aluno => (
                  <tr key={aluno.id}>
                    <td>{aluno.matricula}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.curso}</td>
                    <td>{aluno.turma}</td>
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