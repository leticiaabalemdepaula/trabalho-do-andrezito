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
            personagem.equiparArma(arma);
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
// 5. SIMULAÇÃO E EXECUÇÃO DO JOGO (Main)
// ==========================================
const carteira = { moedas: 50 };
const inventario = [];
const loja = new Loja();

// Escolha o herói instanciando a classe desejada:
const heroi = new Guerreiro("Thorin"); 

console.log(`--- SEJA BEM-VINDO AO REINO DE JS ---`);
console.log(heroi.mostrarStatus());
console.log(`Moedas iniciais: ${carteira.moedas}\n`);

// Aceitando uma missão
const missaoPrincipal = new Missao("Expurgo de Goblins", "Derrote 2 Goblins para proteger a vila", 50, 30, 2);
console.log(`📜 Nova missão ativa: "${missaoPrincipal.titulo}" - Recompensa: ${missaoPrincipal.moedasRecompensa} Moedas.`);

// Passando na Loja
console.log("\n" + loja.mostrarProdutos());
console.log(loja.comprarArma(0, heroi, carteira));   // Compra 'Espada Curta'
console.log(loja.comprarItem(0, carteira, inventario)); // Compra 'Poção de Vida P'
console.log(`Moedas restantes: ${carteira.moedas}\n`);

// Combate contra Goblin 1
let goblin = new Monstro("Goblin Saqueador", 40, 15, 5, 40, 15);
console.log(`⚔️ Um ${goblin.nome} selvagem apareceu!`);

while (goblin.estaVivo() && heroi.vida > 0) {
    // Turno do Jogador (Ataque Especial)
    console.log(heroi.ataqueEspecial(goblin));
    console.log(`Vida do ${goblin.nome}: ${goblin.vida}/${goblin.vidaMaxima}`);

    if (goblin.estaVivo()) {
        // Turno do Goblin
        console.log(goblin.atacar(heroi));
        console.log(`Sua Vida: ${heroi.vida}/${heroi.vidaMaxima}\n`);
    }
}

// Pós-combate
if (heroi.vida > 0) {
    console.log(`🎉 Você derrotou o ${goblin.nome}!`);
    console.log(heroi.ganharExperiencia(goblin.xpRecompensa));
    carteira.moedas += goblin.moedasRecompensa;
    console.log(`Moedas recebidas: ${goblin.moedasRecompensa}. Saldo: ${carteira.moedas}`);
    
    // Registra progresso na missão
    let avisoMissao = missaoPrincipal.registrarAbate();
    if (avisoMissao) {
        console.log(avisoMissao);
        heroi.ganharExperiencia(missaoPrincipal.xpRecompensa);
        carteira.moedas += missaoPrincipal.moedasRecompensa;
    }
} else {
    console.log("\n💀 Você foi derrotado! Fim de jogo.");
}

// Usando o item comprado para recuperar vida
if (inventario.length > 0 && heroi.vida > 0) {
    console.log("\n--- Abrindo Inventário ---");
    let itemConsumido = inventario.pop();
    console.log(itemConsumido.usar(heroi));
    console.log(`Sua Vida final: ${heroi.vida}/${heroi.vidaMaxima}`);
}
