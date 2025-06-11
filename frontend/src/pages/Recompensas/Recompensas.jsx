import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Recompensas.css";

export default function Recompensas() {
  const [recompensas, setRecompensas] = useState([]);
  const [pontosUsuario, setPontosUsuario] = useState(0);
  const [historico, setHistorico] = useState([]);
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const token = localStorage.getItem("token");

  const userId = usuarioLogado?.id;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!token || !userId) {
      alert("Você precisa estar logado para acessar esta página.");
      return;
    }

    async function fetchData() {
      try {
        const resRecompensas = await axios.get(
          "http://localhost:5210/api/RecompensasControllers",
          axiosConfig
        );
        setRecompensas(resRecompensas.data);

        const resUsuario = await axios.get(
          `http://localhost:5210/api/Users/${userId}`,
          axiosConfig
        );
        setPontosUsuario(resUsuario.data.pontos);

        const resHistorico = await axios.get(
          `http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`,
          axiosConfig
        );
        setHistorico(resHistorico.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        alert("Erro ao carregar dados. Verifique sua conexão ou autenticação.");
      }
    }

    fetchData();
  }, [userId, token]);

  async function resgatarRecompensa(recompensaId, pontosNecessarios) {
    if (pontosUsuario < pontosNecessarios) {
      alert("Pontos insuficientes.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5210/api/Troca/gerar-vale?userId=${userId}&recompensaId=${recompensaId}`,
        {},
        axiosConfig
      );

      alert("Recompensa resgatada com sucesso!");
      setPontosUsuario((prevPontos) => prevPontos - pontosNecessarios);

      const resHistorico = await axios.get(
        `http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`,
        axiosConfig
      );
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
                  <p className="recompensa-pontos">
                    Pontos: <span>{r.pontosNecessarios}</span>
                  </p>
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
                  <span className="historico-pontos"> {h.pontosGastos} pontos</span> -
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
