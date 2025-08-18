//Entrar em contato no whatsapp
function enviarWhats(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nomeInput = document.getElementById('nome');
    const mensagemInput = document.getElementById('mensagem');
    const erroNome = document.getElementById('erro-nome');
    const erroMensagem = document.getElementById('erro-mensagem');

    const nome = nomeInput.value.trim(); // (value) usado para acessar ou alterar o valor inserido pelo usuário ou o valor padrão do elemento. // (trim) remove espaços extras no início/fim.
    const mensagem = mensagemInput.value.trim();// (value) usado para acessar ou alterar o valor inserido pelo usuário ou o valor padrão do elemento. // (trim) remove espaços extras no início/fim.
    let valido = true;

    // Limpa mensagens e estilos anteriores
    erroNome.textContent = '';
    erroMensagem.textContent = '';
    nomeInput.classList.remove('campo-invalido');
    mensagemInput.classList.remove('campo-invalido');


    // Validação do nome
    if (nome.length <= 2) {
        erroNome.textContent = 'O nome deve ter mais de 2 letras.';
        nomeInput.classList.add('campo-invalido');
        valido = false;
    }

    // Validação da mensagem
    if (mensagem.length <= 10) {
        erroMensagem.textContent = 'A mensagem deve ter mais de 10 letras.';
        mensagemInput.classList.add('campo-invalido');
        valido = false;
    }

    if (!valido) return;

    // Enviar para WhatsApp
    const telefone = '5583988311137';
    const texto = `Olá! Me chamo ${nome}, ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);
    const url = `https://wa.me/${telefone}?text=${msgFormatada}`;

    /*console.log(url); usado para mostrar um valor na tela/console/propmt. Geralmente usado para identificar erros pois mostrar diretamente no console/prompt*/

    window.open(url, '_blanck'); //só será executado se ambos os campos forem válidos.
}

// Validação ao digitar em tempo real
document.getElementById('nome').addEventListener('input', function () {
    const erroNome = document.getElementById('erro-nome');
    if (this.value.trim().length >= 3) {
        erroNome.textContent = '';
        this.classList.remove('campo-invalido');
    } else {
        erroNome.textContent = 'O nome deve ter mais de 3 letras.';
        this.classList.add('campo-invalido');
    }
});

document.getElementById('mensagem').addEventListener('input', function () {
    const erroMensagem = document.getElementById('erro-mensagem');
    if (this.value.trim().length >= 10) {
        erroMensagem.textContent = '';
        this.classList.remove('campo-invalido');
    } else {
        erroMensagem.textContent = 'A mensagem deve ter mais de 10 letras.';
        this.classList.add('campo-invalido');
    }
});


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

// Scroll Reveal
const elementos = document.querySelectorAll('.reveal');

function mostrarElemento() {
    elementos.forEach((el) => {
        const topoElemento = el.getBoundingClientRect().top;
        const alturaJanela = window.innerHeight;
        if (topoElemento < alturaJanela - 100) {
            el.classList.add('ativo');
        }
    });
}
window.addEventListener('scroll', mostrarElemento);
mostrarElemento(); // acionar no início também

// Efeito de digitação
function typeWriter(elemento) {
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textoArray.forEach((letra, i) => {
        setTimeout(() => elemento.innerHTML += letra, 75 * i);
    });
}
const titulo = document.querySelector('.digitando');
if (titulo) typeWriter(titulo);

// Modo Escuro
// const botao = document.querySelector('#toggle-tema');
// botao.addEventListener('click', () => {
//     document.body.classList.toggle('dark');
//     localStorage.setItem('tema', document.body.classList.contains('dark') ? 'dark' : 'light');
// });
//window.onload = () => {
//    const tema = localStorage.getItem('tema');
//   if (tema === 'dark') document.body.classList.add('dark');
//};

// Partículas de fundo
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 50 },
        "color": { "value": "#ff0000" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3 },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ff0000",
            "opacity": 0.4,
            "width": 1
        },
        "move": { "enable": true, "speed": 2 }
    },
    "interactivity": {
        "events": {
            "onhover": { "enable": true, "mode": "repulse" },
            "onclick": { "enable": true, "mode": "push" }
        },
        "modes": {
            "repulse": { "distance": 100 },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});


