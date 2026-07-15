// ==========================================
// 1. ESTADO GLOBAL DO JOGO
// ==========================================
let player = {
    nome: "",
    classe: "",
    hp: 100,
    maxHp: 100,
    dano: 10,
    ouro: 100,
    imagem: "" // Nova propriedade para a imagem do jogador
};

let enemy = {
    nome: "Lobo Selvagem",
    hp: 50,
    maxHp: 50,
    dano: 8,
    recompensaOuro: 40,
    imagem: "" // Nova propriedade para a imagem do inimigo
};

// Lista de possíveis inimigos com suas respectivas imagens
const listaInimigos = [
    { 
        nome: "Lobo Selvagem", 
        hp: 50, 
        maxHp: 50, 
        dano: 8, 
        recompensaOuro: 40,
        imagem: "https://images.unsplash.com/photo-1590424753858-3c6d1b400120?auto=format&fit=crop&w=150&q=80" // Imagem de lobo
    },
    { 
        nome: "Orc Saqueador", 
        hp: 80, 
        maxHp: 80, 
        dano: 12, 
        recompensaOuro: 70,
        imagem: "https://images.unsplash.com/photo-1559103444-2453e1be4bf2?auto=format&fit=crop&w=150&q=80" // Representação de criatura verde/fantasia
    },
    { 
        nome: "Esqueleto Arqueiro", 
        hp: 60, 
        maxHp: 60, 
        dano: 15, 
        recompensaOuro: 65,
        imagem: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=150&q=80" // Representação de caveira/fantasma
    },
    { 
        nome: "Dragão Jovem", 
        hp: 150, 
        maxHp: 150, 
        dano: 22, 
        recompensaOuro: 150,
        imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=150&q=80" // Representação de criatura fantástica/dragão
    }
];

// Banco de imagens para as classes do jogador
const imagensClasses = {
    "Guerreiro": "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=150&q=80", // Representação de armadura/guerreiro
    "Mago": "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=150&q=80",      // Representação de magia/mago
    "Arqueiro": "https://images.unsplash.com/photo-1511071353536-40742129525c?auto=format&fit=crop&w=150&q=80"  // Representação de arco/arqueiro
};

// ==========================================
// 2. INICIALIZAÇÃO DO JOGO
// ==========================================
function iniciarJogo() {
    player.nome = document.getElementById("char-name").value || "Herói Anônimo";
    player.classe = document.getElementById("char-class").value;

    // Define os status iniciais e a imagem baseados na classe selecionada
    if (player.classe === "Guerreiro") {
        player.maxHp = 130;
        player.dano = 12;
    } else if (player.classe === "Mago") {
        player.maxHp = 80;
        player.dano = 22;
    } else if (player.classe === "Arqueiro") {
        player.maxHp = 100;
        player.dano = 16;
    }
    player.hp = player.maxHp;
    player.imagem = imagensClasses[player.classe]; // Atribui a imagem correta da classe

    // Define a imagem inicial do primeiro inimigo (Lobo Selvagem)
    enemy.imagem = listaInimigos[0].imagem;

    // Atualiza os textos e as imagens na tela
    document.getElementById("display-name").innerText = player.nome;
    document.getElementById("display-class").innerText = player.classe;
    
    atualizarStatusInterface();
    atualizarLoja();

    // Esconde a tela de criação e mostra os botões e painel do jogo
    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");

    logar(`O ${player.classe} ${player.nome} entrou na arena de batalha!`);
}

// ==========================================
// 3. ATUALIZAÇÕES VISUAIS (INTERFACE)
// ==========================================
function atualizarStatusInterface() {
    // Atualiza dados e IMAGEM do Jogador
    document.getElementById("display-gold").innerText = player.ouro;
    document.getElementById("display-damage").innerText = player.dano;
    document.getElementById("player-hp-text").innerText = `${player.hp}/${player.maxHp}`;
    document.getElementById("player-img").src = player.imagem; // Atualiza a foto do herói
    document.getElementById("player-img").alt = player.classe;
    
    const playerHpPercent = Math.max(0, (player.hp / player.maxHp) * 100);
    document.getElementById("player-hp-bar").style.width = `${playerHpPercent}%`;

    // Atualiza dados e IMAGEM do Inimigo
    document.getElementById("enemy-name").innerText = enemy.nome;
    document.getElementById("enemy-damage-text").innerText = enemy.dano;
    document.getElementById("enemy-hp-text").innerText = `${enemy.hp}/${enemy.maxHp}`;
    document.getElementById("enemy-img").src = enemy.imagem; // Atualiza a foto do monstro
    document.getElementById("enemy-img").alt = enemy.nome;
    
    const enemyHpPercent = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
    document.getElementById("enemy-hp-bar").style.width = `${enemyHpPercent}%`;
}

// Função para adicionar mensagens no diário de batalha
function logar(texto) {
    const logBox = document.getElementById("combat-log");
    logBox.innerHTML += `<br>> ${texto}`;
    logBox.scrollTop = logBox.scrollHeight;
}

