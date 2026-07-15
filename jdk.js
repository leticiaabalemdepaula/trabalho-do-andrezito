// ==========================================
// 1. CLASSE BASE: PERSONAGEM
// ==========================================
class Personagem {
    constructor(nome, vidaMaxima, vida, ataque, defesa, nivel, experiencia) {
        this.nome = nome;
        this.vidaMaxima = vidaMaxima;
        this.vida = vida;
        this.ataque = ataque;
        this.defesa = defesa;
        this.nivel = nivel;
        this.experiencia = experiencia;
        this.armaEquipada = null;
    }

    receberDano(dano) {
        let danoFinal = dano - this.defesa;
        if (danoFinal < 0) danoFinal = 0;
        this.vida -= danoFinal;
        if (this.vida < 0) this.vida = 0;
        return danoFinal;
    }

    atacar(inimigo) {
        let poderAtaque = this.ataque;
        if (this.armaEquipada) {
            poderAtaque += this.armaEquipada.bonusAtaque;
        }
        let danoCausado = inimigo.receberDano(poderAtaque);
        return `${this.nome} atacou ${inimigo.nome} e causou ${danoCausado} de dano!`;
    }

    ganharExperiencia(xp) {
        this.experiencia += xp;
        let retorno = `${this.nome} ganhou ${xp} de XP!`;
        if (this.experiencia >= this.nivel * 100) {
            this.experiencia -= this.nivel * 100;
            this.subirNivel();
            retorno += `\n✨ ${this.nome} subiu para o nível ${this.nivel}!`;
        }
        return retorno;
    }

    subirNivel() {
        this.nivel++;
        this.vidaMaxima += 20;
        this.vida = this.vidaMaxima;
        this.ataque += 5;
        this.defesa += 3;
    }

    equiparArma(arma) {
        this.armaEquipada = arma;
        return `${this.nome} equipou ${arma.nome}!`;
    }

    // RESOLVE O ERRO DO SEU HTML:
    adicionarArma(arma) {
        return this.equiparArma(arma);
    }
}

// ==========================================
// 2. CLASSES DOS HERÓIS (Guerreiro, Mago, Arqueiro)
// ==========================================
class Guerreiro extends Personagem {
    constructor(nome) {
        super(nome, 150, 150, 25, 20, 1, 0);
        this.classe = "Guerreiro";
        this.energia = 100;
    }

    ataqueEspecial(inimigo) {
        if (this.energia >= 30) {
            let dano = this.ataque * 2;
            inimigo.receberDano(dano);
            this.energia -= 30;
            return `${this.nome} usou Golpe Poderoso causando ${dano} de dano!`;
        } else {
            return `${this.nome} não possui energia suficiente!`;
        }
    }

    defender() {
        this.defesa += 10;
        return `${this.nome} levantou o escudo e aumentou sua defesa temporariamente!`;
    }

    recuperarEnergia() {
        this.energia += 20;
        if (this.energia > 100) this.energia = 100;
    }

    mostrarStatus() {
        return `Nome: ${this.nome} | Classe: ${this.classe} | Nível: ${this.nivel}\n` +
               `Vida: ${this.vida}/${this.vidaMaxima} | Energia: ${this.energia}/100\n` +
               `Ataque: ${this.ataque} | Defesa: ${this.defesa} | XP: ${this.experiencia}`;
    }
}

class Mago extends Personagem {
    constructor(nome) {
        super(nome, 100, 100, 30, 10, 1, 0);
        this.classe = "Mago";
        this.mana = 120;
        this.manaMaxima = 120;
    }

    ataqueEspecial(inimigo) {
        if (this.mana >= 40) {
            let dano = this.ataque * 2.5;
            inimigo.receberDano(dano);
            this.mana -= 40;
            return `${this.nome} conjurou Bola de Fogo causando ${dano} de dano mágico!`;
        } else {
            return `${this.nome} não possui mana suficiente!`;
        }
    }

    curar() {
        if (this.mana >= 25) {
            let cura = 40;
            this.vida += cura;
            if (this.vida > this.vidaMaxima) this.vida = this.vidaMaxima;
            this.mana -= 25;
            return `${this.nome} usou Cura Divina e recuperou ${cura} de vida!`;
        } else {
            return `${this.nome} não tem mana para curar!`;
        }
    }

    recuperarMana() {
        this.mana += 25;
        if (this.mana > this.manaMaxima) this.mana = this.manaMaxima;
    }

