

class Personagem {

    constructor(nome) {
        if (new.target === Personagem) {
            throw new Error("Personagem é uma classe abstrata.");
        }

        this.nome = nome;
        this.vidaMaxima = 100;
        this.vida = this.vidaMaxima;
        this.ataque = 20;
        this.defesa = 10;
        this.nivel = 1;
        this.experiencia = 0;
        this.ouro = 100;

        this.arma = null;
        this.armas = [];
        this.itens = [];
    }


    equiparArma(arma) {

        if (this.arma != null) {
            this.ataque -= this.arma.bonus;
        }

        this.arma = arma;
        this.ataque += arma.bonus;

        console.log(`${this.nome} equipou ${arma.nome}`);
    }

    atacar(monstro) {

        let dano = this.ataque + Math.floor(Math.random() * 6);

        // Chance crítica de 20%
        if (Math.floor(Math.random() * 100) < 20) {

            dano *= 2;

            console.log(`⚡ ${this.nome} acertou um GOLPE CRÍTICO! ⚡`);
        }

        console.log(`${this.nome} atacou ${monstro.nome}`);

        monstro.receberDano(dano);

    }

    receberDano(dano) {

        dano -= this.defesa;

        if (dano < 1) {
            dano = 1;
        }

        this.vida -= dano;

        if (this.vida < 0) {
            this.vida = 0;
        }

        console.log(`${this.nome} recebeu ${dano} de dano.`);
        console.log(`Vida restante: ${this.vida}/${this.vidaMaxima}`);

        if (this.vida === 0) {
            console.log(`💀 ${this.nome} foi derrotado!`);
        }

    }

    curar(valor) {

        this.vida += valor;

        if (this.vida > this.vidaMaxima) {
            this.vida = this.vidaMaxima;
        }

        console.log(`${this.nome} recuperou ${valor} de vida!`);
        console.log(`Vida atual: ${this.vida}/${this.vidaMaxima}`);

    }

    estaVivo() {
        return this.vida > 0;
    }

    ganharXP(xp) {

        this.experiencia += xp;

        while (this.experiencia >= 100) {

            this.experiencia -= 100;

            this.nivel++;

            this.vidaMaxima += 20;
            this.vida = this.vidaMaxima;

            this.ataque += 5;
            this.defesa += 3;

            console.log("\n*** LEVEL UP ***");
            console.log(`${this.nome} chegou ao nível ${this.nivel}`);
            console.log(`❤️ Vida máxima aumentada para ${this.vidaMaxima}`);

        }

    }

    adicionarArma(arma) {

        this.armas.push(arma);

        console.log(`${arma.nome} adicionada ao inventário!`);

    }

    adicionarItem(item) {

        this.itens.push(item);

        console.log(`${item.nome} adicionado ao inventário!`);

    }

    mostrarInventario() {

        console.log("\n===== INVENTÁRIO =====");
        console.log(`💰 Ouro: ${this.ouro}`);

        if (this.armas.length > 0) {

            console.log("\n--- Armas ---");

            for (let i = 0; i < this.armas.length; i++) {

                console.log(
                    `${i + 1}. ${this.armas[i].nome} (+${this.armas[i].bonus} ataque)`
                );

            }

        }

        if (this.itens.length > 0) {

            console.log("\n--- Itens ---");

            for (let i = 0; i < this.itens.length; i++) {

                console.log(
                    `${i + 1}. ${this.itens[i].nome} (+${this.itens[i].valor} ${this.itens[i].tipo})`
                );

            }

        }

    }

    mostrarStatus() {

        console.log("\n===== STATUS =====");

        console.log(`Nome: ${this.nome}`);
        console.log(`❤️ Vida: ${this.vida}/${this.vidaMaxima}`);
        console.log(`⚔️ Ataque: ${this.ataque}`);
        console.log(`🛡️ Defesa: ${this.defesa}`);
        console.log(`⭐ Nível: ${this.nivel}`);
        console.log(`📊 XP: ${this.experiencia}/100`);
        console.log(`💰 Ouro: ${this.ouro}`);

        if (this.arma != null) {

            console.log(
                `🗡️ Arma equipada: ${this.arma.nome} (+${this.arma.bonus})`
            );

        }

    }

    habilidade() {

        throw new Error("O método habilidade() deve ser implementado pela subclasse.");

    }

}

class Guerreiro extends Personagem {

    constructor(nome) {
        super(nome);
    }

    habilidade() {

        console.log(`⚔️ ${this.nome} usou Golpe Giratório!`);

    }

}

class Mago extends Personagem {

    constructor(nome) {
        super(nome);
    }

    habilidade() {
        console.log(`🔥 ${this.nome} lançou Bola de Fogo!`);
    }

}

class Arqueiro extends Personagem {

