document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  const response = await fetch('/logins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  });

  const resultado = await response.json();

  if (response.ok) {
    // Armazena as informações do usuário no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify({ email }));

    // Redireciona para a página de perfil
    window.location.href = 'perfil.html';
  } else {
    alert(resultado.mensagem || 'Erro ao fazer login.');
  }
});
