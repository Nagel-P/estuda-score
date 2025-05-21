// src/pages/TelaInclusaoNotas/TelaInclusaoNotas.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TelaInclusaoNotas.css';

function TelaInclusaoNotas() {
  const [alunosComNotas, setAlunosComNotas] = useState([
    { matricula: '2023001', nome: 'Ana Souza', curso: 'Engenharia Civil', notas: { avaliacao1: '', avaliacao2: '', avaliacao3: '', notaFinal: '' } },
    { matricula: '2022115', nome: 'Pedro Alves', curso: 'Ciência da Computação', notas: { avaliacao1: '', avaliacao2: '', avaliacao3: '', notaFinal: '' } },
    { matricula: '2024022', nome: 'Mariana Oliveira', curso: 'Medicina', notas: { avaliacao1: '', avaliacao2: '', avaliacao3: '', notaFinal: '' } },
    // Adicione mais alunos conforme necessário
  ]);

  const handleNotaChange = (matricula, avaliacao, value) => {
    setAlunosComNotas(prevAlunos =>
      prevAlunos.map(aluno =>
        aluno.matricula === matricula ?
          { ...aluno, notas: { ...aluno.notas, [avaliacao]: value } } :
          aluno
      )
    );
  };

  const calcularNotaFinal = (notas) => {
    const { avaliacao1, avaliacao2, avaliacao3 } = notas;
    const n1 = parseFloat(avaliacao1) || 0;
    const n2 = parseFloat(avaliacao2) || 0;
    const n3 = parseFloat(avaliacao3) || 0;
    return ((n1 + n2 + n3) / 3).toFixed(2);
  };

  const handleCalcularNotaFinal = (matricula) => {
    setAlunosComNotas(prevAlunos =>
      prevAlunos.map(aluno =>
        aluno.matricula === matricula ?
          { ...aluno, notas: { ...aluno.notas, notaFinal: calcularNotaFinal(aluno.notas) } } :
          aluno
      )
    );
  };

  const handleSalvarNotas = () => {
    console.log('Notas a serem salvas:', alunosComNotas);
    // Aqui você implementaria a lógica para enviar os dados para o servidor
  };

  return (
    <div className="tela-inclusao-notas">
      <h1>Inserir Notas</h1>
      <Link to="/" className="botao-voltar">
        Voltar ao Home
      </Link>
      <main className="conteudo-principal">
        <section className="tabela-notas">
          <h2>Notas dos Alunos</h2>
          <table>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Curso</th>
                <th>Avaliação 1</th>
                <th>Avaliação 2</th>
                <th>Avaliação 3</th>
                <th>Nota Final</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosComNotas.map(aluno => (
                <tr key={aluno.matricula}>
                  <td>{aluno.matricula}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.curso}</td>
                  <td>
                    <input
                      type="number"
                      value={aluno.notas.avaliacao1}
                      onChange={(e) => handleNotaChange(aluno.matricula, 'avaliacao1', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={aluno.notas.avaliacao2}
                      onChange={(e) => handleNotaChange(aluno.matricula, 'avaliacao2', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={aluno.notas.avaliacao3}
                      onChange={(e) => handleNotaChange(aluno.matricula, 'avaliacao3', e.target.value)}
                    />
                  </td>
                  <td>{aluno.notas.notaFinal}</td>
                  <td>
                    <button onClick={() => handleCalcularNotaFinal(aluno.matricula)}>Calcular Final</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <button onClick={handleSalvarNotas} className="botao-salvar">Salvar Notas</button>
      </main>
    </div>
  );
}

export default TelaInclusaoNotas;