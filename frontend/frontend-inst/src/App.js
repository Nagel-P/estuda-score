import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TelaInicial from './pages/TelaInicial/TelaInicial';
import PainelAluno from './pages/PainelAluno/PainelAluno';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/painel-aluno" element={<PainelAluno />} />
    </Routes>
  );
}

export default App;