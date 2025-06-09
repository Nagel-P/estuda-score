import React, { useState, useEffect } from 'react';
import './ListaInstituicoes.css';

function TelaListaInstituicoes() {
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');
  const [instituicoes, setInstituicoes] = useState([]);
  const [instituicaoSelecionada, setInstituicaoSelecionada] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    async function fetchInstituicoes() {
      try {
        const response = await fetch('http://localhost:5210/api/Users');
        if (!response.ok) throw new Error('Erro ao buscar instituições');
        const data = await response.json();

        const somenteInstituicoes = data.filter(user => {
          const role = (user.role || '').toLowerCase();
          return ['instituicao', 'instituições', 'instituicoes'].includes(role);
        });

        setInstituicoes(somenteInstituicoes);
      } catch (error) {
        console.error('Erro ao carregar instituições:', error);
      }
    }

    fetchInstituicoes();
  }, []);

  const instituicoesFiltradas = instituicoes.filter(inst => {
    const nome = (inst.username || '').toLowerCase();
    const email = (inst.email || '').toLowerCase();
    return (
      nome.includes(filtroNome.toLowerCase()) &&
      email.includes(filtroEmail.toLowerCase())
    );
  });

  const handleAbrirModal = (inst) => {
    setInstituicaoSelecionada(inst);
    setFormData({ username: inst.username || '', email: inst.email || '' });
  };

  const handleFecharModal = () => {
    setInstituicaoSelecionada(null);
  };

  const handleSalvar = async () => {
    try {
      const response = await fetch(`http://localhost:5210/api/Users/${instituicaoSelecionada.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...instituicaoSelecionada, ...formData })
      });

      if (!response.ok) throw new Error('Erro ao atualizar instituição');

      const atualizada = { ...instituicaoSelecionada, ...formData };
      const novaLista = instituicoes.map(inst =>
        inst.id === atualizada.id ? atualizada : inst
      );

      setInstituicoes(novaLista);
      handleFecharModal();
    } catch (error) {
      console.error('Erro ao salvar instituição:', error);
    }
  };

  return (
    <div className="tela-lista-instituicoes">
      <h1>Lista de Instituições</h1>

      <main className="conteudo-lista-instituicoes">
        <section className="filtro-pesquisa-instituicao">
          <h2>Filtro de Pesquisa</h2>
          <div className="filtro-grid-instituicao">
            <div className="filtro-item-instituicao">
              <label htmlFor="filtroNome">Nome:</label>
              <input
                type="text"
                id="filtroNome"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
                placeholder="Pesquisar por nome..."
              />
            </div>
            <div className="filtro-item-instituicao">
              <label htmlFor="filtroEmail">Email:</label>
              <input
                type="text"
                id="filtroEmail"
                value={filtroEmail}
                onChange={(e) => setFiltroEmail(e.target.value)}
                placeholder="Pesquisar por email..."
              />
            </div>
          </div>
        </section>

        <section className="tabela-lista-instituicoes">
          <h2>Instituições Registradas</h2>
          {instituicoesFiltradas.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {instituicoesFiltradas.map((inst) => (
                  <tr key={inst.id}>
                    <td>{inst.id}</td>
                    <td>{inst.username}</td>
                    <td>{inst.email}</td>
                    <td>
                      <button
                        className="botao-editar-instituicao"
                        onClick={() => handleAbrirModal(inst)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-results-instituicao">Nenhuma instituição encontrada.</p>
          )}
        </section>
      </main>

      {instituicaoSelecionada && (
        <div className="modal-editar-inst-overlay">
          <div className="modal-editar-inst-container">
            <div className="modal-editar-inst-header">
              <h2>Editar Instituição</h2>
              <button className="btn-fechar-inst" onClick={handleFecharModal}>×</button>
            </div>
            <div className="modal-editar-inst-body">
              <label>Nome:</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <button className="btn-salvar-inst" onClick={handleSalvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TelaListaInstituicoes;
