
function enviarWhats(event) {
    event.preventDefault();

    const nomeInput = document.getElementById('nome');
    const mensagemInput = document.getElementById('mensagem');
    const erroNome = document.getElementById('erro-nome');
    const erroMensagem = document.getElementById('erro-mensagem');

    const nome = nomeInput.value.trim();
    const mensagem = mensagemInput.value.trim();
    let valido = true;


    erroNome.textContent = '';
    erroMensagem.textContent = '';
    nomeInput.classList.remove('campo-invalido');
    mensagemInput.classList.remove('campo-invalido');


    if (nome.length <= 2) {
        erroNome.textContent = 'O nome deve ter mais de 2 letras.';
        nomeInput.classList.add('campo-invalido');
        valido = false;
    }


    if (mensagem.length <= 10) {
        erroMensagem.textContent = 'A mensagem deve ter mais de 10 letras.';
        mensagemInput.classList.add('campo-invalido');
        valido = false;
    }

    if (!valido) return;

    const telefone = '5583988311137';
    const texto = `Olá! Me chamo ${nome}, ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);
    const url = `https://wa.me/${telefone}?text=${msgFormatada}`;

    /*console.log(url); usado para mostrar um valor na tela/console/propmt. Geralmente usado para identificar erros pois mostrar diretamente no console/prompt*/

    window.open(url, '_blanck');
}


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
    brilhos.forEach((brilho) => {
        brilho.style.opacity = 1;
    });
}


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
mostrarElemento();


function typeWriter(elemento) {
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textoArray.forEach((letra, i) => {
        setTimeout(() => elemento.innerHTML += letra, 75 * i);
    });
}
const titulo = document.querySelector('.digitando');
if (titulo) typeWriter(titulo);


const toggleTema = document.getElementById("toggle-tema");


if (localStorage.getItem("tema") === "light") {
    document.body.classList.add("light");
    toggleTema.textContent = "🌙 Dark";
} else {
    toggleTema.textContent = "☀️ Light";
}

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("tema", "light");
        toggleTema.textContent = "🌙 Dark";
        pJSDom[0].pJS.particles.color.value = "#000000";
        pJSDom[0].pJS.particles.line_linked.color = "#000000";
        pJSDom[0].pJS.fn.particlesRefresh();

    } else {
        localStorage.setItem("tema", "dark");
        toggleTema.textContent = "☀️ Light";
        pJSDom[0].pJS.particles.color.value = "#ff0000";
        pJSDom[0].pJS.particles.line_linked.color = "#ff0000";
        pJSDom[0].pJS.fn.particlesRefresh();
    }
});



let corParticulas;
if (localStorage.getItem("tema") === "light") {
    corParticulas = "#000000";
} else {
    corParticulas = "#ff0000";
}

particlesJS('particles-js', {
    "particles": {
        "number": { "value": 50 },
        "color": { "value": corParticulas },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3 },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": corParticulas,
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



const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");
menuToggle.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    menuToggle.classList.toggle("ativo");
});


document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("ativo");
        menuToggle.classList.remove("ativo");
    });
});


function startVisuals() {
    const img = document.getElementById('fotoPerfil');
    if (img) img.classList.add('animar');

}

if ('requestIdleCallback' in window) {
    requestIdleCallback(() => setTimeout(startVisuals, 120), { timeout: 2000 });
} else {
    window.addEventListener('load', () => setTimeout(startVisuals, 120));
}


const foto = document.getElementById('fotoPerfil');
foto.style.willChange = 'transform';
setTimeout(() => { foto.style.willChange = ''; }, 5000); // remove após início
