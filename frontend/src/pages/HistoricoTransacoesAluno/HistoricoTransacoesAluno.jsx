
import React from 'react';
import { Link } from 'react-router-dom';
import './HistoricoTransacoesAluno.css'; 

function HistoricoTransacoesAluno() {
  return (
    <div className="container-aluno-generico"> {}
      <header className="cabecalho-pagina-aluno"> {}
        <h1>Meu Histórico de Transações</h1>
        <Link to="/aluno" className="botao-voltar-aluno">Voltar</Link> {}
      </header>

      <main className="conteudo-principal-aluno"> {/* Reutiliza classe para conteúdo */}
        <section className="secao-info-aluno">
          <h2>Transações Recentes</h2>
          <p>Aqui será listado o histórico de itens resgatados, datas e pontos gastos.</p>
          {/* Futuramente: tabela de histórico de transações */}
        </section>
      </main>

      <footer className="rodape-pagina-aluno">
        <p>© 2025 EstudaScore - Histórico de Transações</p>
      </footer>
    </div>
  );
}

export default HistoricoTransacoesAluno;