let player = {
    nome: "", classe: "", 
    hp: 100, maxHp: 100, mp: 50, maxMp: 50,
    dano: 10, ouro: 100, pocoes: 0,
    nivel: 1, xp: 0, xpNecessario: 100, imagem: "",
    faseAtual: 1, abatesNaFase: 0 
};

let enemy = { nome: "", categoria: "", hp: 0, maxHp: 0, dano: 0, recompensaOuro: 0, recompensaXp: 0, imagem: "", isBoss: false };

const bancoDeFases = {
    1: { titulo: "Fase 1: Floresta Sombria", descricao: "A mata é tão fechada que a luz do sol mal consegue passar.", fundo: "url('floresta.png')", inimigos: [{ nome: "Lobo Selvagem", categoria: "🍃 Fera Natural", hp: 30, maxHp: 30, dano: 5, recompensaOuro: 15, recompensaXp: 15, imagem: "lobo.jpeg" }, { nome: "Goblin Saqueador", categoria: "👺 Goblinóide", hp: 45, maxHp: 45, dano: 8, recompensaOuro: 35, recompensaXp: 28, imagem: "goblin.jpeg" }], boss: { nome: "Espírito Ancestral", categoria: "🔥 BOSS DA FLORESTA", hp: 1200, maxHp: 1200, dano: 35, recompensaOuro: 1500, recompensaXp: 1600, isBoss: true, imagem: "espirito.jpeg" } },
    2: { titulo: "Fase 2: Cavernas Profundas", descricao: "Um labirinto de pedra úmida. O ar cheira a enxofre.", fundo: "url('labirinto.png')", inimigos: [{ nome: "Morcego Vampiro", categoria: "🦇 Fera", hp: 90, maxHp: 90, dano: 16, recompensaOuro: 60, recompensaXp: 55, imagem: "morcego.jpeg" }, { nome: "Golem", categoria: "💎 Elemental", hp: 130, maxHp: 130, dano: 22, recompensaOuro: 85, recompensaXp: 75, imagem: "golem.jpeg" }], boss: { nome: "Rei Dragão", categoria: "🔥 BOSS DA CAVERNA", hp: 2800, maxHp: 2800, dano: 45, recompensaOuro: 2500, recompensaXp: 300, isBoss: true, imagem: "rei dragao.jpeg" } },
    3: { titulo: "Fase 3: Castelo em Ruínas", descricao: "O epicentro da corrupção.", fundo: "url('trono.png')", inimigos: [{ nome: "Cavaleiro Caído", categoria: "💀 Morto-Vivo", hp: 180, maxHp: 180, dano: 30, recompensaOuro: 120, recompensaXp: 110, imagem: "caido.jpeg" }, { nome: "Gárgula", categoria: "🦇 Demônio", hp: 220, maxHp: 220, dano: 38, recompensaOuro: 150, recompensaXp: 140, imagem: "gargula.jpeg" }], boss: { nome: "Lorde das Sombras", categoria: "👑 BOSS FINAL", hp: 6000, maxHp: 6000, dano: 60, recompensaOuro: 3400, recompensaXp: 4500, isBoss: true, imagem: "lorde,jpeg" } }
};

const imagensClasses = { "Guerreiro": "guerreiro.jpeg", "Mago": "mago.jpeg", "Arqueiro": "arqueiro.jpeg" };

function salvarJogo() {
    try {
        localStorage.setItem("rpg_save", JSON.stringify(player));
        adicionarAoLog(`💾 <em>Progresso salvo!</em>`);
    } catch (e) {
        console.log("Save desativado devido a restrições do navegador.");
    }
}

function carregarJogo() {
    const save = localStorage.getItem("rpg_save");
    if (save) {
        player = JSON.parse(save);
        prepararInterfaceJogo();
        adicionarAoLog(`Bem-vindo de volta, ${player.nome}!`);
    } else {
        alert("Nenhum jogo salvo encontrado!");
    }
}

function iniciarJogo() {
    player.nome = document.getElementById("char-name").value.trim() || "Herói Anônimo";
    player.classe = document.getElementById("char-class").value;

    if (player.classe === "Guerreiro") { player.maxHp = 130; player.dano = 12; player.maxMp = 40; } 
    else if (player.classe === "Mago") { player.maxHp = 80; player.dano = 22; player.maxMp = 100; } 
    else if (player.classe === "Arqueiro") { player.maxHp = 100; player.dano = 16; player.maxMp = 60; }
    
    player.hp = player.maxHp;
    player.mp = player.maxMp;
    player.imagem = imagensClasses[player.classe];
    player.pocoes = 1;
    player.faseAtual = 1;
    player.nivel = 1;
    player.xp = 0;
    player.xpNecessario = 100;
    player.ouro = 100;
    player.abatesNaFase = 0;

    prepararInterfaceJogo();
    adicionarAoLog(`Uma nova jornada se inicia...`);
    salvarJogo();
}

