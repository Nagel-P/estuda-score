import React from 'react';
import './HistoricoTransacoesModal.css'; 

function HistoricoTransacoesModal({ onClose }) {
  console.log('HistoricoTransacoesModal renderizado');
  
  const historico = [
    { id: 1, data: '2025-05-18', descricao: '...', valor: 'R$ 100,00' },
    { id: 2, data: '2025-04-20', descricao: '...', valor: 'R$ 50,00' },
    
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
          {historico.map(transacao => (
            <div key={transacao.id} className="transacao-item">
              <p>Data: {transacao.data}</p>
              <p>Descrição: {transacao.descricao}</p>
              <p>Valor: {transacao.valor}</p>
            </div>
          ))}
          {historico.length === 0 && <p>Nenhuma transação encontrada.</p>}
        </main>
      </div>
    </div>
  );
}

export default HistoricoTransacoesModal;