// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TelaInicial from './pages/TelaInicial/TelaInicial';
import PainelAluno from './pages/PainelAluno/PainelAluno';
import TelaInclusaoNotas from './pages/TelaInclusaoNotas/TelaInclusaoNotas';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/painel-aluno" element={<PainelAluno />} />
        <Route path="/inclusao-notas" element={<TelaInclusaoNotas />} /> {/* Verifique esta linha */}
      </Routes>
    </div>
  );
}

export default App;