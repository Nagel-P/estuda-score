// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importações das páginas da Instituição/Admin
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import PainelAluno from './pages/PainelAluno/PainelAluno'; // Painel Administrativo de Alunos
import TelaInclusaoNotas from './pages/TelaInclusaoNotas/TelaInclusaoNotas';
import TelaInicial from './pages/TelaInicial/TelaInicial'; // Tela Inicial da Instituição
import TelaListaAlunos from './pages/TelaListaAlunos/TelaListaAlunos';
import MasterAdmin from './pages/TelaMasterAdmin/MasterAdmin';

// Importações das novas páginas específicas do Aluno
import TelaInicialAluno from './pages/TelaInicialAluno/TelaInicialAluno'; // Nova tela inicial para o aluno
import NotasEPontosAluno from './pages/NotasEPontosAluno/NotasEPontosAluno'; // Nova tela para notas e pontos do aluno
import HistoricoTransacoesAluno from './pages/HistoricoTransacoesAluno/HistoricoTransacoesAluno'; // Nova tela para histórico de transações do aluno
import Recompensas from './pages/Recompensas/Recompensas'; // A nova tela de Recompensas

function App() {
  return (
    <Routes>
      {/* Rotas da Instituição/Admin */}
      <Route path="/" element={<TelaInicial />} /> {/* Rota padrão para a Instituição (Tela de Login/Cadastro) */}
      <Route path="/login" element={<Login />} /> {/* Rota de login (pode ser a mesma que a tela inicial se o login estiver nela) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/painel-aluno" element={<PainelAluno />} /> {/* Painel Administrativo de Alunos */}
      <Route path="/inclusao-notas" element={<TelaInclusaoNotas />} />
      <Route path="/lista-alunos" element={<TelaListaAlunos />} />
      <Route path="/master-admin" element={<MasterAdmin />} />

      {/* Rotas específicas do Aluno */}
      <Route path="/aluno" element={<TelaInicialAluno />} /> {/* Tela inicial para o aluno logado */}
      <Route path="/aluno/notas-e-pontos" element={<NotasEPontosAluno />} /> {/* Tela para o aluno ver suas notas e pontos */}
      <Route path="/aluno/historico-transacoes" element={<HistoricoTransacoesAluno />} /> {/* Tela para o aluno ver seu histórico de resgates */}
      <Route path="/recompensas" element={<Recompensas />} /> {/* Tela de Recompensas para o aluno (rota simples para facilitar o acesso) */}
    </Routes>
  );
}

export default App;