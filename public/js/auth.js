// Função de login
async function login(email, senha) {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (response.ok) {
    // Salvar token no localStorage
    localStorage.setItem("token", data.token);
    window.location.href = "../public/html/index.html"; // redirecionar
  } else {
    alert(data.error || "Erro ao fazer login");
  }
}

// Função de logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "../public/html/logins.html";
}

// Função para pegar token atual
function getToken() {
  return localStorage.getItem("token");
}
