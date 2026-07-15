// --- ESTADO INICIAL DO JOGADOR ---
let player = {
    nome: "",
    classe: "",
    hp: 100,
    maxHp: 100,
    dano: 10,
    ouro: 100,
    nivel: 1,
    xp: 0,
    xpNecessario: 100,
    imagem: ""
};

// --- INIMIGO CORRENTE ---
let enemy = {
    nome: "",
    categoria: "",
    hp: 0,
    maxHp: 0,
    dano: 0,
    recompensaOuro: 0,
    recompensaXp: 0,
    imagem: ""
};

// --- BANCO DE DADOS DE MONSTROS DA FLORESTA SOMBRIA ---
const listaInimigos = [
    { 
        nome: "Lobo Selvagem", 
        categoria: "🍃 Fera Natural",
        hp: 30, 
        maxHp: 30, 
        dano: 5, 
        recompensaOuro: 15,
        recompensaXp: 15,
        imagem: "https://images.unsplash.com/photo-1590424753858-3c6d1b400120?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        nome: "Goblin Saqueador", 
        categoria: "👺 Goblinóide",
        hp: 45, 
        maxHp: 45, 
        dano: 8, 
        recompensaOuro: 35,
        recompensaXp: 28,
        imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        nome: "Lobo Infectado", 
        categoria: "⚠️ Fera Corrompida",
        hp: 55, 
        maxHp: 55, 
        dano: 10, 
        recompensaOuro: 45,
        recompensaXp: 40,
        imagem: "https://images.unsplash.com/photo-1590424753858-3c6d1b400120?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        nome: "Esqueleto Reanimado", 
        categoria: "💀 Morto-Vivo",
        hp: 70, 
        maxHp: 70, 
        dano: 12, 
        recompensaOuro: 55,
        recompensaXp: 50,
        imagem: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        nome: "Aranha Gigante das Sombras", 
        categoria: "🕷️ Besta das Trevas",
        hp: 95, 
        maxHp: 95, 
        dano: 15, 
        recompensaOuro: 80,
        recompensaXp: 75,
        imagem: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=200&q=80" 
    },
    { 
        nome: "Espírito Ancestral Corrompido", 
        categoria: "🔥 Chefe de Fase",
        hp: 175, 
        maxHp: 175, 
        dano: 22, 
        recompensaOuro: 180,
        recompensaXp: 135,
        imagem: "https://images.unsplash.com/photo-1559103444-2453e1be4bf2?auto=format&fit=crop&w=200&q=80" 
    }
];

// --- BANCO DE IMAGENS DO JOGADOR ---
const imagensClasses = {
    "Guerreiro": "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=200&q=80", 
    "Mago": "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=200&q=80",      
    "Arqueiro": "https://images.unsplash.com/photo-1511071353536-40742129525c?auto=format&fit=crop&w=200&q=80"  
};

// --- INICIALIZADOR DO RPG ---
function iniciarJogo() {
    player.nome = document.getElementById("char-name").value.trim() || "Herói Anônimo";
    player.classe = document.getElementById("char-class").value;

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
    player.ouro = 100;
    player.nivel = 1;
    player.xp = 0;
    player.xpNecessario = 100;
    player.imagem = imagensClasses[player.classe];

    definirInimigo(listaInimigos[0]);

    document.getElementById("display-name").innerText = player.nome;
    document.getElementById("display-class").innerText = "🌲 " + player.classe;
    document.getElementById("player-img").src = player.imagem;

    atualizarPainelVisual();
    atualizarPrateleiraLoja();

    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");

    const logBox = document.getElementById("combat-log");
    logBox.innerHTML = ""; 
    adicionarAoLog(`🌳 Você adentrou as trilhas estreitas da <strong>Floresta Sombria</strong>.`);
    adicionarAoLog(`⚔️ O ${player.classe} <strong>${player.nome}</strong> está pronto para combater os perigos!`);
    adicionarAoLog(`🐾 Um assustador <strong>${enemy.nome}</strong> pula dos arbustos fechados!`);
}

function definirInimigo(dadosInimigo) {
    enemy.nome = dadosInimigo.nome;
    enemy.categoria = dadosInimigo.categoria;
    enemy.hp = dadosInimigo.hp;
    enemy.maxHp = dadosInimigo.maxHp;
    enemy.dano = dadosInimigo.dano;
    enemy.recompensaOuro = dadosInimigo.recompensaOuro;
    enemy.recompensaXp = dadosInimigo.recompensaXp;
    enemy.imagem = dadosInimigo.imagem;
}

