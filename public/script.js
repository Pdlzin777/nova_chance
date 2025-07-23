let trabalhos = [];

async function load() {
  const response = await fetch('/trabalhos');
  trabalhos = await response.json();
  renderizarTrabalhos();
}

function renderizarTrabalhos() {
  const lista = document.getElementById("job-list");
  lista.innerHTML = "";

  trabalhos.forEach((trabalho) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${trabalho.cargo}</h3>
      <p>Salário: R$ ${trabalho.valor}</p>
      <button onclick="alert('Mais informações em breve...')">Saiba mais</button>
      <button onclick="excluirTrabalho('${trabalho.id}')" style="margin-top: 10px; background-color: red;">Excluir</button>
    `;
    lista.appendChild(card);
  });
}

async function adicionarTrabalho() {
  const cargoInput = document.getElementById("cargo");
  const valorInput = document.getElementById("valor");

  const cargo = cargoInput.value.trim();
  const valor = parseFloat(valorInput.value);

  if (cargo && !isNaN(valor)) {
    const response = await fetch('/trabalhos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cargo, valor })
    });

    if (response.ok) {
      const novo = await response.json();
      trabalhos.push(novo);
      renderizarTrabalhos();
      cargoInput.value = '';
      valorInput.value = '';
    } else {
      alert('Erro ao adicionar trabalho');
    }
  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

async function excluirTrabalho(id) {
  if (!confirm("Tem certeza que deseja excluir esta vaga?")) return;

  const response = await fetch(`/trabalhos/${id}`, { method: 'DELETE' });

  if (response.status === 204) {
    trabalhos = trabalhos.filter((t) => t.id !== id);
    renderizarTrabalhos();
  } else {
    alert("Erro ao excluir trabalho");
  }
}

load();
