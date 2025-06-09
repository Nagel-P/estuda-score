import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecompensasAdmin.css';
import axios from 'axios';

function RecompensasAdmin() {
  const [recompensas, setRecompensas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novaRecompensa, setNovaRecompensa] = useState({ nome: '', descricao: '', pontosNecessarios: '' });
  const [registroSucesso, setRegistroSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erroCadastro, setErroCadastro] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    carregarRecompensas();
  }, []);

  const carregarRecompensas = async () => {
    try {
      const response = await axios.get('http://localhost:5210/api/RecompensasControllers');
      setRecompensas(response.data);
    } catch (error) {
      console.error('Erro ao carregar recompensas:', error);
    }
  };

  const handleRegistrarOuEditar = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErroCadastro('');

    const payload = {
      nome: novaRecompensa.nome.trim(),
      descricao: novaRecompensa.descricao.trim(),
      pontosNecessarios: parseInt(novaRecompensa.pontosNecessarios)
    };

    try {
      if (modoEdicao && idEditando !== null) {
        await axios.put(`http://localhost:5210/api/RecompensasControllers/${idEditando}`, payload);
      } else {
        await axios.post('http://localhost:5210/api/RecompensasControllers', payload);
      }

      setRegistroSucesso(true);
      setNovaRecompensa({ nome: '', descricao: '', pontosNecessarios: '' });
      carregarRecompensas();
    } catch (error) {
      console.error('Erro ao salvar recompensa:', error);
      setErroCadastro('Erro ao salvar recompensa. Verifique os dados e tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const handleFecharFormulario = () => {
    setMostrarFormulario(false);
    setNovaRecompensa({ nome: '', descricao: '', pontosNecessarios: '' });
    setRegistroSucesso(false);
    setErroCadastro('');
    setModoEdicao(false);
    setIdEditando(null);
  };

  const handleEditar = (item) => {
    setNovaRecompensa({
      nome: item.nome,
      descricao: item.descricao,
      pontosNecessarios: item.pontosNecessarios
    });
    setIdEditando(item.id);
    setModoEdicao(true);
    setMostrarFormulario(true);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta recompensa?')) return;

    try {
      await axios.delete(`http://localhost:5210/api/RecompensasControllers/${id}`);
      carregarRecompensas();
    } catch (error) {
      console.error('Erro ao excluir recompensa:', error);
      alert('Erro ao excluir recompensa.');
    }
  };

  return (
    <div className="admin-painel-recompensas">
      <header className="admin-cabecalho-pagina">
        <h1>Painel de Controle de Recompensas</h1>
        <Link to="/master-admin" className="admin-botao-voltar">Voltar ao Home</Link>
      </header>

      <main className="admin-conteudo-principal">
        <section className="admin-resumo-recompensas">
          <h2>Lista de Recompensas</h2>
          {recompensas.length === 0 ? (
            <p>Nenhuma recompensa cadastrada.</p>
          ) : (
            recompensas.map((item) => (
              <div key={item.id} className="admin-recompensa-item">
                <p><strong>Nome:</strong> {item.nome}</p>
                <p><strong>Descrição:</strong> {item.descricao}</p>
                <p><strong>Pontos:</strong> {item.pontosNecessarios}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => handleEditar(item)} className="admin-botao-principal">Editar</button>
                  <button onClick={() => handleExcluir(item.id)} className="admin-botao-principal" style={{ backgroundColor: 'crimson' }}>Excluir</button>
                </div>
              </div>
            ))
          )}
        </section>

        <section className="admin-acoes-rapidas">
          <h2>Ações Rápidas</h2>
          <button onClick={() => setMostrarFormulario(true)} className="admin-botao-principal">
            Registrar Nova Recompensa
          </button>
        </section>
      </main>

      <footer className="admin-rodape-pagina">
        <p>© 2025 EducaScore - Painel de Recompensas</p>
      </footer>

      {mostrarFormulario && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <header className="admin-modal-header">
              <h2>{registroSucesso ? 'Sucesso!' : modoEdicao ? 'Editar Recompensa' : 'Nova Recompensa'}</h2>
              <button
                onClick={handleFecharFormulario}
                className="admin-modal-close-button"
              >
                Fechar
              </button>
            </header>
            <main className="admin-modal-body">
              {registroSucesso ? (
                <div className="admin-mensagem-sucesso">
                  <p>Recompensa salva com sucesso!</p>
                  <button onClick={handleFecharFormulario} className="admin-botao-principal">
                    OK
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegistrarOuEditar} className="admin-registro-recompensa-form">
                  <div className="admin-form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                      type="text"
                      id="nome"
                      value={novaRecompensa.nome}
                      onChange={(e) => setNovaRecompensa({ ...novaRecompensa, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <input
                      type="text"
                      id="descricao"
                      value={novaRecompensa.descricao}
                      onChange={(e) => setNovaRecompensa({ ...novaRecompensa, descricao: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="pontosNecessarios">Pontos Necessários:</label>
                    <input
                      type="number"
                      id="pontosNecessarios"
                      value={novaRecompensa.pontosNecessarios}
                      onChange={(e) => setNovaRecompensa({ ...novaRecompensa, pontosNecessarios: e.target.value })}
                      required
                    />
                  </div>
                  {erroCadastro && <p className="admin-erro">{erroCadastro}</p>}
                  <button type="submit" className="admin-botao-principal" disabled={carregando}>
                    {carregando ? 'Salvando...' : modoEdicao ? 'Salvar Alterações' : 'Registrar'}
                  </button>
                </form>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecompensasAdmin;