function atualizarPainelVisual() {
    document.getElementById("display-gold").innerText = player.ouro;
    document.getElementById("display-damage").innerText = player.dano;
    document.getElementById("display-level").innerText = player.nivel;
    document.getElementById("player-hp-text").innerText = `${player.hp}/${player.maxHp}`;
    
    const playerPercent = Math.max(0, (player.hp / player.maxHp) * 100);
    document.getElementById("player-hp-bar").style.width = `${playerPercent}%`;

    document.getElementById("player-xp-text").innerText = `${player.xp}/${player.xpNecessario}`;
    const xpPercent = Math.max(0, (player.xp / player.xpNecessario) * 100);
    document.getElementById("player-xp-bar").style.width = `${xpPercent}%`;

    document.getElementById("enemy-name").innerText = enemy.nome;
    document.getElementById("enemy-type-badge").innerText = enemy.categoria;
    document.getElementById("enemy-damage-text").innerText = enemy.dano;
    document.getElementById("enemy-gold-reward").innerText = enemy.recompensaOuro;
    document.getElementById("enemy-xp-reward").innerText = enemy.recompensaXp;
    document.getElementById("enemy-img").src = enemy.imagem;
    document.getElementById("enemy-hp-text").innerText = `${enemy.hp}/${enemy.maxHp}`;

    const enemyPercent = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
    document.getElementById("enemy-hp-bar").style.width = `${enemyPercent}%`;
}

function adicionarAoLog(mensagem) {
    const logBox = document.getElementById("combat-log");
    const novaMensagem = document.createElement("div");
    novaMensagem.className = "log-entry";
    novaMensagem.innerHTML = `> ${mensagem}`;
    logBox.appendChild(novaMensagem);
    logBox.scrollTop = logBox.scrollHeight;
}

function atualizarPrateleiraLoja() {
    const containerLoja = document.getElementById("shop-items");
    containerLoja.innerHTML = ""; 

    let itensParaVender = [];

    if (player.classe === "Guerreiro") {
        itensParaVender = [
            { nome: "🛡️ Cota de Malha (+40 Max HP)", custo: 45, tipo: "hp", valor: 40 },
            { nome: "🪓 Cutelo de Aço (+6 Dano)", custo: 55, tipo: "dano", valor: 6 }
        ];
    } else if (player.classe === "Mago") {
        itensParaVender = [
            { nome: "🔮 Cajado do Crepúsculo (+12 Dano)", custo: 65, tipo: "dano", valor: 12 },
            { nome: "🧪 Tônico de Vitalidade (+20 Max HP)", custo: 35, tipo: "hp", valor: 20 }
        ];
    } else if (player.classe === "Arqueiro") {
        itensParaVender = [
            { nome: "🏹 Arco de Caça (+9 Dano)", custo: 55, tipo: "dano", valor: 9 },
            { nome: "👢 Botas de Couro (+25 Max HP)", custo: 35, tipo: "hp", valor: 25 }
        ];
    }

    itensParaVender.forEach(item => {
        const botao = document.createElement("button");
        botao.className = "shop-btn";
        botao.innerHTML = `${item.nome}<br><strong style="color: #ffd700;">${item.custo} Ouro</strong>`;
        botao.onclick = () => processarCompra(item);
        containerLoja.appendChild(botao);
    });
}

function processarCompra(item) {
    if (player.ouro >= item.custo) {
        player.ouro -= item.custo;
        
        if (item.tipo === "hp") {
            player.maxHp += item.valor;
            player.hp += item.valor; 
            adicionarAoLog(`<span style="color: #4ade80;">Você comprou <strong>${item.nome}</strong> no refúgio seguro!</span>`);
        } else if (item.tipo === "dano") {
            player.dano += item.valor;
            adicionarAoLog(`<span style="color: #4ade80;">Você equipou <strong>${item.nome}</strong>! Sente o gume afiado.</span>`);
        }
        
        atualizarPainelVisual();
        atualizarPrateleiraLoja(); 
    } else {
        adicionarAoLog(`<span style="color: #ef4444;">⚠️ Ouro insuficiente para este item!</span>`);
    }
}

