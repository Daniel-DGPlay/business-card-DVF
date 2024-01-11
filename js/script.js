var btns = document.querySelectorAll(".btn");

for (var i = 0; i < btns.length; i++) {
  btns[i].onmousemove = function(e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

    this.style.setProperty("--eixoX", x + "px");
    this.style.setProperty("--eixoY", y + "px");
  };
}

  // Função para calcular a idade
  function calcularIdade(dataNascimento) {
    const dataNasc = new Date(dataNascimento);
    const dataAtual = new Date();

    const diff = Math.abs(dataAtual - dataNasc);
    const idade = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    return idade;
  }

  // Atualiza a idade na página
  document.getElementById("age").innerText = calcularIdade("1997-01-12");