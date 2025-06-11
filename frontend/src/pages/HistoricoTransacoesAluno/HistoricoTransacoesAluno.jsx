import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import './HistoricoTransacoesAluno.css';

function HistoricoTransacoesAluno() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setErro('Usuário não está autenticado.');
      setLoading(false);
      return;
    }

    let decoded = null;
    try {
      decoded = jwt_decode(token);
      console.log('Token decodificado:', decoded);
    } catch (err) {
      setErro('Erro ao decodificar token.');
      setLoading(false);
      return;
    }

    const userId = decoded?.sub || decoded?.id || decoded?.userId;

    if (!userId) {
      setErro('ID do usuário não encontrado no token.');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setTransacoes(response.data);
        setLoading(false);
      })
      .catch(() => {
        setErro('Erro ao carregar histórico de transações.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-aluno-generico">
      <header className="cabecalho-pagina-aluno">
        <h1>Meu Histórico de Transações</h1>
        <Link to="/aluno" className="botao-voltar-aluno">Voltar</Link>
      </header>

      <main className="conteudo-principal-aluno">
        <section className="secao-info-aluno">
          <h2>Transações Recentes</h2>

          {loading && <p>Carregando histórico...</p>}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          {!loading && !erro && transacoes.length === 0 && (
            <p>Você ainda não realizou nenhuma troca de pontos.</p>
          )}

          {!loading && !erro && transacoes.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Recompensa</th>
                  <th>Pontos Gastos</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map(t => (
                  <tr key={t.id}>
                    <td>{new Date(t.dataGeracao).toLocaleDateString()}</td>
                    <td>{t.nomeRecompensa}</td>
                    <td>{t.pontosGastos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      <footer className="rodape-pagina-aluno">
        <p>© 2025 EstudaScore - Histórico de Transações</p>
      </footer>
    </div>
  );
}

export default HistoricoTransacoesAluno;
