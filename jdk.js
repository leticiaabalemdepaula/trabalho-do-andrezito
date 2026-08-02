// --- ESTADO DO JOGADOR E PROGRESSÃO ---
let player = {
    nome: "", classe: "", hp: 100, maxHp: 100, dano: 10, ouro: 100,
    nivel: 1, xp: 0, xpNecessario: 100, imagem: "",
    faseAtual: 1, 
    abatesNaFase: 0 // Conta os monstros derrotados para invocar o Boss
};

let enemy = { nome: "", categoria: "", hp: 0, maxHp: 0, dano: 0, recompensaOuro: 0, recompensaXp: 0, imagem: "", isBoss: false };

// --- BANCO DE DADOS DAS FASES ---
const bancoDeFases = {
    1: {
        titulo: "Fase 1: Floresta Sombria",
        descricao: "A mata é tão fechada que a luz do sol mal consegue passar.",
        fundo: "url('https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=1920&auto=format&fit=crop')",
        inimigos: [
            { nome: "Lobo Selvagem", categoria: "🍃 Fera Natural", hp: 30, maxHp: 30, dano: 5, recompensaOuro: 15, recompensaXp: 15, imagem: "https://images.unsplash.com/photo-1590424753858-3c6d1b400120?auto=format&fit=crop&w=200&q=80" },
            { nome: "Goblin Saqueador", categoria: "👺 Goblinóide", hp: 45, maxHp: 45, dano: 8, recompensaOuro: 35, recompensaXp: 28, imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=200&q=80" }
        ],
        boss: { nome: "Espírito Ancestral", categoria: "🔥 BOSS DA FLORESTA", hp: 120, maxHp: 120, dano: 15, recompensaOuro: 150, recompensaXp: 120, isBoss: true, imagem: "https://images.unsplash.com/photo-1559103444-2453e1be4bf2?auto=format&fit=crop&w=200&q=80" }
    },
    2: {
        titulo: "Fase 2: Cavernas Profundas",
        descricao: "Um labirinto de pedra úmida. O ar cheira a enxofre e esconde abominações.",
        fundo: "url('https://images.unsplash.com/photo-1599368535287-2dc01f56fc0e?q=80&w=1920&auto=format&fit=crop')",
        inimigos: [
            { nome: "Morcego Vampiro", categoria: "🦇 Fera Voadora", hp: 90, maxHp: 90, dano: 16, recompensaOuro: 60, recompensaXp: 55, imagem: "https://images.unsplash.com/photo-1518930030584-1845184fb2b6?auto=format&fit=crop&w=200&q=80" },
            { nome: "Golem de Cristal", categoria: "💎 Elemental Escuro", hp: 130, maxHp: 130, dano: 22, recompensaOuro: 85, recompensaXp: 75, imagem: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=200&q=80" }
        ],
        boss: { nome: "Rei Dragão do Submundo", categoria: "🔥 BOSS DA CAVERNA", hp: 280, maxHp: 280, dano: 35, recompensaOuro: 350, recompensaXp: 300, isBoss: true, imagem: "https://images.unsplash.com/photo-1614023349208-16bd40d5885c?auto=format&fit=crop&w=200&q=80" }
    },
    3: {
        titulo: "Fase 3: Castelo em Ruínas",
        descricao: "O epicentro da corrupção. As almas perdidas ecoam por esses corredores góticos.",
        fundo: "url('https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1920&auto=format&fit=crop')",
        inimigos: [
            { nome: "Cavaleiro Caído", categoria: "💀 Morto-Vivo", hp: 180, maxHp: 180, dano: 30, recompensaOuro: 120, recompensaXp: 110, imagem: "https://images.unsplash.com/photo-1520658428289-497793d56f1a?auto=format&fit=crop&w=200&q=80" },
            { nome: "Gárgula Sanguinária", categoria: "🦇 Demônio", hp: 220, maxHp: 220, dano: 38, recompensaOuro: 150, recompensaXp: 140, imagem: "https://images.unsplash.com/photo-1620060938637-29d665b1c5e6?auto=format&fit=crop&w=200&q=80" }
        ],
        boss: { nome: "Lorde das Sombras", categoria: "👑 BOSS FINAL", hp: 600, maxHp: 600, dano: 60, recompensaOuro: 1500, recompensaXp: 1000, isBoss: true, imagem: "https://images.unsplash.com/photo-1518331539958-c2b64d0bb037?auto=format&fit=crop&w=200&q=80" }
    }
};

const imagensClasses = {
    "Guerreiro": "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=200&q=80", 
    "Mago": "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=200&q=80",      
    "Arqueiro": "https://images.unsplash.com/photo-1511071353536-40742129525c?auto=format&fit=crop&w=200&q=80"  
};

// --- INICIALIZAÇÃO E AMBIENTAÇÃO ---
function iniciarJogo() {
    player.nome = document.getElementById("char-name").value.trim() || "Herói Anônimo";
    player.classe = document.getElementById("char-class").value;

    if (player.classe === "Guerreiro") { player.maxHp = 130; player.dano = 12; } 
    else if (player.classe === "Mago") { player.maxHp = 80; player.dano = 22; } 
    else if (player.classe === "Arqueiro") { player.maxHp = 100; player.dano = 16; }
    
    player.hp = player.maxHp;
    player.imagem = imagensClasses[player.classe];

    atualizarAmbienteFase();
    proximoInimigo(true);

    document.getElementById("display-name").innerText = player.nome;
    document.getElementById("display-class").innerText = "🛡️ " + player.classe;
    document.getElementById("player-img").src = player.imagem;

    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    
    atualizarPrateleiraLoja();
}

function atualizarAmbienteFase() {
    const dadosFase = bancoDeFases[player.faseAtual];
    document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(10, 18, 12, 0.85), rgba(0, 0, 0, 0.95)), ${dadosFase.fundo}`;
    document.getElementById("ambient-title").innerHTML = `<strong>${dadosFase.titulo}</strong> - ${dadosFase.descricao}`;
}

// --- DIFICULDADE ESCALONADA E SPAWN DE INIMIGOS ---
function definirInimigo(dadosInimigo) {
    // Escala +50% de atributos a cada 5 níveis do jogador
    let ciclosDeDificuldade = Math.floor(player.nivel / 5);
    let multiplicador = 1 + (ciclosDeDificuldade * 0.5); 

    enemy.nome = dadosInimigo.nome;
    enemy.isBoss = dadosInimigo.isBoss || false;
    
    if (ciclosDeDificuldade > 0 && !enemy.isBoss) {
        enemy.categoria = dadosInimigo.categoria + ` (+${ciclosDeDificuldade})`;
    } else {
        enemy.categoria = dadosInimigo.categoria;
    }

    enemy.maxHp = Math.floor(dadosInimigo.maxHp * multiplicador);
    enemy.hp = enemy.maxHp; 
    enemy.dano = Math.floor(dadosInimigo.dano * multiplicador);
    enemy.recompensaOuro = Math.floor(dadosInimigo.recompensaOuro * multiplicador);
    enemy.recompensaXp = Math.floor(dadosInimigo.recompensaXp * multiplicador);
    enemy.imagem = dadosInimigo.imagem;
    
    atualizarPainelVisual();
}

function proximoInimigo(inicio = false) {
    const dadosFase = bancoDeFases[player.faseAtual];
    let alvo;

    // A cada 4 monstros mortos na fase atual, o 5º é o Chefe
    if (player.abatesNaFase >= 4) {
        alvo = dadosFase.boss;
        if (!inicio) adicionarAoLog(`🔥 <span style="color:#ef4444; font-weight:bold;">ATENÇÃO! O chão treme... Um BOSS apareceu!</span>`);
    } else {
        const indice = Math.floor(Math.random() * dadosFase.inimigos.length);
        alvo = dadosFase.inimigos[indice];
        if (!inicio) adicionarAoLog(`👣 Um novo inimigo surgiu: <strong>${alvo.nome}</strong>!`);
    }

    definirInimigo(alvo);

    if (!inicio) {
        const cura = Math.floor(player.maxHp * 0.25);
        player.hp = Math.min(player.maxHp, player.hp + cura);
        adicionarAoLog(`💖 Você recuperou <span style="color: #22c55e;">+${cura} HP</span> ao caminhar.`);
    }

    atualizarPainelVisual();
    document.getElementById("next-enemy-btn").classList.add("hidden");
    document.getElementById("btn-atacar").classList.remove("hidden");
}

// --- SISTEMA DE COMBATE E CHEFES ---
function atacar() {
    if (enemy.hp <= 0 || player.hp <= 0) return;

    // Jogador bate
    enemy.hp -= player.dano;
    if (enemy.hp < 0) enemy.hp = 0;
    animarDanoCard("enemy-card");
    adicionarAoLog(`💥 Causou <span style="color: #ef4444;">${player.dano} de dano</span> em ${enemy.nome}!`);
    atualizarPainelVisual();

    if (enemy.hp <= 0) {
        processarVitoria();
        return; 
    }

    // Inimigo revida
    setTimeout(() => {
        if (enemy.hp > 0) {
            player.hp -= enemy.dano;
            if (player.hp < 0) player.hp = 0;
            animarDanoCard("player-card");
            adicionarAoLog(`🩸 ${enemy.nome} revidou com <span style="color: #ef4444;">${enemy.dano} de dano</span>!`);
            atualizarPainelVisual();

            if (player.hp <= 0) adicionarAoLog(`<span style="color: #ef4444; font-weight: bold;">☠️ FIM DE JOGO! Reinicie a página.</span>`);
        }
    }, 500); 
}

function processarVitoria() {
    adicionarAoLog(`🎉 <strong>Vitória!</strong> +<span style="color: #ffd700;">${enemy.recompensaOuro}g</span> e +<span style="color: #60a5fa;">${enemy.recompensaXp} XP</span>.`);
    player.ouro += enemy.recompensaOuro;
    ganharExperiencia(enemy.recompensaXp);
    
    document.getElementById("btn-atacar").classList.add("hidden");
    document.getElementById("next-enemy-btn").classList.remove("hidden");

    if (enemy.isBoss) {
        if (player.faseAtual < 3) {
            player.faseAtual++;
            player.abatesNaFase = 0; // Zera para a próxima fase
            adicionarAoLog(`🚪 <span style="color:#4ade80; font-weight:bold;">O chefe caiu! Uma nova passagem se abriu para a Fase ${player.faseAtual}!</span>`);
            atualizarAmbienteFase();
        } else {
            adicionarAoLog(`🏆 <span style="color:#ffd700; font-weight:bold; font-size:16px;">VOCÊ DERROTOU O LORDE DAS SOMBRAS E ZEROU O JOGO!</span>`);
            document.getElementById("next-enemy-btn").classList.add("hidden"); // Impede de continuar
        }
    } else {
        player.abatesNaFase++;
    }
}

// --- LOJA, XP E UTILITÁRIOS ---
function ganharExperiencia(qtd) {
    player.xp += qtd;
    while (player.xp >= player.xpNecessario) {
        player.xp -= player.xpNecessario;
        player.nivel += 1;
        player.xpNecessario = Math.floor(player.xpNecessario * 1.5);

        let hpBonus = player.classe === "Guerreiro" ? 25 : (player.classe === "Mago" ? 15 : 20);
        let danoBonus = player.classe === "Guerreiro" ? 3 : (player.classe === "Mago" ? 6 : 4);

        player.maxHp += hpBonus;
        player.dano += danoBonus;
        player.hp = player.maxHp; 

        adicionarAoLog(`🌟 <strong>NÍVEL ${player.nivel}!</strong> HP e Dano subiram. Vida completamente restaurada!`);
    }
}

function atualizarPrateleiraLoja() {
    const container = document.getElementById("shop-items");
    container.innerHTML = ""; 
    const itens = player.classe === "Guerreiro" ? [{n: "🛡️ Armadura (+40 Max HP)", c: 45, t: "hp", v: 40}, {n: "🪓 Machado (+6 Dano)", c: 55, t: "dano", v: 6}] : 
                  player.classe === "Mago" ? [{n: "🧪 Elixir (+20 Max HP)", c: 35, t: "hp", v: 20}, {n: "🔮 Grimório (+12 Dano)", c: 65, t: "dano", v: 12}] : 
                  [{n: "👢 Botas (+25 Max HP)", c: 35, t: "hp", v: 25}, {n: "🏹 Arco (+9 Dano)", c: 55, t: "dano", v: 9}];

    itens.forEach(i => {
        let btn = document.createElement("button");
        btn.className = "shop-btn";
        btn.innerHTML = `${i.n}<br><strong style="color: #ffd700;">${i.c}g</strong>`;
        btn.onclick = () => {
            if(player.ouro >= i.c) {
                player.ouro -= i.c;
                if(i.t === "hp") { player.maxHp += i.v; player.hp += i.v; } else { player.dano += i.v; }
                adicionarAoLog(`🛍️ Comprou <strong>${i.n}</strong>!`);
                atualizarPainelVisual();
            } else adicionarAoLog(`⚠️ Ouro insuficiente!`);
        };
        container.appendChild(btn);
    });
}

function atualizarPainelVisual() {
    document.getElementById("display-gold").innerText = player.ouro;
    document.getElementById("display-damage").innerText = player.dano;
    document.getElementById("display-level").innerText = player.nivel;
    document.getElementById("player-hp-text").innerText = `${player.hp}/${player.maxHp}`;
    document.getElementById("player-hp-bar").style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
    document.getElementById("player-xp-text").innerText = `${player.xp}/${player.xpNecessario}`;
    document.getElementById("player-xp-bar").style.width = `${Math.max(0, (player.xp / player.xpNecessario) * 100)}%`;

    document.getElementById("enemy-name").innerText = enemy.nome;
    document.getElementById("enemy-type-badge").innerText = enemy.categoria;
    document.getElementById("enemy-damage-text").innerText = enemy.dano;
    document.getElementById("enemy-gold-reward").innerText = enemy.recompensaOuro;
    document.getElementById("enemy-xp-reward").innerText = enemy.recompensaXp;
    document.getElementById("enemy-img").src = enemy.imagem;
    document.getElementById("enemy-hp-text").innerText = `${enemy.hp}/${enemy.maxHp}`;
    document.getElementById("enemy-hp-bar").style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;
}

function animarDanoCard(id) {
    let el = document.getElementById(id);
    el.classList.add("damage-blink");
    setTimeout(() => el.classList.remove("damage-blink"), 400);
}

function adicionarAoLog(msg) {
    let box = document.getElementById("combat-log");
    box.innerHTML += `<div class="log-entry">> ${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}
