import React from 'react';
import { Link } from 'react-router-dom'; // Certifique-se de que Link está importado
import './MasterAdmin.css';

function MasterAdmin() {
  return (
    <div className="tela-inicial">
      <header className="cabecalho">
        <h1><span className="nome-principal">EstudaScore</span></h1>
        <p className="subtitulo-cabecalho">Painel de Controle do Master Admin</p>
      </header>

      <div className="menu-container">
        <Link to="/painel-aluno" className="botao-principal">Painel de Controle de Aluno</Link>
        <Link to="/lista-instituicoes" className="botao-principal">Painel de Controle de Instituições</Link> 
        <Link to="/recompensas-admin" className="botao-principal">Painel de Controle de Recompensas</Link>
      </div>

      <footer className="rodape">
        © 2025 EstudaScore - Todos os direitos reservados
      </footer>
    </div>
  );
}

export default MasterAdmin;