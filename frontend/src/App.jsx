import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importações das páginas
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import PainelAluno from './pages/PainelAluno/PainelAluno';
import Rewards from './pages/Rewards/Rewards';
import TelaInclusaoNotas from './pages/TelaInclusaoNotas/TelaInclusaoNotas';
import TelaInicial from './pages/TelaInicial/TelaInicial';
import TelaListaAlunos from './pages/TelaListaAlunos/TelaListaAlunos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/painel-aluno" element={<PainelAluno />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/inclusao-notas" element={<TelaInclusaoNotas />} />
      <Route path="/lista-alunos" element={<TelaListaAlunos />} />
    </Routes>
  );
}

export default App;