    constructor(nome) {
        super(nome);
    }

    habilidade() {
        console.log(`🏹 ${this.nome} disparou Flecha Precisa!`);
    }

}

class Arma {

    constructor(nome, bonus, preco) {
        this.nome = nome;
        this.bonus = bonus;
        this.preco = preco;
    }

    getNome() {
        return this.nome;
    }

    getBonus() {
        return this.bonus;
    }

    getPreco() {
        return this.preco;
    }

}

class Item {

    constructor(nome, valor, tipo) {
        this.nome = nome;
        this.valor = valor;
        this.tipo = tipo; // "vida" ou "ataque"
    }

    getNome() {
        return this.nome;
    }

    getValor() {
        return this.valor;
    }

getTipo() {
    return this.tipo;
 }
}

class Loja {

    constructor() {

        this.armasDisponiveis = [];
        this.itensDisponiveis = [];

        // Adicionando armas
        this.armasDisponiveis.push(new Arma("Espada de Ferro", 8, 50));
        this.armasDisponiveis.push(new Arma("Machado de Batalha", 12, 80));
        this.armasDisponiveis.push(new Arma("Cajado Mágico", 15, 120));

        // Adicionando itens
        this.itensDisponiveis.push(new Item("Poção de Vida Pequena", 20, "vida"));
        this.itensDisponiveis.push(new Item("Poção de Vida Grande", 50, "vida"));
        this.itensDisponiveis.push(new Item("Poção de Ataque", 10, "ataque"));

    }

    mostrarItens(personagem) {

        console.log("\n===== LOJA =====");
        console.log(`💰 Seu ouro: ${personagem.ouro}`);

        console.log("\n--- Armas ---");

        for (let i = 0; i < this.armasDisponiveis.length; i++) {

            const arma = this.armasDisponiveis[i];

            console.log(
                `${i + 1}. ${arma.getNome()} (+${arma.getBonus()} ataque) - ${arma.getPreco()} ouros`
            );

        }

        console.log("\n--- Itens ---");

        for (let i = 0; i < this.itensDisponiveis.length; i++) {

            const item = this.itensDisponiveis[i];

            console.log(
                `${i + 1 + this.armasDisponiveis.length}. ${item.getNome()} (+${item.getValor()} ${item.getTipo()}) - 20 ouros`
            );

        }

    }

    comprar(personagem, opcao) {

        // Comprar arma
        if (opcao >= 1 && opcao <= this.armasDisponiveis.length) {

            const arma = this.armasDisponiveis[opcao - 1];

            if (personagem.ouro >= arma.getPreco()) {

                personagem.ouro -= arma.getPreco();

                personagem.adicionarArma(arma);

                console.log("✅ Compra realizada com sucesso!");

            } else {

                console.log("❌ Ouro insuficiente!");

            }

        }

        // Comprar item
        else if (
            opcao > this.armasDisponiveis.length &&
            opcao <= this.armasDisponiveis.length + this.itensDisponiveis.length
        ) {

            const item = this.itensDisponiveis[
                opcao - this.armasDisponiveis.length - 1
            ];

            if (personagem.ouro >= 20) {

                personagem.ouro -= 20;

                personagem.adicionarItem(item);

                console.log("✅ Compra realizada com sucesso!");

            } else {

                console.log("❌ Ouro insuficiente!");

            }

        }

        else {

            console.log("❌ Opção inválida!");

        }

    }

}


class Monstro {

    constructor(nome, vida, ataque, defesa, xpRecompensa, ouroRecompensa) {

        this.nome = nome;
        this.vidaMaxima = vida;
        this.vida = this.vidaMaxima;
        this.ataque = ataque;
        this.defesa = defesa;
        this.xpRecompensa = xpRecompensa;
        this.ouroRecompensa = ouroRecompensa;

    }

    atacar(personagem) {

        let dano = this.ataque + Math.floor(Math.random() * 4);

        // Chance de erro (10%)
        if (Math.floor(Math.random() * 100) < 10) {

            console.log(`${this.nome} errou o ataque!`);
            return;

        }

        console.log(`${this.nome} atacou ${personagem.nome}`);

        personagem.receberDano(dano);

    }

    receberDano(dano) {

        dano -= this.defesa;

        if (dano < 1) {
            dano = 1;
        }

        this.vida -= dano;

        if (this.vida < 0) {
            this.vida = 0;
        }

        console.log(`${this.nome} perdeu ${dano} de vida.`);
        console.log(`Vida restante: ${this.vida}/${this.vidaMaxima}`);

        if (this.vida === 0) {

            console.log(`💀 ${this.nome} foi derrotado!`);

        }

    }

    estaVivo() {
        return this.vida > 0;
    }

    getNome() {
        return this.nome;
    }

    getAtaque() {
        return this.ataque;
    }

