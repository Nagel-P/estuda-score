import React from 'react';
import { Link } from 'react-router-dom';

function TelaAluno() {
  return (
    <div className="tela-inicial">
      <header className="cabecalho">
        <h1><span className="nome-principal">EstudaScore</span></h1>
        <p className="subtitulo-cabecalho">Painel de Controle do Aluno</p>
      </header>

      <div className="menu-container">
        <Link to="/painel-aluno" className="botao-principal">Lista de recompensas</Link>
        <Link to="/lista-alunos" className="botao-principal">Visualizar saldo de pontos</Link>
        <Link to="/inclusao-notas" className="botao-principal">Histórico de transações</Link>
      </div>

      <footer className="rodape">
        © 2025 Educatech - Todos os direitos reservados
      </footer>
    </div>
  );
}

export default TelaAluno;