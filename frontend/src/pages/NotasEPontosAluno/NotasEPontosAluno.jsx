import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NotasEPontosAluno.css';
import axios from 'axios';

function NotasEPontosAluno() {
  const [pontos, setPontos] = useState(0);
  const [mediaNotas, setMediaNotas] = useState(0);
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const fetchResumoCompleto = async () => {
      try {
        const token = localStorage.getItem('token'); // token JWT

        const response = await axios.get(`http://localhost:5210/api/notas/resumo-completo`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { pontos, mediaNotas, notas } = response.data;

        setPontos(pontos);
        setMediaNotas(mediaNotas);
        setNotas(notas);
      } catch (error) {
        console.error('Erro ao buscar dados do aluno:', error);
      }
    };

    fetchResumoCompleto();
  }, []);

  return (
    <div className="container-aluno-generico">
      <header className="cabecalho-pagina-aluno">
        <h1>Minhas Notas e Pontos</h1>
        <Link to="/aluno" className="botao-voltar-aluno">Voltar</Link>
      </header>

      <main className="conteudo-principal-aluno">
        <section className="secao-info-aluno">
          <h2>Saldo Atual</h2>
          <p>Pontos Acumulados: <strong>{pontos}</strong></p>
          <p>Média de Notas: <strong>{mediaNotas.toFixed(2)}</strong></p>
        </section>

        <section className="secao-lista-notas">
          <h2>Notas Detalhadas</h2>
          {notas.length === 0 ? (
            <p>Sem notas registradas.</p>
          ) : (
            <table className="tabela-notas">
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Nota</th>
                  <th>Pontos Gerados</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                  {notas.map((nota) => (
                    <tr key={nota.id}>
                      <td>{nota.disciplina}</td>
                      <td>{nota.valorNota.toFixed(2)}</td>
                      <td>{nota.pontosGerados}</td>
                      <td>{nota.dataLancamento}</td>
                    </tr>
                  ))}
                </tbody>

            </table>
          )}
        </section>
      </main>

      <footer className="rodape-pagina-aluno">
        <p>© 2025 EstudaScore - Notas e Pontos</p>
      </footer>
    </div>
  );
}

export default NotasEPontosAluno;
