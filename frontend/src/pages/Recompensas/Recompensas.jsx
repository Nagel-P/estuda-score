// src/pages/Recompensas/Recompensas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'; // Adicionando useNavigate
import "./Recompensas.css";

export default function Recompensas() {
  const [recompensas, setRecompensas] = useState([]);
  const [pontosUsuario, setPontosUsuario] = useState(0);
  const [historico, setHistorico] = useState([]);
  const navigate = useNavigate();

  // Pega o ID do usuário logado do localStorage
  const userId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    // Se não houver ID de usuário, redireciona para login
    if (!userId) {
      alert("Usuário não identificado. Faça login novamente.");
      navigate("/login");
      return;
    }

    async function fetchData() {
      try {
        // Puxa recompensas disponíveis
        const resRecompensas = await axios.get("http://localhost:5210/api/RecompensasControllers");
        setRecompensas(resRecompensas.data);

        // Puxa os pontos do usuário logado
        const resUsuario = await axios.get(`http://localhost:5210/api/Users/${userId}`);
        setPontosUsuario(resUsuario.data.pontos ?? 0); // fallback para 0 caso seja undefined

        // Puxa o histórico de resgates do usuário
        const resHistorico = await axios.get(`http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`);
        setHistorico(resHistorico.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }

    fetchData();
  }, [userId, navigate]);

  // Função para resgatar recompensa
  async function resgatarRecompensa(recompensaId, pontosNecessarios) {
    if (pontosUsuario < pontosNecessarios) {
      alert("Pontos insuficientes.");
      return;
    }

    try {
      await axios.post(`http://localhost:5210/api/Troca/gerar-vale?userId=${userId}&recompensaId=${recompensaId}`);
      alert("Recompensa resgatada com sucesso!");

      // Atualiza os pontos e o histórico
      setPontosUsuario(prev => prev - pontosNecessarios);

      const resHistorico = await axios.get(`http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`);
      setHistorico(resHistorico.data);
    } catch (error) {
      alert("Erro ao resgatar recompensa.");
      console.error("Erro ao resgatar:", error);
    }
  }

  return (
    <div className="recompensas-page-container">
      <header className="recompensas-header">
        <h1>RECOMPENSAS DISPONÍVEIS</h1>
        <Link to="/aluno" className="botao-voltar">Voltar</Link>
      </header>

      <main className="recompensas-main-content">
        <section className="pontos-section">
          <h2>Seus pontos: <span className="pontos-valor">{pontosUsuario}</span></h2>
        </section>

        <section className="recompensas-list-section">
          <h2>Escolha sua Recompensa</h2>
          <div className="recompensas-grid">
            {recompensas.length === 0 ? (
              <p className="no-rewards-message">Nenhuma recompensa disponível no momento.</p>
            ) : (
              recompensas.map((r) => (
                <div className="recompensa-card" key={r.id}>
                  <h3>{r.nome}</h3>
                  <p className="recompensa-descricao">{r.descricao}</p>
                  <p className="recompensa-pontos">Pontos: <span>{r.pontosNecessarios}</span></p>
                  <button
                    onClick={() => resgatarRecompensa(r.id, r.pontosNecessarios)}
                    className="botao-resgatar"
                    disabled={pontosUsuario < r.pontosNecessarios}
                  >
                    Resgatar
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="historico-recompensas-section">
          <h2>Histórico de Resgates</h2>
          {historico.length === 0 ? (
            <p className="no-history-message">Nenhum resgate ainda.</p>
          ) : (
            <ul className="historico-list">
              {historico.map((h) => (
                <li key={h.id} className="historico-item">
                  <span>{h.nomeRecompensa}</span> - 
                  <span className="historico-pontos">{h.pontosGastos} pontos</span> - 
                  <span className="historico-data">{new Date(h.dataGeracao).toLocaleString("pt-BR")}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="recompensas-footer">
        <p>© 2025 EstudaScore - Recompensas</p>
      </footer>
    </div>
  );
}