// ==========================================
// 4. MERCADO DINÂMICO (LOJA)
// ==========================================
function atualizarLoja() {
    const shopDiv = document.getElementById("shop-items");
    shopDiv.innerHTML = "";

    let itensDisponiveis = [];

    if (player.classe === "Guerreiro") {
        itensDisponiveis = [
            { nome: "Escudo de Ferro (+30 HP)", custo: 40, tipo: "hp", valor: 30 },
            { nome: "Espada Pesada (+5 Dano)", custo: 50, tipo: "dano", valor: 5 }
        ];
    } else if (player.classe === "Mago") {
        itensDisponiveis = [
            { nome: "Cajado Arcano (+12 Dano)", custo: 60, tipo: "dano", valor: 12 },
            { nome: "Pocão de Mana Máxima (+15 HP)", custo: 30, tipo: "hp", valor: 15 }
        ];
    } else if (player.classe === "Arqueiro") {
        itensDisponiveis = [
            { nome: "Arco Composto (+8 Dano)", custo: 50, tipo: "dano", valor: 8 },
            { nome: "Botas de Couro Rápido (+20 HP)", custo: 35, tipo: "hp", valor: 20 }
        ];
    }

    itensDisponiveis.forEach(item => {
        const btn = document.createElement("button");
        btn.innerText = `${item.nome} - Preço: ${item.custo}g`;
        btn.onclick = () => comprarItem(item);
        shopDiv.appendChild(btn);
    });
}

function comprarItem(item) {
    if (player.ouro >= item.custo) {
        player.ouro -= item.custo;
        
        if (item.tipo === "hp") {
            player.maxHp += item.valor;
            player.hp += item.valor;
        } else if (item.tipo === "dano") {
            player.dano += item.valor;
        }
        
        logar(`Você comprou: <strong>${item.nome}</strong>!`);
        atualizarStatusInterface();
    } else {
        logar(`<span style="color: #ff4444;">Ouro insuficiente para comprar este item!</span>`);
    }
}

// ==========================================
// 5. MECÂNICAS DE BATALHA (TURNO A TURNO)
// ==========================================
function atacar() {
    if (enemy.hp <= 0 || player.hp <= 0) return;

    // --- TURNO DO JOGADOR ---
    enemy.hp -= player.dano;
    if (enemy.hp < 0) enemy.hp = 0;
    
    animarDano("enemy-card");
    logar(`Você atacou o ${enemy.nome} e causou ${player.dano} de dano!`);
    atualizarStatusInterface();

    if (enemy.hp <= 0) {
        logar(`<span style="color: #28a745; font-weight: bold;">Você derrotou o ${enemy.nome}! Ganhou ${enemy.recompensaOuro} de ouro.</span>`);
        player.ouro += enemy.recompensaOuro;
        atualizarStatusInterface();
        
        document.getElementById("next-enemy-btn").classList.remove("hidden");
        return;
    }

    // --- TURNO DO INIMIGO ---
    setTimeout(() => {
        if (enemy.hp > 0) {
            player.hp -= enemy.dano;
            if (player.hp < 0) player.hp = 0;

            animarDano("player-card");
            logar(`<span style="color: #ff4444;">O ${enemy.nome} contra-atacou e te causou ${enemy.dano} de dano!</span>`);
            atualizarStatusInterface();

            if (player.hp <= 0) {
                logar(`<span style="color: red; font-weight: bold;">Fim de jogo! Você foi derrotado. Recarregue a página para tentar novamente!</span>`);
            }
        }
    }, 600);
}

function animarDano(cardId) {
    const card = document.getElementById(cardId);
    card.classList.add("damage-blink");
    setTimeout(() => {
        card.classList.remove("damage-blink");
    }, 300);
}

// ==========================================
// 6. BUSCAR NOVO INIMIGO
// ==========================================
function proximoInimigo() {
    const indiceAleatorio = Math.floor(Math.random() * listaInimigos.length);
    const modeloInimigo = listaInimigos[indiceAleatorio];

    // Reinicia o inimigo com o modelo sorteado, incluindo a imagem dele
    enemy = {
        nome: modeloInimigo.nome,
        hp: modeloInimigo.hp,
        maxHp: modeloInimigo.maxHp,
        dano: modeloInimigo.dano,
        recompensaOuro: modeloInimigo.recompensaOuro,
        imagem: modeloInimigo.imagem // Nova imagem aplicada aqui
    };

    const curaBonus = Math.floor(player.maxHp * 0.25);
    player.hp = Math.min(player.maxHp, player.hp + curaBonus);

    logar(`Um novo oponente apareceu: <strong>${enemy.nome}</strong>! Você recuperou ${curaBonus} de vida como bônus.`);
    atualizarStatusInterface();

    document.getElementById("next-enemy-btn").classList.add("hidden");
}
