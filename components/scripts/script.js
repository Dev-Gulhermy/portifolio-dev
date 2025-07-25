
function enviarWhats(event) {
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const telefone = '5583988311137';

    const texto = `Olá! Me chamo ${nome}, ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);

    const url = `https://wa.me/${telefone}?text=${msgFormatada}`;

    /*console.log(url); usado para mostrar um valor na tela/console/propmt. Geralmente usado para identificar erros pois mostrar diretamente no console/prompt*/

    window.open(url, '_blanck');
    event.preventDefault()
}

const formulario = document.querySelector(".formulario-contato");
const brilhos = document.querySelectorAll(".brilho-seguidor");

if (window.innerWidth > 768) {
    formulario.addEventListener("mousemove", (e) => {
        const rect = formulario.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        brilhos.forEach((brilho) => {
            brilho.style.left = `${x}px`;
            brilho.style.top = `${y}px`;
            brilho.style.opacity = 1;
        });
    });

    formulario.addEventListener("mouseleave", () => {
        brilhos.forEach((brilho) => {
            brilho.style.opacity = 0;
        });
    });
} else {
    // Dispositivos móveis: centraliza e deixa visível
    brilhos.forEach((brilho) => {
        brilho.style.opacity = 1;
    });
}