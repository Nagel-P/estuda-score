import React, { useState } from 'react';
import './EditarAlunoModal.css';
import axios from 'axios';

function EditarAlunoModal({ aluno, onClose, onClose: fecharModal, onClose: atualizarLista }) {
  const [username, setUsername] = useState(aluno ? aluno.username : '');
  const [email, setEmail] = useState(aluno ? aluno.email : '');
  const [pontos, setPontos] = useState(aluno ? aluno.pontos : '');
  const [edicaoSucesso, setEdicaoSucesso] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const alunoAtualizado = {
        id: aluno.id,
        username,
        email,
        pontos: parseInt(pontos),
        password: aluno.password, // necessário se o backend exigir a senha
        role: aluno.role // manter se o backend usar
      };

      await axios.put(`http://localhost:5210/api/Users/${aluno.id}`, alunoAtualizado);

      setEdicaoSucesso(true);
    } catch (error) {
      console.error('Erro ao editar aluno:', error);
    }
  };

  const handleFecharAposSucesso = () => {
    setEdicaoSucesso(false);
    fecharModal(true); // sinaliza que o aluno foi editado com sucesso
  };

  if (!aluno) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Erro</h2>
          <p>Nenhum aluno selecionado para editar.</p>
          <button onClick={() => fecharModal(false)} className="modal-close-button">
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>{edicaoSucesso ? 'Aluno Editado' : 'Editar Aluno'}</h2>
          <button
            onClick={edicaoSucesso ? handleFecharAposSucesso : () => fecharModal(false)}
            className="modal-close-button"
          >
            Fechar
          </button>
        </header>
        <main className="modal-body">
          {edicaoSucesso ? (
            <div className="mensagem-sucesso">
              <p>Aluno editado com sucesso!</p>
              <button onClick={handleFecharAposSucesso} className="botao-principal">
                OK
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="editar-aluno-form">
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pontos">Pontos:</label>
                <input
                  type="number"
                  id="pontos"
                  value={pontos}
                  onChange={(e) => setPontos(e.target.value)}
                />
              </div>
              <button type="submit" className="botao-principal">Salvar Edições</button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

export default EditarAlunoModal;