function prepararInterfaceJogo() {
    document.getElementById("display-name").innerText = player.nome;
    document.getElementById("display-class").innerText = "🛡️ " + player.classe;
    document.getElementById("player-img").src = player.imagem;
    
    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");

    atualizarAmbienteFase();
    proximoInimigo(true);
    atualizarPrateleiraLoja();
}

function atualizarAmbienteFase() {
    const dados = bancoDeFases[player.faseAtual];
    document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(10, 18, 12, 0.85), rgba(0, 0, 0, 0.95)), ${dados.fundo}`;
    document.getElementById("ambient-title").innerHTML = `<strong>${dados.titulo}</strong> - ${dados.descricao}`;
}

function definirInimigo(dados) {
    let ciclos = Math.floor(player.nivel / 5);
    let mult = 1 + (ciclos * 0.5); 
    enemy.nome = dados.nome;
    enemy.isBoss = dados.isBoss || false;
    enemy.categoria = ciclos > 0 && !enemy.isBoss ? dados.categoria + ` (+${ciclos})` : dados.categoria;
    enemy.maxHp = Math.floor(dados.maxHp * mult); enemy.hp = enemy.maxHp; 
    enemy.dano = Math.floor(dados.dano * mult);
    enemy.recompensaOuro = Math.floor(dados.recompensaOuro * mult);
    enemy.recompensaXp = Math.floor(dados.recompensaXp * mult);
    enemy.imagem = dados.imagem;
    atualizarPainelVisual();
}

function proximoInimigo(inicio = false) {
    const dados = bancoDeFases[player.faseAtual];
    let alvo;

    if (player.abatesNaFase >= 4) { alvo = dados.boss; if (!inicio) adicionarAoLog(`🔥 <span style="color:#ef4444;">BOSS APARECEU!</span>`); } 
    else { alvo = dados.inimigos[Math.floor(Math.random() * dados.inimigos.length)]; if (!inicio) adicionarAoLog(`👣 Inimigo surgiu: <strong>${alvo.nome}</strong>!`); }

    definirInimigo(alvo);
    player.mp = Math.min(player.maxMp, player.mp + 10);

    document.getElementById("next-enemy-btn").classList.add("hidden");
    document.getElementById("btn-atacar").disabled = false;
    document.getElementById("btn-especial").disabled = false;
    atualizarPainelVisual();
}

function atacar() { executarTurno(player.dano, "atacou"); }

function atacarEspecial() {
    if (player.mp >= 20) {
        player.mp -= 20;
        let danoEspecial = Math.floor(player.dano * 2.5);
        executarTurno(danoEspecial, "usou MAGIA especial em");
    } else {
        adicionarAoLog(`⚠️ Você não tem Mana (MP) suficiente! (Custa 20)`);
    }
}

function executarTurno(danoJogador, textoAcao) {
    if (enemy.hp <= 0 || player.hp <= 0) return;

    enemy.hp -= danoJogador;
    if (enemy.hp < 0) enemy.hp = 0;
    animarDanoCard("enemy-card");
    adicionarAoLog(`💥 Você ${textoAcao} ${enemy.nome} causando <span style="color: #ef4444;">${danoJogador} dano</span>!`);
    atualizarPainelVisual();

    if (enemy.hp <= 0) {
        processarVitoria();
        return; 
    }

    document.getElementById("btn-atacar").disabled = true;
    document.getElementById("btn-especial").disabled = true;

    setTimeout(() => {
        if (enemy.hp > 0) {
            player.hp -= enemy.dano;
            if (player.hp < 0) player.hp = 0;
            animarDanoCard("player-card");
            adicionarAoLog(`🩸 ${enemy.nome} revidou com <span style="color: #ef4444;">${enemy.dano} de dano</span>!`);
            atualizarPainelVisual();

            document.getElementById("btn-atacar").disabled = false;
            document.getElementById("btn-especial").disabled = false;

            if (player.hp <= 0) adicionarAoLog(`<span style="color: #ef4444; font-weight: bold;">☠️ FIM DE JOGO! Recarregue a página.</span>`);
        }
    }, 500); 
}

function usarPocao() {
    if (player.pocoes > 0 && player.hp < player.maxHp) {
        player.pocoes--;
        let cura = Math.floor(player.maxHp * 0.4);
        player.hp = Math.min(player.maxHp, player.hp + cura);
        adicionarAoLog(`🧪 Você bebeu uma poção e curou <span style="color:#22c55e;">${cura} HP</span>!`);
        atualizarPainelVisual();
    } else if (player.hp >= player.maxHp) {
        adicionarAoLog(`⚠️ Sua saúde já está cheia!`);
    } else {
        adicionarAoLog(`⚠️ Você não tem poções!`);
    }
}

function processarVitoria() {
    adicionarAoLog(`🎉 Vitória! +<span style="color: #ffd700;">${enemy.recompensaOuro}g</span> e +<span style="color: #60a5fa;">${enemy.recompensaXp} XP</span>.`);
    player.ouro += enemy.recompensaOuro;
    ganharExperiencia(enemy.recompensaXp);
    
    document.getElementById("btn-atacar").disabled = true;
    document.getElementById("btn-especial").disabled = true;
    document.getElementById("next-enemy-btn").classList.remove("hidden");

    if (enemy.isBoss) {
        if (player.faseAtual < 3) {
            player.faseAtual++;
            player.abatesNaFase = 0;
            adicionarAoLog(`🚪 <span style="color:#4ade80;">O chefe caiu! Nova fase alcançada!</span>`);
            atualizarAmbienteFase();
        } else {
            adicionarAoLog(`🏆 <span style="color:#ffd700; font-weight:bold;">VOCÊ ZEROU O JOGO!</span>`);
            document.getElementById("next-enemy-btn").classList.add("hidden"); 
        }
    } else { player.abatesNaFase++; }

    salvarJogo(); 
}

function ganharExperiencia(qtd) {
    player.xp += qtd;
    while (player.xp >= player.xpNecessario) {
        player.xp -= player.xpNecessario;
        player.nivel += 1;
        player.xpNecessario = Math.floor(player.xpNecessario * 1.5);
        
        let hpB = player.classe === "Guerreiro" ? 25 : (player.classe === "Mago" ? 15 : 20);
        let danoB = player.classe === "Guerreiro" ? 3 : (player.classe === "Mago" ? 6 : 4);
        let mpB = player.classe === "Guerreiro" ? 5 : (player.classe === "Mago" ? 15 : 8);

        player.maxHp += hpB; player.hp = player.maxHp; 
        player.maxMp += mpB; player.mp = player.maxMp;
        player.dano += danoB;
        adicionarAoLog(`🌟 <strong>NÍVEL ${player.nivel}!</strong> Status subiram. HP/MP restaurados!`);
    }
}

function atualizarPrateleiraLoja() {
    const container = document.getElementById("shop-items");
    container.innerHTML = ""; 
    const itens = player.classe === "Guerreiro" ? [{n: "🛡️ Armadura (+40 Max HP)", c: 45, t: "hp", v: 40}, {n: "🪓 Machado (+6 Dano)", c: 55, t: "dano", v: 6}] : 
                  player.classe === "Mago" ? [{n: "👘 Manto (+20 Max HP)", c: 35, t: "hp", v: 20}, {n: "🔮 Grimório (+12 Dano)", c: 65, t: "dano", v: 12}] : 
                  [{n: "👢 Botas (+25 Max HP)", c: 35, t: "hp", v: 25}, {n: "🏹 Arco (+9 Dano)", c: 55, t: "dano", v: 9}];

    itens.push({n: "🧪 Poção de Cura", c: 25, t: "pocao", v: 1});

    itens.forEach(i => {
        let btn = document.createElement("button");
        btn.className = "shop-btn";
        btn.innerHTML = `${i.n}<br><strong style="color: #ffd700;">${i.c}g</strong>`;
        btn.onclick = () => {
            if(player.ouro >= i.c) {
                player.ouro -= i.c;
                if(i.t === "hp") { player.maxHp += i.v; player.hp += i.v; } 
                else if (i.t === "dano") { player.dano += i.v; }
                else if (i.t === "pocao") { player.pocoes += i.v; }
                
                adicionarAoLog(`🛍️ Comprou <strong>${i.n}</strong>!`);
                atualizarPainelVisual();
                salvarJogo(); 
            } else adicionarAoLog(`⚠️ Ouro insuficiente!`);
        };
        container.appendChild(btn);
    });
}

function atualizarPainelVisual() {
    document.getElementById("display-gold").innerText = player.ouro;
    document.getElementById("display-damage").innerText = player.dano;
    document.getElementById("display-level").innerText = player.nivel;
    document.getElementById("display-potions").innerText = player.pocoes;
    
    document.getElementById("player-hp-text").innerText = `${player.hp}/${player.maxHp}`;
    document.getElementById("player-hp-bar").style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
    
    document.getElementById("player-mp-text").innerText = `${player.mp}/${player.maxMp}`;
    document.getElementById("player-mp-bar").style.width = `${Math.max(0, (player.mp / player.maxMp) * 100)}%`;

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

function animarDanoCard(id) { let el = document.getElementById(id); el.classList.add("damage-blink"); setTimeout(() => el.classList.remove("damage-blink"), 400); }
function adicionarAoLog(msg) { let box = document.getElementById("combat-log"); box.innerHTML += `<div class="log-entry">> ${msg}</div>`; box.scrollTop = box.scrollHeight; }
