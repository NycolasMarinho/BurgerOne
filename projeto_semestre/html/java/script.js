let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const listaCarrinho = document.getElementById('cart-items');
const totalCarrinho = document.getElementById('total-valor');
const botaoCheckout = document.getElementById('checkout-button');

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('cart-item');

    li.innerHTML = `
      <span>${item.nome} - ${formatarPreco(item.preco)} x ${item.quantidade}</span>
      <button onclick="removerItem(${index})">Remover</button>
    `;

    listaCarrinho.appendChild(li);
    total += item.preco * item.quantidade;
  });

  totalCarrinho.textContent = formatarPreco(total);
}

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

botaoCheckout.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  alert('Compra finalizada com sucesso!');
  carrinho = [];
  localStorage.removeItem('carrinho');
  atualizarCarrinho();
});

atualizarCarrinho();