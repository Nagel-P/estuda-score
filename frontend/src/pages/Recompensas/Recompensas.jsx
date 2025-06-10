// src/pages/Recompensas/Recompensas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'; // Importar Link para o botão Voltar
import "./Recompensas.css";

export default function Recompensas() {
  const [recompensas, setRecompensas] = useState([]);
  const [pontosUsuario, setPontosUsuario] = useState(0);
  const [historico, setHistorico] = useState([]);
  const userId = 1; // Substituir pelo ID real do usuário logado - Atenção: isso deve vir do login!

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
      // Atualiza os pontos e o histórico após o resgate
      setPontosUsuario(prevPontos => prevPontos - pontosNecessarios); // Melhor forma de atualizar estado baseado no anterior
      const resHistorico = await axios.get(`http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`);
      setHistorico(resHistorico.data);
    } catch (error) {
      alert("Erro ao resgatar recompensa.");
      console.error("Erro ao resgatar:", error); 
    }
  }

  return (
    <div className="recompensas-page-container"> {/* Novo container principal para alinhar com outras páginas */}
      <header className="recompensas-header"> {/* Cabeçalho com título e botão voltar */}
        <h1>RECOMPENSAS DISPONÍVEIS</h1>
        <Link to="/aluno" className="botao-voltar">Voltar</Link> {/* Botão Voltar para a TelaInicialAluno */}
      </header>

      <main className="recompensas-main-content"> {/* Conteúdo principal */}
        <section className="pontos-section">
          <h2>Seus pontos: <span className="pontos-valor">{pontosUsuario}</span></h2>
        </section>

        <section className="recompensas-list-section">
          <h2>Escolha sua Recompensa</h2>
          <div className="recompensas-grid"> {/* Mudança de nome para grid para refletir o layout */}
            {recompensas.length === 0 ? (
                <p className="no-rewards-message">Nenhuma recompensa disponível no momento.</p>
            ) : (
                recompensas.map((r) => (
                    <div className="recompensa-card" key={r.id}>
                        {/* Se r.imagem existir e for um caminho URL, use aqui */}
                        {/* <img src={r.imagem} alt={r.nome} className="recompensa-card-image" /> */}
                        <h3>{r.nome}</h3> {/* Alterado para h3 */}
                        <p className="recompensa-descricao">{r.descricao}</p>
                        <p className="recompensa-pontos">Pontos: <span>{r.pontosNecessarios}</span></p>
                        <button
                            onClick={() => resgatarRecompensa(r.id, r.pontosNecessarios)}
                            className="botao-resgatar"
                            disabled={pontosUsuario < r.pontosNecessarios} // Desabilita se não tiver pontos
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

      <footer className="recompensas-footer"> {/* Rodapé da página */}
        <p>© 2025 EstudaScore - Recompensas</p>
      </footer>
    </div>
  );
}