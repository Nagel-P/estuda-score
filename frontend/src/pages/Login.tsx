import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post('http://localhost:5145/api/users/login', {
        username,
        password,
      });

      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      alert('Login realizado com sucesso!');
      window.location.href = '/dashboard';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErro(error.response?.data || 'Erro ao fazer login');
      } else {
        setErro('Erro desconhecido');
      }
    }
  };

  return (
    <div style={backgroundStyles}>
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
              placeholder="Digite seu usuário"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Digite sua senha"
            />
          </div>
          {erro && <p style={styles.error}>{erro}</p>}
          <button type="submit" style={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

const backgroundStyles: React.CSSProperties = {
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url("/background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const styles = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 30,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderRadius: 8,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  } as React.CSSProperties,
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  inputGroup: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  label: {
    marginBottom: 6,
    fontWeight: 600,
    color: '#555',
  } as React.CSSProperties,
  input: {
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    outlineColor: '#007bff',
    transition: 'border-color 0.3s',
  } as React.CSSProperties,
  error: {
    color: 'red',
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  } as React.CSSProperties,
  button: {
    padding: '12px 20px',
    fontSize: 16,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  } as React.CSSProperties,
};

export default Login;
