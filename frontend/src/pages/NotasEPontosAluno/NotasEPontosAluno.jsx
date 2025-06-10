// src/pages/NotasEPontosAluno/NotasEPontosAluno.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotasEPontosAluno.css';

function NotasEPontosAluno() {
  return (
    <div className="container-aluno-generico"> {}
      <header className="cabecalho-pagina-aluno"> {}
        <h1>Minhas Notas e Pontos</h1>
        <Link to="/aluno" className="botao-voltar-aluno">Voltar</Link> {}
      </header>

      <main className="conteudo-principal-aluno"> {}
        <section className="secao-info-aluno">
          <h2>Saldo Atual</h2>
          <p>Pontos Acumulados: **[AQUI VAI O VALOR DOS PONTOS]**</p>
          <p>Média de Notas: **[AQUI VAI A MÉDIA DE NOTAS]**</p>
          {/* Futuramente: tabela de notas detalhada */}
        </section>
      </main>

      <footer className="rodape-pagina-aluno">
        <p>© 2025 EstudaScore - Notas e Pontos</p>
      </footer>
    </div>
  );
}

export default NotasEPontosAluno;