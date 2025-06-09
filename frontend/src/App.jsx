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
import MasterAdmin from './pages/TelaMasterAdmin/MasterAdmin';
import RecompensasAdmin from './pages/TelaRecompensasAdmin/RecompensasAdmin';
import ListaInstituicoes from './pages/TelaListaInstituicoes/ListaInstituicoes';
import TelaAluno from './pages/TelaAluno/TelaAluno';
import Recompensas from './pages/Recompensas/Recompensas';

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
      <Route path="/master-admin" element={<MasterAdmin />} />
      <Route path="/recompensas-admin" element={<RecompensasAdmin />} />
      <Route path="/lista-instituicoes" element={<ListaInstituicoes />} />
      <Route path="/aluno" element={<TelaAluno />} />
      <Route path="/recompensas" element={<Recompensas />} />
    </Routes>
  );
}

export default App;
