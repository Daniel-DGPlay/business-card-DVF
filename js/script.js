var btns = document.querySelectorAll(".btn");

for (var i = 0; i < btns.length; i++) {
  btns[i].onmousemove = function(e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

    this.style.setProperty("--eixoX", x + "px");
    this.style.setProperty("--eixoY", y + "px");
  };
}