import React from 'react';
import { Link } from 'react-router-dom';
import './PainelAluno.css';

function PainelAluno() {
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
          <p>Nome: [Nome do Aluno]</p>
          <p>ID: [ID do Aluno]</p>
          <p>Turma: [Turma do Aluno]</p>
        </section>

        <section className="resumo-transacoes">
          <h2>Resumo de Transações</h2>
          <p>Última Transação: [Data e Descrição]</p>
          <p>Saldo Atual: [Valor]</p>
          <Link to="/historico-transacoes" className="botao-link">
            Ver Histórico Completo
          </Link>
        </section>

        <section className="acoes-rapidas">
          <h2>Ações Rápidas</h2>
          <Link to="/registrar-aluno" className="botao-principal">
            Registrar Novo Aluno
          </Link>
          <Link to="/editar-aluno" className="botao-principal">
            Editar Aluno
          </Link>
        </section>
      </main>
      <footer className="rodape-pagina">
        <p>© 2025 EducaScore - Painel do Aluno</p>
      </footer>
    </div>
  );
}

export default PainelAluno;