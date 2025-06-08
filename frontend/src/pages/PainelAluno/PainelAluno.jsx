import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PainelAluno.css';
import HistoricoTransacoesModal from '../../components/HistoricoTransacoes/HistoricoTransacoesModal';
import RegistrarAlunoModal from '../../components/RegistrarAluno/RegistrarAlunoModal';
import EditarAlunoModal from '../../components/EditorAluno/EditarAlunoModal';
import axios from 'axios';

function PainelAluno() {
  const [alunos, setAlunos] = useState([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [mostrarRegistroAluno, setMostrarRegistroAluno] = useState(false);
  const [mostrarEditarAluno, setMostrarEditarAluno] = useState(false);
  const [alunoParaEditar, setAlunoParaEditar] = useState(null);
  const [historicoAlunoId, setHistoricoAlunoId] = useState(null);

  // Buscar alunos ao carregar a tela
  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:5210/api/Users');
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  const abrirHistorico = (alunoId) => {
    setHistoricoAlunoId(alunoId);
    setMostrarHistorico(true);
  };

  const fecharHistorico = () => {
    setMostrarHistorico(false);
    setHistoricoAlunoId(null);
  };

  const abrirRegistroAluno = () => {
    setMostrarRegistroAluno(true);
  };

  const fecharRegistroAluno = (alunoCriado) => {
    setMostrarRegistroAluno(false);
    if (alunoCriado) carregarAlunos(); // Recarrega a lista após criar novo aluno
  };

  const abrirEditarAluno = (aluno) => {
    setAlunoParaEditar(aluno);
    setMostrarEditarAluno(true);
  };

  const fecharEditarAluno = (atualizado) => {
    setMostrarEditarAluno(false);
    setAlunoParaEditar(null);
    if (atualizado) carregarAlunos(); // Recarrega a lista após edição
  };

  return (
    <div className="painel-aluno">
      <header className="cabecalho-pagina">
        <h1>Painel de Controle de Aluno</h1>
        <Link to="/" className="botao-voltar">Voltar ao Home</Link>
      </header>

      <main className="conteudo-principal">
        <section className="resumo-aluno">
          <h2>Informações dos Alunos</h2>
          {alunos.length === 0 ? (
            <p>Nenhum aluno cadastrado.</p>
          ) : (
            alunos.map((aluno) => (
              <div key={aluno.id} className="aluno-item">
                <p>Nome: {aluno.username}</p>
                <p>Email: {aluno.email}</p>

                <button onClick={() => abrirEditarAluno(aluno)} className="botao-secundario">Editar</button>
                <button onClick={() => abrirHistorico(aluno.id)} className="botao-secundario">Ver Histórico Completo</button>
              </div>
            ))
          )}
        </section>

        <section className="acoes-rapidas">
          <h2>Ações Rápidas</h2>
          <button onClick={abrirRegistroAluno} className="botao-principal">Registrar Novo Aluno</button>
        </section>
      </main>

      <footer className="rodape-pagina">
        <p>© 2025 EducaScore - Painel do Aluno</p>
      </footer>

      {mostrarHistorico && historicoAlunoId && (
        <HistoricoTransacoesModal alunoId={historicoAlunoId} onClose={fecharHistorico} />
      )}

      {mostrarRegistroAluno && (
        <RegistrarAlunoModal onClose={fecharRegistroAluno} />
      )}

      {mostrarEditarAluno && alunoParaEditar && (
        <EditarAlunoModal
          aluno={alunoParaEditar}
          onClose={fecharEditarAluno}
        />
      )}
    </div>
  );
}

export default PainelAluno;
