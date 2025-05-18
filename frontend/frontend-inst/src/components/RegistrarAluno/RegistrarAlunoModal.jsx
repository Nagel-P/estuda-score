import React, { useState } from 'react';
import './RegistrarAlunoModal.css';

function RegistrarAlunoModal({ onClose }) {
  const [registroSucesso, setRegistroSucesso] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você colocaria a lógica para enviar os dados para o backend
    console.log('Formulário de registro enviado!');
    // Supondo que o registro foi bem-sucedido (você ajustará isso com a resposta do backend)
    setRegistroSucesso(true);
  };

  const handleFecharAposSucesso = () => {
    setRegistroSucesso(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>{registroSucesso ? 'Registro Concluído' : 'Registrar Novo Aluno'}</h2>
          <button
            onClick={registroSucesso ? handleFecharAposSucesso : onClose}
            className="modal-close-button"
          >
            Fechar
          </button>
        </header>
        <main className="modal-body">
          {registroSucesso ? (
            <div className="mensagem-sucesso">
              <p>Aluno registrado com sucesso!</p>
              <button onClick={handleFecharAposSucesso} className="botao-principal">
                OK
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="registro-aluno-form">
              {/* Campos do formulário */}
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="turma">Turma:</label>
                <input type="text" id="turma" name="turma" />
              </div>
              {/* Fim dos campos do formulário */}
              <button type="submit" className="botao-principal">Registrar</button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

export default RegistrarAlunoModal;