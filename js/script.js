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

    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();

    // Verifica se o aniversário já ocorreu neste ano
    if (
      dataAtual.getMonth() < dataNasc.getMonth() ||
      (dataAtual.getMonth() === dataNasc.getMonth() &&
        dataAtual.getDate() < dataNasc.getDate())
    ) {
      idade--;
    }

    return idade;
  }

  // Atualiza a idade na página
  document.getElementById("age").innerText = calcularIdade("1997-01-12");

  // Atualiza o ano na página
  document.getElementById("ano").innerText = new Date().getFullYear();