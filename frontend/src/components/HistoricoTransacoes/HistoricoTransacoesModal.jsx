import React, { useEffect, useState } from 'react';
import './HistoricoTransacoesModal.css';
import axios from 'axios';

function HistoricoTransacoesModal({ onClose, userId }) {
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const response = await axios.get(`http://localhost:5210/api/RecompensasControllers/historico?userId=${userId}`);
        setHistorico(response.data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setCarregando(false);
      }
    };

    if (userId) {
      buscarHistorico();
    }
  }, [userId]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Histórico de Recompensas</h2>
          <button onClick={onClose} className="modal-close-button">
            Fechar
          </button>
        </header>
        <main className="modal-body">
          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <ul className="historico-lista">
              {historico.map(troca => (
                <li key={troca.id} className="transacao-item">
                  <div className="transacao-detalhes">
                    <span className="transacao-data">
                      {new Date(troca.dataGeracao).toLocaleDateString()}
                    </span>
                    <span className="transacao-valor">{troca.pontosGastos} pontos</span>
                  </div>
                  <p className="transacao-descricao">Item: {troca.nomeRecompensa}</p>
                </li>
              ))}
              {historico.length === 0 && <p>Nenhuma troca realizada ainda.</p>}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}

export default HistoricoTransacoesModal;
