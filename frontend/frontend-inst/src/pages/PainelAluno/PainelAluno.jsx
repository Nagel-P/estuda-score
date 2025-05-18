// src/pages/PainelAluno/PainelAluno.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PainelAluno.css';

// Importações de componentes de modal
import HistoricoTransacoesModal from '../../components/HistoricoTransacoes/HistoricoTransacoesModal';
import RegistrarAlunoModal from '../../components/RegistrarAluno/RegistrarAlunoModal';
import EditarAlunoModal from '../../components/EditorAluno/EditarAlunoModal';
import '../../components/EditorAluno/EditarAlunoModal.css';

function PainelAluno() {
  // Estados para controlar a visibilidade dos modais
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [mostrarRegistroAluno, setMostrarRegistroAluno] = useState(false);
  const [mostrarEditarAluno, setMostrarEditarAluno] = useState(false);

  // Estado para armazenar o aluno a ser editado
  const [alunoParaEditar, setAlunoParaEditar] = useState(null);

  // Array de alunos de exemplo (substituir pela busca do backend)
  const alunos = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', turma: 'A' },
    { id: 2, nome: 'Maria Souza', email: 'maria.souza@email.com', turma: 'B' },
  ];

  // Funções para abrir e fechar modais
  const abrirHistorico = () => {
    setMostrarHistorico(true);
  };

  const fecharHistorico = () => {
    setMostrarHistorico(false);
  };

  const abrirRegistroAluno = () => {
    setMostrarRegistroAluno(true);
  };

  const fecharRegistroAluno = () => {
    setMostrarRegistroAluno(false);
  };

  const abrirEditarAluno = (aluno) => {
    console.log('Aluno para editar:', aluno);
    setAlunoParaEditar(aluno);
    setMostrarEditarAluno(true);
    console.log('Mostrar Editar Aluno:', mostrarEditarAluno);
  };

  const fecharEditarAluno = () => {
    setMostrarEditarAluno(false);
    setAlunoParaEditar(null);
  };

  // Função para lidar com a edição do aluno (a ser implementada)
  const handleAlunoEditado = (alunoEditado) => {
    console.log('Aluno editado no PainelAluno:', alunoEditado);
    fecharEditarAluno();
    // Aqui você chamaria a função para atualizar a lista de alunos
  };

  return (
    <div className="painel-aluno">
      <header className="cabecalho-pagina">
        <h1>Painel de Controle de Aluno</h1>
        <Link to="/" className="botao-voltar">
          Voltar ao Home
        </Link>
      </header>
      <main className="conteudo-principal">
        <section className="resumo-aluno">
          <h2>Informações do Aluno</h2>
          {alunos.map((aluno) => (
            <div key={aluno.id} className="aluno-item">
              <p>Nome: {aluno.nome}</p>
              <button onClick={() => abrirEditarAluno(aluno)} className="botao-secundario">
                Editar
              </button>
            </div>
          ))}
        </section>

        <section className="resumo-transacoes">
          <h2>Resumo de Transações</h2>
          <p>Última Transação: [Data e Descrição]</p>
          <p>Saldo Atual: [Valor]</p>
          <button onClick={abrirHistorico} className="botao-link">
            Ver Histórico Completo
          </button>
        </section>

        <section className="acoes-rapidas">
          <h2>Ações Rápidas</h2>
          <button onClick={abrirRegistroAluno} className="botao-principal">
            Registrar Novo Aluno
          </button>
          {/* O botão "Editar Aluno" agora está na lista de alunos */}
        </section>
      </main>
      <footer className="rodape-pagina">
        <p>© 2025 EducaScore - Painel do Aluno</p>
      </footer>

      {/* Renderização condicional dos modais */}
      {mostrarHistorico && <HistoricoTransacoesModal onClose={fecharHistorico} />}
      {mostrarRegistroAluno && <RegistrarAlunoModal onClose={fecharRegistroAluno} />}
      {mostrarEditarAluno && alunoParaEditar && (
        <EditarAlunoModal
          aluno={alunoParaEditar}
          onClose={fecharEditarAluno}
          onAlunoEditado={handleAlunoEditado}
        />
      )}
    </div>
  );
}

export default PainelAluno;