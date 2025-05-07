const trabalhos = [
  { cargo: "Garçom", valor: 100 },
  { cargo: "Garçom", valor: 500 },
  { cargo: "Designer Gráfico", valor: 180 },
  { cargo: "Designer Gráfico", valor: 150 }
];

function renderizarTrabalhos() {
  const lista = document.getElementById("job-list");
  lista.innerHTML = "";
  trabalhos.forEach(trabalho => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <div>${trabalho.cargo}</div>
      <span>${trabalho.valor} Reais</span>
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
    alert("Por favor, preencha os dois campos corretamente.");
  }
}

// Renderiza ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarTrabalhos);
