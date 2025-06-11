
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotasEPontosAluno.css';

function NotasEPontosAluno() {
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pontosAcumulados, setPontosAcumulados] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotasEPontos = async () => {
            try {
                setNotas([]);
                setPontosAcumulados(0);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setError("Não foi possível carregar os dados. Verifique a conexão com o servidor.");
            } finally {
                setLoading(false);
            }
        };

        const initialLoadTimer = setTimeout(() => {
            fetchNotasEPontos();
        }, 500);

        return () => clearTimeout(initialLoadTimer);
    }, []);

    return (
        <div className="container-aluno-generico">
            <div className="cabecalho-pagina-aluno">
                <h1>Notas e Pontos</h1>
                <Link to="/painel-aluno" className="botao-voltar-aluno">
                    Voltar
                </Link>
            </div>

            <div className="conteudo-principal-aluno">
                <section className="secao-info-aluno">
                    <h2>Seu Saldo de Pontos</h2>
                    {loading ? (
                        <p>Carregando pontos...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <p>Pontos Acumulados: <span style={{ color: '#ffeb3b', fontWeight: 'bold' }}>{pontosAcumulados}</span></p>
                    )}
                </section>

                <section className="tabela-notas-container">
                    <h2>Notas por Disciplina</h2>
                    {loading ? (
                        <p style={{ textAlign: 'center', color: '#ccc' }}>Carregando notas...</p>
                    ) : error ? (
                        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
                    ) : notas.length > 0 ? (
                        <table className="tabela-notas">
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                    <th style={{ textAlign: 'center' }}>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notas.map((nota) => (
                                    <tr key={nota.id || nota.disciplina}>
                                        <td>{nota.disciplina}</td>
                                        <td style={{ textAlign: 'center' }}>{nota.valor ? nota.valor.toFixed(1) : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-notes-message">Sem notas registradas.</p>
                    )}
                </section>
            </div>

            <footer className="rodape-pagina-aluno">
                EstudaScore © 2024
            </footer>
        </div>
    );
}

export default NotasEPontosAluno;