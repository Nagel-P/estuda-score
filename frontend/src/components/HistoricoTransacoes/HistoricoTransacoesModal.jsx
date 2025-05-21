import React from 'react';
import './HistoricoTransacoesModal.css';

function HistoricoTransacoesModal({ onClose }) {
  const historico = [
    { id: 1, data: '2025-05-18', descricao: 'Mensalidade Maio', valor: 'R$ 100,00' },
    { id: 2, data: '2025-04-20', descricao: 'Livro Didático', valor: 'R$ 50,00' },
    { id: 3, data: '2025-03-25', descricao: 'Passeio Escolar', valor: 'R$ 80,00' },
    // ... mais transações
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Histórico Completo de Transações</h2>
          <button onClick={onClose} className="modal-close-button">
            Fechar
          </button>
        </header>
        <main className="modal-body">
          <ul className="historico-lista">
            {historico.map(transacao => (
              <li key={transacao.id} className="transacao-item">
                <div className="transacao-detalhes">
                  <span className="transacao-data">{transacao.data}</span>
                  <span className="transacao-valor">{transacao.valor}</span>
                </div>
                {transacao.descricao && <p className="transacao-descricao">{transacao.descricao}</p>}
              </li>
            ))}
            {historico.length === 0 && <p>Nenhuma transação encontrada.</p>}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default HistoricoTransacoesModal;