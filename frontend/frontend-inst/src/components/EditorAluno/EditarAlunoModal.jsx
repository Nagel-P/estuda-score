// src/components/EditarAluno/EditarAlunoModal.jsx
import React, { useState } from 'react';
import './EditarAlunoModal.css';

function EditarAlunoModal({ aluno, onClose, onAlunoEditado }) {
  const [nome, setNome] = useState(aluno ? aluno.nome : '');
  const [email, setEmail] = useState(aluno ? aluno.email : '');
  const [turma, setTurma] = useState(aluno ? aluno.turma : '');
  const [edicaoSucesso, setEdicaoSucesso] = useState(false);

  const handleChangeNome = (event) => {
    setNome(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeTurma = (event) => {
    setTurma(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulação da lógica de edição (você substituirá pela sua lógica real)
    const alunoEditado = { id: aluno.id, nome, email, turma };
    console.log('Aluno editado:', alunoEditado);
    setEdicaoSucesso(true);
    // Opcional: Chamar uma função para atualizar a lista de alunos no componente pai
    if (onAlunoEditado) {
      onAlunoEditado(alunoEditado);
    }
    // Opcional: Fechar o modal após alguns segundos
    // setTimeout(onClose, 2000);
  };

  const handleFecharAposSucesso = () => {
    setEdicaoSucesso(false);
    onClose();
  };

  if (!aluno) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Erro</h2>
          <p>Nenhum aluno selecionado para editar.</p>
          <button onClick={onClose} className="modal-close-button">
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
            onClick={edicaoSucesso ? handleFecharAposSucesso : onClose}
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
                <input type="text" id="nome" name="nome" value={nome} onChange={handleChangeNome} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleChangeEmail} required />
              </div>
              <div className="form-group">
                <label htmlFor="turma">Turma:</label>
                <input type="text" id="turma" name="turma" value={turma} onChange={handleChangeTurma} />
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