    mostrarStatus() {
        return `Nome: ${this.nome} | Classe: ${this.classe} | Nível: ${this.nivel}\n` +
               `Vida: ${this.vida}/${this.vidaMaxima} | Mana: ${this.mana}/${this.manaMaxima}\n` +
               `Ataque: ${this.ataque} | Defesa: ${this.defesa} | XP: ${this.experiencia}`;
    }
}

class Arqueiro extends Personagem {
    constructor(nome) {
        super(nome, 120, 120, 28, 12, 1, 0);
        this.classe = "Arqueiro";
        this.foco = 100;
    }

    ataqueEspecial(inimigo) {
        if (this.foco >= 35) {
            let dano = this.ataque * 2.2;
            inimigo.receberDano(dano);
            this.foco -= 35;
            return `${this.nome} usou Flecha Perfurante causando ${dano} de dano!`;
        } else {
            return `${this.nome} não possui foco suficiente!`;
        }
    }

    concentrar() {
        this.foco += 30;
        if (this.foco > 100) this.foco = 100;
        this.ataque += 2;
        return `${this.nome} se concentrou, recuperando foco e aumentando levemente o ataque!`;
    }

    mostrarStatus() {
        return `Nome: ${this.nome} | Classe: ${this.classe} | Nível: ${this.nivel}\n` +
               `Vida: ${this.vida}/${this.vidaMaxima} | Foco: ${this.foco}/100\n` +
               `Ataque: ${this.ataque} | Defesa: ${this.defesa} | XP: ${this.experiencia}`;
    }
}

// ==========================================
// 3. EQUIPAMENTOS E ITENS (Arma, Item, Loja)
// ==========================================
class Arma {
    constructor(nome, bonusAtaque, preco) {
        this.nome = nome;
        this.bonusAtaque = bonusAtaque;
        this.preco = preco;
    }
}

class Item {
    constructor(nome, tipo, efeito, valorEfeito, preco) {
        this.nome = nome;
        this.tipo = tipo; // "Cura", "Mana" ou "Energia"
        this.efeito = efeito; 
        this.valorEfeito = valorEfeito;
        this.preco = preco;
    }

    usar(personagem) {
        if (this.tipo === "Cura") {
            personagem.vida += this.valorEfeito;
            if (personagem.vida > personagem.vidaMaxima) {
                personagem.vida = personagem.vidaMaxima;
            }
            return `${personagem.nome} usou ${this.nome} e recuperou ${this.valorEfeito} de vida!`;
        }
        
        if (this.tipo === "Mana" && personagem.classe === "Mago") {
            personagem.mana += this.valorEfeito;
            if (personagem.mana > personagem.manaMaxima) {
                personagem.mana = personagem.manaMaxima;
            }
            return `${personagem.nome} usou ${this.nome} e recuperou ${this.valorEfeito} de mana!`;
        }

        if (this.tipo === "Energia" && personagem.classe === "Guerreiro") {
            personagem.energia += this.valorEfeito;
            if (personagem.energia > 100) personagem.energia = 100;
            return `${personagem.nome} usou ${this.nome} e recuperou ${this.valorEfeito} de energia!`;
        }

        return `${this.nome} não fez efeito no ${personagem.nome}.`;
    }
}

class Loja {
    constructor() {
        this.armasDisponiveis = [
            new Arma("Espada Curta", 5, 20),
            new Arma("Cajado Elemental", 8, 35),
            new Arma("Arco Composto", 6, 25),
            new Arma("Excalibur", 20, 100)
        ];

        this.itensDisponiveis = [
            new Item("Poção de Vida P", "Cura", "Cura Vida", 30, 10),
            new Item("Poção de Vida G", "Cura", "Cura Vida", 80, 25),
            new Item("Poção de Mana", "Mana", "Recupera Mana", 40, 15)
        ];
    }

    mostrarProdutos() {
        let catalogo = "=== LOJA DO REINO ===\n--- Armas ---\n";
        this.armasDisponiveis.forEach((a, i) => {
            catalogo += `[A${i}] ${a.nome} (+${a.bonusAtaque} Atq) - Preço: ${a.preco} moedas\n`;
        });
        catalogo += "\n--- Consumíveis ---\n";
        this.itensDisponiveis.forEach((item, i) => {
            catalogo += `[I${i}] ${item.nome} (${item.tipo}: +${item.valorEfeito}) - Preço: ${item.preco} moedas\n`;
        });
        return catalogo;
    }

