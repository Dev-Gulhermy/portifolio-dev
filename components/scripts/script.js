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
// window.onload = () => {
//     const tema = localStorage.getItem('tema');
//     if (tema === 'dark') document.body.classList.add('dark');
// };

// === Alternância de Tema Dark/Light ===
const toggleTema = document.getElementById("toggle-tema");

// Verifica se já existe preferência no localStorage
if (localStorage.getItem("tema") === "light") {
    document.body.classList.add("light");
    toggleTema.textContent = "🌙 Dark";
} else {
    toggleTema.textContent = "☀️ Light";
}

// Ação do clique no botão 
toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("light");

    // Atualiza preferência
    if (document.body.classList.contains("light")) {
        localStorage.setItem("tema", "light");
        toggleTema.textContent = "🌙 Dark";

        // Altera partículas para PRETO no modo light
        pJSDom[0].pJS.particles.color.value = "#000000";
        pJSDom[0].pJS.particles.line_linked.color = "#000000";
        pJSDom[0].pJS.fn.particlesRefresh();

    } else {
        localStorage.setItem("tema", "dark");
        toggleTema.textContent = "☀️ Light";

        // Altera partículas para VERMELHO no modo dark
        pJSDom[0].pJS.particles.color.value = "#ff0000";
        pJSDom[0].pJS.particles.line_linked.color = "#ff0000";
        pJSDom[0].pJS.fn.particlesRefresh();
    }
});

// Define cor inicial das partículas conforme tema
let corParticulas;
if (localStorage.getItem("tema") === "light") {
    corParticulas = "#000000"; // preto para light
} else {
    corParticulas = "#ff0000"; // vermelho para dark
}

particlesJS('particles-js', {
    "particles": {
        "number": { "value": 50 },
        "color": { "value": corParticulas }, // usa a cor inicial
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3 },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": corParticulas, // usa a cor inicial
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

// === MENU HAMBÚRGUER ===
// Pega o botão hamburguer
const menuToggle = document.getElementById("menu-toggle");

// Pega o menu
const menu = document.querySelector(".menu");

// Ao clicar no botão hamburguer
menuToggle.addEventListener("click", () => {
    // alterna o estado do menu
    menu.classList.toggle("ativo");

    // alterna o estado visual do botão
    menuToggle.classList.toggle("ativo");
});

// Fecha o menu ao clicar em qualquer link do menu
document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", () => {
        // remove o estado ativo do menu
        menu.classList.remove("ativo");

        // também volta o botão ao estado original
        menuToggle.classList.remove("ativo");
    });
});