// --- SISTEMA DE COMBATE (TURNO A TURNO) ---
function atacar() {
    if (enemy.hp <= 0) {
        adicionarAoLog(`A fera foi derrotada! Continue trilhando o caminho.`);
        return;
    }
    if (player.hp <= 0) {
        adicionarAoLog(`<span style="color: #ef4444;">Você está sem forças! Reinicie a página para ressurgir.</span>`);
        return;
    }

    // Turno do Jogador
    enemy.hp -= player.dano;
    if (enemy.hp < 0) enemy.hp = 0;

    animarDanoCard("enemy-card");
    adicionarAoLog(`💥 Você golpeou o <strong>${enemy.nome}</strong> causando <span style="color: #ef4444; font-weight: bold;">${player.dano} de dano</span>!`);
    atualizarPainelVisual();

    // Verificação de Vitória
    if (enemy.hp <= 0) {
        adicionarAoLog(`🎉 <strong>Vitória!</strong> O <strong>${enemy.nome}</strong> caiu sem forças!`);
        adicionarAoLog(`💰 +<span style="color: #ffd700; font-weight: bold;">${enemy.recompensaOuro} ouro</span>.`);
        adicionarAoLog(`✨ +<span style="color: #60a5fa; font-weight: bold;">${enemy.recompensaXp} de Experiência</span>.`);
        
        player.ouro += enemy.recompensaOuro;
        ganharExperiencia(enemy.recompensaXp);
        atualizarPainelVisual();

        document.getElementById("next-enemy-btn").classList.remove("hidden");
        return; 
    }

    // Turno do Inimigo (com atraso)
    setTimeout(() => {
        if (enemy.hp > 0) {
            player.hp -= enemy.dano;
            if (player.hp < 0) player.hp = 0;

            animarDanoCard("player-card");
            adicionarAoLog(`🩸 O <strong>${enemy.nome}</strong> contra-atacou desferindo <span style="color: #ef4444; font-weight: bold;">${enemy.dano} de dano</span>!`);
            atualizarPainelVisual();

            if (player.hp <= 0) {
                adicionarAoLog(`<span style="color: #ef4444; font-weight: bold;">☠️ FIM DE JOGO! O herói ${player.nome} foi consumido pela escuridão da Floresta Sombria.</span>`);
            }
        }
    }, 550); 
}

// --- PROGRESSÃO DE EXPERIÊNCIA E LEVEL UP ---
function ganharExperiencia(qtd) {
    player.xp += qtd;
    if (player.xp >= player.xpNecessario) {
        subirDeNivel();
    }
}

function subirDeNivel() {
    player.xp -= player.xpNecessario;
    player.nivel += 1;
    player.xpNecessario = Math.floor(player.xpNecessario * 1.5);

    let hpBonus = 0;
    let danoBonus = 0;

    if (player.classe === "Guerreiro") {
        hpBonus = 25;
        danoBonus = 3;
    } else if (player.classe === "Mago") {
        hpBonus = 15;
        danoBonus = 6;
    } else if (player.classe === "Arqueiro") {
        hpBonus = 20;
        danoBonus = 4;
    }

    player.maxHp += hpBonus;
    player.dano += danoBonus;
    player.hp = player.maxHp; 

    adicionarAoLog(`🌟🌟🌟 <strong>SUBIU DE NÍVEL!</strong> Você alcançou o <strong>Nível ${player.nivel}</strong>! 🌟🌟🌟`);
    adicionarAoLog(`💖 HP Máximo aumentado em <span style="color: #22c55e;">+${hpBonus}</span> e Dano em <span style="color: #22c55e;">+${danoBonus}</span>. Sua saúde foi restaurada!`);
    
    if (player.xp >= player.xpNecessario) {
        subirDeNivel();
    }
}

function animarDanoCard(cardId) {
    const cardElement = document.getElementById(cardId);
    cardElement.classList.add("damage-blink");
    setTimeout(() => {
        cardElement.classList.remove("damage-blink");
    }, 400);
}

// --- BUSCAR PRÓXIMO MONSTRO / TRILHAR NOVO CAMINHO ---
function proximoInimigo() {
    const indiceSorteado = Math.floor(Math.random() * listaInimigos.length);
    const modeloSorteado = listaInimigos[indiceSorteado];

    definirInimigo(modeloSorteado);

    const curaRecuperada = Math.floor(player.maxHp * 0.25);
    player.hp = Math.min(player.maxHp, player.hp + curaRecuperada);

    adicionarAoLog(`👣 Você abre caminho com cuidado pela folhagem densa e úmida...`);
    adicionarAoLog(`💖 Você para um momento para respirar e cura <span style="color: #22c55e;">+${curaRecuperada} HP</span>.`);
    adicionarAoLog(`🌲 Uma criatura bloqueia a passagem: um <strong>${enemy.nome}</strong> espreita à frente!`);

    atualizarPainelVisual();
    document.getElementById("next-enemy-btn").classList.add("hidden");
}
