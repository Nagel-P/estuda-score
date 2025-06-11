// src/pages/TelaInicialAluno/TelaInicialAluno.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TelaInicialAluno.css';

function TelaInicialAluno() {
  const nomeAluno = "João Silva"; // Substituirá pelo nome do aluno logado real

  return (
    <div className="tela-inicial-aluno">
      <header className="cabecalho-aluno">
        <h1>Bem-vindo(a), <span className="nome-principal-aluno">{nomeAluno}</span>!</h1>
        <p className="subtitulo-cabecalho-aluno">Seu Painel de Aluno EstudaScore</p>
      </header>

      <div className="menu-container-aluno">
        {/* Links para as novas telas */}
        <Link to="/aluno/notas-e-pontos" className="botao-aluno-principal">
          Ver Minhas Notas e Pontos
        </Link>
        <Link to="/aluno/historico-transacoes" className="botao-aluno-principal">
          Ver Meu Histórico de Transações
        </Link>
        <Link to="/Recompensas" className="botao-aluno-principal">
          Ver Recompensas Disponíveis
        </Link>
        {/* Adicione outros links relevantes para o aluno aqui, se houver */}
        <Link to="/" className="botao-aluno-secundario">
          Sair
        </Link>
      </div>

      <footer className="rodape-aluno">
        <p>© 2025 EstudaScore - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default TelaInicialAluno;