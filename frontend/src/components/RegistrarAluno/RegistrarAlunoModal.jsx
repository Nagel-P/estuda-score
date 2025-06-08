import React, { use, useState } from 'react';
import './RegistrarAlunoModal.css';
import axios from 'axios';

function RegistrarAlunoModal({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [pontos, setPontos] = useState('');
  const [registroSucesso, setRegistroSucesso] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novoAluno = {
      username,
      email,
      password,
      pontos: parseInt(pontos) || 0,
      role: "aluno"
    };

    try {
      await axios.post('http://localhost:5210/api/Users', novoAluno);
      setRegistroSucesso(true);
    } catch (error) {
      console.error('Erro ao registrar aluno:', error);
      alert('Erro ao registrar aluno. Verifique os dados e tente novamente.');
    }
  };

  const handleFecharAposSucesso = () => {
    setRegistroSucesso(false);
    onClose(true); // indica sucesso para atualizar lista no painel principal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>{registroSucesso ? 'Registro Concluído' : 'Registrar Novo Aluno'}</h2>
          <button
            onClick={registroSucesso ? handleFecharAposSucesso : () => onClose(false)}
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
                <label htmlFor="role">Função:</label>
                <input
                  type="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <button type="submit" className="botao-principal">Registrar</button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

export default RegistrarAlunoModal;
