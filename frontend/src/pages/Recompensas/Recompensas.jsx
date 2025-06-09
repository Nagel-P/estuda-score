import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recompensas.css";

export default function Recompensas() {
  const [recompensas, setRecompensas] = useState([]);
  const [pontosUsuario, setPontosUsuario] = useState(0);
  const [historico, setHistorico] = useState([]);
  const userId = 1; // Substituir pelo ID real do usuário logado

  useEffect(() => {
    async function fetchData() {
      try {
        const resRecompensas = await axios.get("http://localhost:5210/api/RecompensasControllers");
        setRecompensas(resRecompensas.data);

        const resUsuario = await axios.get(`http://localhost:5210/api/Users/${userId}`);
        setPontosUsuario(resUsuario.data.pontos);

        const resHistorico = await axios.get(`http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`);
        setHistorico(resHistorico.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }
    fetchData();
  }, []);

  async function resgatarRecompensa(recompensaId, pontosNecessarios) {
    if (pontosUsuario < pontosNecessarios) {
      alert("Pontos insuficientes.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5210/api/Troca/gerar-vale?userId=${userId}&recompensaId=${recompensaId}`);
      alert("Recompensa resgatada com sucesso!");
      setPontosUsuario(pontosUsuario - pontosNecessarios);
      const resHistorico = await axios.get(`http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`);
      setHistorico(resHistorico.data);
    } catch (error) {
      alert("Erro ao resgatar recompensa.");
    }
  }

  return (
    <div className="recompensas-container">
      <h1>RECOMPENSAS DISPONÍVEIS</h1>
      <p>Seus pontos: {pontosUsuario}</p>
      <div className="recompensas-row">
        {recompensas.map((r) => (
          <div className="recompensa-card" key={r.id}>
            <h2>{r.nome}</h2>
            <p>{r.descricao}</p>
            <p>Pontos: {r.pontosNecessarios}</p>
            <button onClick={() => resgatarRecompensa(r.id, r.pontosNecessarios)}>Resgatar</button>
          </div>
        ))}
      </div>
      <div className="historico-recompensas">
      <h2>Histórico de Resgates</h2>
      <ul>
        {historico.length === 0 ? (
          <li>Nenhum resgate ainda.</li>
        ) : (
          historico.map((h) => (
            <li key={h.id}>
              {h.nomeRecompensa} - {h.pontosGastos} pontos - {new Date(h.dataGeracao).toLocaleString("pt-BR")}
            </li>
          ))
        )}
      </ul>
      </div>
    </div>
  );
}