    getVida() {
        return this.vida;
    }

    getXpRecompensa() {
        return this.xpRecompensa;
    }

    getOuroRecompensa() {
        return this.ouroRecompensa;
    }

}


class Missao {

    constructor(descricao, recompensaXP, recompensaOuro) {

        this.descricao = descricao;
        this.recompensaXP = recompensaXP;
        this.recompensaOuro = recompensaOuro;

    }

    concluir(personagem) {

        console.log("\n📋 Missão concluída!");
        console.log(this.descricao);
        console.log(
            `🏆 Recompensa: ${this.recompensaXP} XP e ${this.recompensaOuro} ouros`
        );

        if (personagem.estaVivo()) {

            personagem.ganharXP(this.recompensaXP);
            personagem.ouro += this.recompensaOuro;

        } else {

            console.log("❌ Personagem está derrotado! Não pode receber recompensa.");

        }

    }

}


function main() {

    const jogador = new Guerreiro("Arthur");

    // Criando arma inicial
    const espada = new Arma("Espada de Ferro", 8, 50);

    jogador.adicionarArma(espada);
    jogador.equiparArma(espada);

    // Criando monstros
    const slime = new Monstro("Slime", 30, 5, 2, 30, 10);
    const goblin = new Monstro("Goblin", 50, 8, 3, 40, 20);
    const lobo = new Monstro("Lobo Selvagem", 60, 12, 4, 50, 30);

    jogador.mostrarStatus();
    jogador.habilidade();


    console.log("\n=== BATALHA 1 ===");

    while (jogador.estaVivo() && slime.estaVivo()) {

        jogador.atacar(slime);

        if (slime.estaVivo()) {
            slime.atacar(jogador);
        }

    }

    if (jogador.estaVivo()) {

        jogador.ouro += slime.getOuroRecompensa();

        const missao1 = new Missao(
            "Eliminar o Slime",
            slime.getXpRecompensa(),
            slime.getOuroRecompensa()
        );

        missao1.concluir(jogador);

    }

    jogador.mostrarStatus();

    console.log("\n=== BATALHA 2 ===");

    while (jogador.estaVivo() && goblin.estaVivo()) {

        jogador.atacar(goblin);

        if (goblin.estaVivo()) {
            goblin.atacar(jogador);
        }

    }

    if (jogador.estaVivo()) {

        jogador.ouro += goblin.getOuroRecompensa();

        const missao2 = new Missao(
            "Derrotar o Goblin",
            goblin.getXpRecompensa(),
            goblin.getOuroRecompensa()
        );

        missao2.concluir(jogador);

    }

    jogador.mostrarStatus();


    console.log("\n=== BATALHA 3 ===");

    while (jogador.estaVivo() && lobo.estaVivo()) {

        jogador.atacar(lobo);

        if (lobo.estaVivo()) {
            lobo.atacar(jogador);
        }

    }

    if (jogador.estaVivo()) {

        jogador.ouro += lobo.getOuroRecompensa();

        const missao3 = new Missao(
            "Caçar o Lobo Selvagem",
            lobo.getXpRecompensa(),
            lobo.getOuroRecompensa()
        );

        missao3.concluir(jogador);

    }

    jogador.mostrarStatus();

    jogador.mostrarInventario();

   

    console.log("\n=== USANDO POÇÃO ===");

    jogador.curar(30);



    const loja = new Loja();

    loja.mostrarItens(jogador);

    console.log("\nFim do jogo!");

}// ==========================
// FASE 1 - Floresta Sombria
// ==========================

function fase1(jogador) {

    console.log("==================================");
    console.log("        FASE 1");
    console.log("     FLORESTA SOMBRIA");
    console.log("==================================");

    console.log(
        `${jogador.nome} entrou na Floresta Sombria em busca de monstros.`
    );

    const slime = new Monstro(
        "Slime",
        30,
        5,
        2,
        30,
        10
    );

    console.log("\n⚔ Um Slime apareceu!");

    while (jogador.estaVivo() && slime.estaVivo()) {

        jogador.atacar(slime);

        if (slime.estaVivo()) {
            slime.atacar(jogador);
        }

    }

    if (jogador.estaVivo()) {

        console.log("\n🏆 Você venceu a batalha!");

        const missao = new Missao(
            "Eliminar o Slime",
            slime.getXpRecompensa(),
            slime.getOuroRecompensa()
        );

        missao.concluir(jogador);

        jogador.mostrarStatus();

    } else {

        console.log("\n💀 GAME OVER");

    }

}
const jogador = new Guerreiro("Arthur");

const espada = new Arma("Espada de Ferro", 8, 50);

jogador.adicionarArma(espada);
jogador.equiparArma(espada);

fase1(jogador);
// Executa o jogo
main();