    comprarArma(indice, personagem, carteira) {
        let arma = this.armasDisponiveis[indice];
        if (arma && carteira.moedas >= arma.preco) {
            carteira.moedas -= arma.preco;
            personagem.adicionarArma(arma); // Usa o método corrigido compatível com seu HTML
            return `Sucesso! Você comprou e equipou: ${arma.nome}.`;
        }
        return "Moedas insuficientes ou item inválido!";
    }

    comprarItem(indice, carteira, inventario) {
        let item = this.itensDisponiveis[indice];
        if (item && carteira.moedas >= item.preco) {
            carteira.moedas -= item.preco;
            inventario.push(item);
            return `Sucesso! Você comprou e guardou: ${item.nome}.`;
        }
        return "Moedas insuficientes ou item inválido!";
    }
}

// ==========================================
// 4. INIMIGOS E OBJETIVOS (Monstro, Missão)
// ==========================================
class Monstro {
    constructor(nome, vidaMaxima, ataque, defesa, xpRecompensa, moedasRecompensa) {
        this.nome = nome;
        this.vidaMaxima = vidaMaxima;
        this.vida = vidaMaxima;
        this.ataque = ataque;
        this.defesa = defesa;
        this.xpRecompensa = xpRecompensa;
        this.moedasRecompensa = moedasRecompensa;
    }

    receberDano(dano) {
        let danoFinal = dano - this.defesa;
        if (danoFinal < 0) danoFinal = 0;
        this.vida -= danoFinal;
        if (this.vida < 0) this.vida = 0;
        return danoFinal;
    }

    atacar(jogador) {
        let danoCausado = jogador.receberDano(this.ataque);
        return `${this.nome} contra-atacou ${jogador.nome} causando ${danoCausado} de dano!`;
    }

    estaVivo() {
        return this.vida > 0;
    }
}

class Missao {
    constructor(titulo, descricao, xpRecompensa, moedasRecompensa, monstrosNecessarios) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.xpRecompensa = xpRecompensa;
        this.moedasRecompensa = moedasRecompensa;
        this.monstrosNecessarios = monstrosNecessarios;
        this.progresso = 0;
        this.completada = false;
    }

    registrarAbate() {
        if (!this.completada) {
            this.progresso++;
            if (this.progresso >= this.monstrosNecessarios) {
                this.completada = true;
                return `\n🏆 Missão "${this.titulo}" concluída!`;
            }
        }
        return "";
    }
}

// ==========================================
// 5. CONEXÃO COM O HTML (INTEGRAÇÃO DOM)
// ==========================================

// Mapeamento dos elementos visuais do seu HTML
const statusJogadorDiv = document.getElementById("status-jogador") || document.createElement("div");
const statusMonstroDiv = document.getElementById("status-monstro") || document.createElement("div");
const historicoDiv = document.getElementById("historico-combate") || document.createElement("div");

const btnAtacar = document.getElementById("btn-atacar");
const btnEspecial = document.getElementById("btn-especial");
const btnDefender = document.getElementById("btn-defender");
const btnComprarArma = document.getElementById("btn-comprar-arma");
const btnUsarItem = document.getElementById("btn-usar-item");

// Instanciação das entidades ativas do jogo
const jogador = new Guerreiro("Thorin"); 
let monstro = new Monstro("Goblin Saqueador", 50, 12, 3, 40, 15);
const carteiraJogador = { moedas: 50 };
const inventarioJogador = [];
const lojaDoJogo = new Loja();
const missaoAtiva = new Missao("Expurgo de Goblins", "Derrote 2 Goblins", 50, 30, 2);

// Função para manter a interface atualizada
function atualizarInterface() {
    if (statusJogadorDiv) {
        statusJogadorDiv.innerHTML = `<pre>${jogador.mostrarStatus()}\nMoedas: ${carteiraJogador.moedas}\nInventário: ${inventarioJogador.length} itens</pre>`;
    }
    if (statusMonstroDiv) {
        statusMonstroDiv.innerHTML = `<h3>Monstro: ${monstro.nome}</h3>
                                      <p>Vida: ${monstro.vida}/${monstro.vidaMaxima} | Ataque: ${monstro.ataque} | Defesa: ${monstro.defesa}</p>`;
    }
}

