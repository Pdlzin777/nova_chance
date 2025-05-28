// const trabalhos = [
//     { cargo: "Cozinheiro", valor: 1000 },
//     { cargo: "Cozinheiro", valor: 1000 },
//     { cargo: "Cozinheiro", valor: 1000 },
//     { cargo: "Cozinheiro", valor: 1000 },
//     { cargo: "Cozinheiro", valor: 1000 }
//   ];

let trabalhos = [];

async function load() {
  const response = await fetch('/trabalhos');
  trabalhos = await response.json();
  renderizarTrabalhos();
}
  
  function renderizarTrabalhos() {
    const lista = document.getElementById("job-list");
    lista.innerHTML = "";
  
    trabalhos.forEach((trabalho, index) => {
      const card = document.createElement("div");
      card.className = "job-card";
      card.innerHTML = `
        <h3>${trabalho.cargo}</h3>
        <p>salário: R$${trabalho.valor}</p>
        <button onclick="alert('Mais informações em breve...')">Saiba mais</button>
        <button onclick="excluirTrabalho(${index})" style="margin-top: 10px; background-color: red;">Excluir</button>
      `;
      lista.appendChild(card);
    });
  }
  
  function adicionarTrabalho() {
    const cargoInput = document.getElementById("cargo");
    const valorInput = document.getElementById("valor");
  
    const cargo = cargoInput.value.trim();
    const valor = parseFloat(valorInput.value);
  
    if (cargo && !isNaN(valor)) {
      trabalhos.push({ cargo, valor });
      renderizarTrabalhos();
      cargoInput.value = "";
      valorInput.value = "";
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  }
  
  function excluirTrabalho(index) {
    if (confirm("Tem certeza que deseja excluir esta vaga?")) {
      trabalhos.splice(index, 1);
      renderizarTrabalhos();
    }
  }
  
  load();
  