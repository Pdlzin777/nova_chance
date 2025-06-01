   async function load() {
  const response = await fetch('/logins.js');
  logins = await response.json();
  renderizarTrabalhos();
}
   
   
   document.querySelector(".login-button").addEventListener("click", function(event) {
      event.preventDefault(); // Evita o envio do formulário automaticamente
  
      let email = document.getElementById("email").value;
      let senha = document.getElementById("password").value;
      let confirmarSenha = document.getElementById("confirm-password").value;
  
      if (email === "" || senha === "" || confirmarSenha === "") {
        alert("Por favor, preencha todos os campos!");
      } else if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
      } else {
        window.location.href = "index.html"; // Redireciona para outra página
      }
    });