// Registrar eventos de clique com segurança (só ativa se o botão existir no HTML)
if (btnAtacar) {
    btnAtacar.addEventListener("click", () => {
        if (jogador.vida <= 0) {
            historicoDiv.innerHTML += `<p style="color: red;">💀 Você está derrotado e não pode atacar!</p>`;
            return;
        }
        if (!monstro.estaVivo()) {
            historicoDiv.innerHTML += `<p>O monstro já está morto. Procure outro combate!</p>`;
            return;
        }

        // Turno do Jogador
        let logAtaque = jogador.atacar(monstro);
        historicoDiv.innerHTML += `<p>${logAtaque}</p>`;

        // Turno do Inimigo
        if (monstro.estaVivo()) {
            let logContraAtaque = monstro.atacar(jogador);
            historicoDiv.innerHTML += `<p style="color: red;">${logContraAtaque}</p>`;
        } else {
            historicoDiv.innerHTML += `<p style="color: green;">🎉 Você derrotou o ${monstro.nome}!</p>`;
            historicoDiv.innerHTML += `<p style="color: green;">${jogador.ganharExperiencia(monstro.xpRecompensa)}</p>`;
            carteiraJogador.moedas += monstro.moedasRecompensa;

            // Registrar progresso da missão
            let logMissao = missaoAtiva.registrarAbate();
            if (logMissao) {
                historicoDiv.innerHTML += `<p style="color: gold;">${logMissao}</p>`;
                jogador.ganharExperiencia(missaoAtiva.xpRecompensa);
                carteiraJogador.moedas += missaoAtiva.moedasRecompensa;
            }
        }
        atualizarInterface();
    });
}

if (btnEspecial) {
    btnEspecial.addEventListener("click", () => {
        if (jogador.vida <= 0 || !monstro.estaVivo()) return;

        let logEspecial = jogador.ataqueEspecial(monstro);
        historicoDiv.innerHTML += `<p style="color: purple;">${logEspecial}</p>`;

        if (monstro.estaVivo()) {
            let logContraAtaque = monstro.atacar(jogador);
            historicoDiv.innerHTML += `<p style="color: red;">${logContraAtaque}</p>`;
        } else {
            historicoDiv.innerHTML += `<p style="color: green;">🎉 Você derrotou o ${monstro.nome}!</p>`;
            jogador.ganharExperiencia(monstro.xpRecompensa);
            carteiraJogador.moedas += monstro.moedasRecompensa;
        }
        atualizarInterface();
    });
}

if (btnDefender) {
    btnDefender.addEventListener("click", () => {
        if (jogador.vida <= 0 || !monstro.estaVivo()) return;
        
        let logDefesa = jogador.defender();
        historicoDiv.innerHTML += `<p style="color: blue;">${logDefesa}</p>`;
        
        let logContraAtaque = monstro.atacar(jogador);
        historicoDiv.innerHTML += `<p style="color: red;">${logContraAtaque}</p>`;
        
        // Remove o bônus temporário de defesa após o ataque do inimigo
        jogador.defesa -= 10; 
        atualizarInterface();
    });
}

if (btnComprarArma) {
    btnComprarArma.addEventListener("click", () => {
        let resultado = lojaDoJogo.comprarArma(0, jogador, carteiraJogador); // Compra Espada Curta (índice 0)
        historicoDiv.innerHTML += `<p style="color: gold;">${resultado}</p>`;
        atualizarInterface();
    });
}

if (btnUsarItem) {
    btnUsarItem.addEventListener("click", () => {
        if (inventarioJogador.length > 0) {
            let item = inventarioJogador.pop();
            let resultado = item.usar(jogador);
            historicoDiv.innerHTML += `<p style="color: green;">${resultado}</p>`;
        } else {
            // Se o inventário estiver vazio, tenta comprar uma poção automaticamente se tiver dinheiro
            if (carteiraJogador.moedas >= 10) {
                lojaDoJogo.comprarItem(0, carteiraJogador, inventarioJogador); // Compra Poção de Vida P
                let item = inventarioJogador.pop();
                let resultado = item.usar(jogador);
                historicoDiv.innerHTML += `<p style="color: green;">Comprou e usou: ${resultado}</p>`;
            } else {
                historicoDiv.innerHTML += `<p style="color: orange;">Sem poções no inventário e sem moedas para comprar!</p>`;
            }
        }
        atualizarInterface();
    });
}

// Inicializa o estado visual da tela no carregamento
atualizarInterface();
