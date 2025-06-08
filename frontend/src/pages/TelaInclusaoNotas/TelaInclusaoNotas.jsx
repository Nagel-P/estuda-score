// src/pages/TelaInclusaoNotas/TelaInclusaoNotas.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TelaInclusaoNotas.css';

function TelaInclusaoNotas() {
  const [alunosComNotas, setAlunosComNotas] = useState([]);
  const [xmlFile, setXmlFile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5210/api/Users')
      .then(res => {
        const alunos = res.data
          .filter(u => u.role === 'aluno' || u.role === 'Aluno' || u.role === 'Aluna' || u.role === 'aluna') // FILTRAR SOMENTE ALUNOS
          .map(u => ({
            matricula: String(u.id),
            nome: u.username,
            curso: '',
            notas: {
              avaliacao1: '',
              avaliacao2: '',
              avaliacao3: '',
              notaFinal: ''
            }
          }));
        setAlunosComNotas(alunos);
      })
      .catch(err => console.error('Erro ao buscar alunos:', err));
  }, []);

  const handleNotaChange = (matricula, campo, valor) => {
    setAlunosComNotas(prev =>
      prev.map(aluno => {
        if (aluno.matricula === matricula) {
          if (['avaliacao1', 'avaliacao2', 'avaliacao3'].includes(campo)) {
            return {
              ...aluno,
              notas: { ...aluno.notas, [campo]: valor }
            };
          } else {
            return {
              ...aluno,
              [campo]: valor // Permitir alterar "curso"
            };
          }
        }
        return aluno;
      })
    );
  };

  const calcularNotaFinal = (notas) => {
    const n1 = parseFloat(notas.avaliacao1) || 0;
    const n2 = parseFloat(notas.avaliacao2) || 0;
    const n3 = parseFloat(notas.avaliacao3) || 0;
    return ((n1 + n2 + n3)).toFixed(2);
  };

  const handleCalcularNotaFinal = (matricula) => {
    setAlunosComNotas(prev =>
      prev.map(aluno =>
        aluno.matricula === matricula
          ? {
              ...aluno,
              notas: {
                ...aluno.notas,
                notaFinal: calcularNotaFinal(aluno.notas)
              }
            }
          : aluno
      )
    );
  };

  const handleSalvarNotas = async () => {
    const payload = alunosComNotas.map(a => ({
      userId: parseInt(a.matricula),
      disciplina: a.curso,
      valorNota: parseFloat(a.notas.notaFinal)
    }));

    console.log('Payload a enviar:', payload);

    try {
      await axios.post('http://localhost:5210/api/Notas/batch', payload);
      alert('Notas salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar notas:', error);
      alert('Erro ao salvar notas.');
    }
  };

  const handleXmlChange = (e) => {
    setXmlFile(e.target.files[0]);
  };

  const handleImportarXml = async () => {
    if (!xmlFile) return;
    const fd = new FormData();
    fd.append('xmlFile', xmlFile);
    try {
      await axios.post('http://localhost:5210/api/Notas/importar-xml', fd);
      alert('Importado com sucesso!');
      window.location.reload();
    } catch {
      alert('Erro ao importar XML');
    }
  };

  const handleExportarXml = () => {
    axios.get('http://localhost:5210/api/Notas/exportar-xml', { responseType: 'blob' })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'notas_exportadas.xml');
        document.body.appendChild(link);
        link.click();
      })
      .catch(() => alert('Erro ao exportar XML'));
  };

  return (
    <div className="tela-inclusao-notas">
      <h1>Inserir Notas</h1>
      <Link to="/" className="botao-voltar">Voltar ao Home</Link>

      <div className="import-export">
        <div className='import-export-input'>
          <input type="file" accept=".xml" onChange={handleXmlChange} />
        </div>
        <div>
          <button onClick={handleImportarXml}>Importar XML</button>
          <button onClick={handleExportarXml}>Exportar XML</button>
        </div>
      </div>

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
                  <td>
                    <input
                      type="text"
                      value={aluno.curso}
                      onChange={e => handleNotaChange(aluno.matricula, 'curso', e.target.value)}
                    />
                  </td>
                  {['avaliacao1', 'avaliacao2', 'avaliacao3'].map(av => (
                    <td key={av}>
                      <input
                        type="number"
                        value={aluno.notas[av]}
                        onChange={e => handleNotaChange(aluno.matricula, av, e.target.value)}
                      />
                    </td>
                  ))}
                  <td>{aluno.notas.notaFinal}</td>
                  <td>
                    <button onClick={() => handleCalcularNotaFinal(aluno.matricula)}>
                      Calcular Final
                    </button>
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
