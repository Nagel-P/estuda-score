import React from 'react';
import { Link } from 'react-router-dom';
import './TelaInicial.css';

function TelaInicial() {
  return (
    <div className="tela-inicial">
      <header className="cabecalho">
        <h1><span className="nome-principal">Educatech</span></h1>
        <p className="subtitulo-cabecalho">Painel de Controle da Instituição</p>
      </header>

      <div className="menu-container">
        <Link to="/painel-aluno" className="botao-principal">Painel de Controle de Aluno</Link>
        <Link to="/lista-alunos" className="botao-principal">Lista de Alunos</Link>
        <Link to="/inclusao-notas" className="botao-principal">Inclusão de Notas</Link>
      </div>

      <footer className="rodape">
        © 2025 Educatech - Todos os direitos reservados
      </footer>
    </div>
  );
}

export default TelaInicial;