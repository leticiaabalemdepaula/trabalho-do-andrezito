import java.util.ArrayList;
import java.util.Random;

abstract class Personagem {

    protected String nome;
    protected int vida;
    protected int vidaMaxima;
    protected int ataque;
    protected int defesa;
    protected int nivel;
    protected int experiencia;
    protected int ouro;
    protected Arma arma;
    protected ArrayList<Arma> armas;
    protected ArrayList<Item> itens;

    public Personagem(String nome){
        this.nome = nome;
        this.vidaMaxima = 100;
        this.vida = vidaMaxima;
        this.ataque = 20;
        this.defesa = 10;
        this.nivel = 1;
        this.experiencia = 0;
        this.ouro = 100;
        this.armas = new ArrayList<>();
        this.itens = new ArrayList<>();
    }

    public void equiparArma(Arma arma){
        // Remove o bônus da arma anterior se houver
        if(this.arma != null){
            this.ataque -= this.arma.getBonus();
        }
        
        this.arma = arma;
        this.ataque += arma.getBonus();
        System.out.println(nome + " equipou " + arma.getNome());
    }

    public void atacar(Monstro monstro){
        Random r = new Random();
        
        // Dano base com variação
        int dano = ataque + r.nextInt(6);
        
        // Chance crítica (20%)
        if(r.nextInt(100) < 20){
            dano *= 2;
            System.out.println("⚡ " + nome + " acertou um GOLPE CRÍTICO! ⚡");
        }

        System.out.println(nome + " atacou " + monstro.getNome());
        monstro.receberDano(dano);
    }

    public void receberDano(int dano){
        dano -= defesa;

        if(dano < 1){
            dano = 1;
        }

        vida -= dano;

        if(vida < 0){
            vida = 0;
        }

        System.out.println(nome + " recebeu " + dano + " de dano.");
        System.out.println("Vida restante: " + vida + "/" + vidaMaxima);

        if(vida == 0){
            System.out.println("💀 " + nome + " foi derrotado!");
        }
    }

    public void curar(int valor){
        vida += valor;
        
        if(vida > vidaMaxima){
            vida = vidaMaxima;
        }
        
        System.out.println(nome + " recuperou " + valor + " de vida!");
        System.out.println("Vida atual: " + vida + "/" + vidaMaxima);
    }

    public boolean estaVivo(){
        return vida > 0;
    }

    public void ganharXP(int xp){
        experiencia += xp;

        while(experiencia >= 100){
            experiencia -= 100;
            nivel++;
            vidaMaxima += 20;
            vida = vidaMaxima; // Cura completa ao upar
            ataque += 5;
            defesa += 3;

            System.out.println("\n*** LEVEL UP ***");
            System.out.println(nome + " chegou ao nível " + nivel);
            System.out.println("❤️ Vida máxima aumentada para " + vidaMaxima);
        }
    }

    public void adicionarArma(Arma arma){
        armas.add(arma);
        System.out.println(arma.getNome() + " adicionada ao inventário!");
    }

    public void adicionarItem(Item item){
        itens.add(item);
        System.out.println(item.getNome() + " adicionado ao inventário!");
    }

    public void mostrarInventario(){
        System.out.println("\n===== INVENTÁRIO =====");
        System.out.println("💰 Ouro: " + ouro);
        
        if(!armas.isEmpty()){
            System.out.println("\n--- Armas ---");
            for(int i = 0; i < armas.size(); i++){
                System.out.println((i+1) + ". " + armas.get(i).getNome() + " (+" + armas.get(i).getBonus() + " ataque)");
            }
        }
        
        if(!itens.isEmpty()){
            System.out.println("\n--- Itens ---");
            for(int i = 0; i < itens.size(); i++){
                System.out.println((i+1) + ". " + itens.get(i).getNome() + " (+" + itens.get(i).getValor() + " " + itens.get(i).getTipo() + ")");
            }
        }
    }

    public void mostrarStatus(){
        System.out.println("\n===== STATUS =====");
        System.out.println("Nome: " + nome);
        System.out.println("❤️ Vida: " + vida + "/" + vidaMaxima);
        System.out.println("⚔️ Ataque: " + ataque);
        System.out.println("🛡️ Defesa: " + defesa);
        System.out.println("⭐ Nível: " + nivel);
        System.out.println("📊 XP: " + experiencia + "/100");
        System.out.println("💰 Ouro: " + ouro);

        if(arma != null){
            System.out.println("🗡️ Arma equipada: " + arma.getNome() + " (+" + arma.getBonus() + ")");
        }
    }

    public abstract void habilidade();
}

class Guerreiro extends Personagem{
    public Guerreiro(String nome){
        super(nome);
    }

    @Override
    public void habilidade(){
        System.out.println("⚔️ " + nome + " usou Golpe Giratório!");
    }
}

class Mago extends Personagem{
    public Mago(String nome){
        super(nome);
    }

    @Override
    public void habilidade(){
        System.out.println("🔥 " + nome + " lançou Bola de Fogo!");
    }
}

class Arqueiro extends Personagem{
    public Arqueiro(String nome){
        super(nome);
    }

    @Override
    public void habilidade(){
        System.out.println("🏹 " + nome + " disparou Flecha Precisa!");
    }
}

class Arma{
    private String nome;
    private int bonus;
    private int preco;

    public Arma(String nome, int bonus, int preco){
        this.nome = nome;
        this.bonus = bonus;
        this.preco = preco;
    }

    public String getNome(){
        return nome;
    }

    public int getBonus(){
        return bonus;
    }

    public int getPreco(){
        return preco;
    }
}

class Item{
    private String nome;
    private int valor;
    private String tipo; // "vida" ou "ataque"

    public Item(String nome, int valor, String tipo){
        this.nome = nome;
        this.valor = valor;
        this.tipo = tipo;
    }

    public String getNome(){
        return nome;
    }

    public int getValor(){
        return valor;
    }

    public String getTipo(){
        return tipo;
    }
}

class Loja{
    private ArrayList<Arma> armasDisponiveis;
    private ArrayList<Item> itensDisponiveis;

    public Loja(){
        armasDisponiveis = new ArrayList<>();
        itensDisponiveis = new ArrayList<>();
        
        // Adicionando itens à loja
        armasDisponiveis.add(new Arma("Espada de Ferro", 8, 50));
        armasDisponiveis.add(new Arma("Machado de Batalha", 12, 80));
        armasDisponiveis.add(new Arma("Cajado Mágico", 15, 120));
        
        itensDisponiveis.add(new Item("Poção de Vida Pequena", 20, "vida"));
        itensDisponiveis.add(new Item("Poção de Vida Grande", 50, "vida"));
        itensDisponiveis.add(new Item("Poção de Ataque", 10, "ataque"));
    }

    public void mostrarItens(){
        System.out.println("\n===== LOJA =====");
        System.out.println("💰 Seu ouro: " + ouro);
        
        System.out.println("\n--- Armas ---");
        for(int i = 0; i < armasDisponiveis.size(); i++){
            Arma a = armasDisponiveis.get(i);
            System.out.println((i+1) + ". " + a.getNome() + " (+" + a.getBonus() + " ataque) - " + a.getPreco() + " ouros");
        }
        
        System.out.println("\n--- Itens ---");
        for(int i = 0; i < itensDisponiveis.size(); i++){
            Item item = itensDisponiveis.get(i);
            System.out.println((i+1+armasDisponiveis.size()) + ". " + item.getNome() + " (+" + item.getValor() + " " + item.getTipo() + ") - 20 ouros");
        }
    }

    public void comprar(Personagem personagem, int opcao){
        // Verifica se a opção é uma arma
        if(opcao >= 1 && opcao <= armasDisponiveis.size()){
            Arma arma = armasDisponiveis.get(opcao - 1);
            if(personagem.ouro >= arma.getPreco()){
                personagem.ouro -= arma.getPreco();
                personagem.adicionarArma(arma);
                System.out.println("✅ Compra realizada com sucesso!");
            } else {
                System.out.println("❌ Ouro insuficiente!");
            }
        }
        // Verifica se é um item
        else if(opcao > armasDisponiveis.size() && opcao <= armasDisponiveis.size() + itensDisponiveis.size()){
            Item item = itensDisponiveis.get(opcao - armasDisponiveis.size() - 1);
            if(personagem.ouro >= 20){ // Preço fixo para itens
                personagem.ouro -= 20;
                personagem.adicionarItem(item);
                System.out.println("✅ Compra realizada com sucesso!");
            } else {
                System.out.println("❌ Ouro insuficiente!");
            }
        } else {
            System.out.println("❌ Opção inválida!");
        }
    }
}

class Monstro{
    private String nome;
    private int vida;
    private int vidaMaxima;
    private int ataque;
    private int defesa;
    private int xpRecompensa;
    private int ouroRecompensa;

    public Monstro(String nome, int vida, int ataque, int defesa, int xpRecompensa, int ouroRecompensa){
        this.nome = nome;
        this.vidaMaxima = vida;
        this.vida = vidaMaxima;
        this.ataque = ataque;
        this.defesa = defesa;
        this.xpRecompensa = xpRecompensa;
        this.ouroRecompensa = ouroRecompensa;
    }

    public void atacar(Personagem personagem){
        Random r = new Random();
        
        // Variação no dano do monstro
        int dano = ataque + r.nextInt(4);
        
        // Chance de erro do monstro (10%)
        if(r.nextInt(100) < 10){
            System.out.println(nome + " errou o ataque!");
            return;
        }

        System.out.println(nome + " atacou " + personagem.nome);
        personagem.receberDano(dano);
    }

    public void receberDano(int dano){
        dano -= defesa;

        if(dano < 1){
            dano = 1;
        }

        vida -= dano;

        if(vida < 0){
            vida = 0;
        }

        System.out.println(nome + " perdeu " + dano + " de vida.");
        System.out.println("Vida restante: " + vida + "/" + vidaMaxima);

        if(vida == 0){
            System.out.println("💀 " + nome + " foi derrotado!");
        }
    }

    public boolean estaVivo(){
        return vida > 0;
    }

    public String getNome(){
        return nome;
    }

    public int getAtaque(){
        return ataque;
    }

    public int getVida(){
        return vida;
    }

    public int getXpRecompensa(){
        return xpRecompensa;
    }

    public int getOuroRecompensa(){
        return ouroRecompensa;
    }
}

class Missao{
    private String descricao;
    private int recompensaXP;
    private int recompensaOuro;

    public Missao(String descricao, int recompensaXP, int recompensaOuro){
        this.descricao = descricao;
        this.recompensaXP = recompensaXP;
        this.recompensaOuro = recompensaOuro;
    }

    public void concluir(Personagem personagem){
        System.out.println("\n📋 Missão concluída!");
        System.out.println(descricao);
        System.out.println("🏆 Recompensa: " + recompensaXP + " XP e " + recompensaOuro + " ouros");

        if(personagem.estaVivo()){
            personagem.ganharXP(recompensaXP);
            personagem.ouro += recompensaOuro;
        } else {
            System.out.println("❌ Personagem está derrotado! Não pode receber recompensa.");
        }
    }
}

public class Main {
    public static void main(String[] args){
        Random r = new Random();
        Guerreiro jogador = new Guerreiro("Arthur");
        
        // Criando armas iniciais
        Arma espada = new Arma("Espada de Ferro", 8, 50);
        jogador.adicionarArma(espada);
        jogador.equiparArma(espada);
        
        // Criando monstros mais balanceados
        Monstro slime = new Monstro("Slime", 30, 5, 2, 30, 10);
        Monstro goblin = new Monstro("Goblin", 50, 8, 3, 40, 20);
        Monstro lobo = new Monstro("Lobo Selvagem", 60, 12, 4, 50, 30);
        
        jogador.mostrarStatus();
        jogador.habilidade();
        
        // Função de batalha
        System.out.println("\n=== BATALHA 1 ===");
        while(jogador.estaVivo() && slime.estaVivo()){
            jogador.atacar(slime);
            
            if(slime.estaVivo()){
                slime.atacar(jogador);
            }
        }
        
        if(jogador.estaVivo()){
            jogador.ouro += slime.getOuroRecompensa();
            Missao missao1 = new Missao("Eliminar o Slime", slime.getXpRecompensa(), slime.getOuroRecompensa());
            missao1.concluir(jogador);
        }
        
        jogador.mostrarStatus();
        
        // Segunda batalha
        System.out.println("\n=== BATALHA 2 ===");
        while(jogador.estaVivo() && goblin.estaVivo()){
            jogador.atacar(goblin);
            
            if(goblin.estaVivo()){
                goblin.atacar(jogador);
            }
        }
        
        if(jogador.estaVivo()){
            jogador.ouro += goblin.getOuroRecompensa();
            Missao missao2 = new Missao("Derrotar o Goblin", goblin.getXpRecompensa(), goblin.getOuroRecompensa());
            missao2.concluir(jogador);
        }
        
        jogador.mostrarStatus();
        
        // Terceira batalha
        System.out.println("\n=== BATALHA 3 ===");
        while(jogador.estaVivo() && lobo.estaVivo()){
            jogador.atacar(lobo);
            
            if(lobo.estaVivo()){
                lobo.atacar(jogador);
            }
        }
        
        if(jogador.estaVivo()){
            jogador.ouro += lobo.getOuroRecompensa();
            Missao missao3 = new Missao("Caçar o Lobo Selvagem", lobo.getXpRecompensa(), lobo.getOuroRecompensa());
            missao3.concluir(jogador);
        }
        
        jogador.mostrarStatus();
        jogador.mostrarInventario();
        
        // Exemplo de uso de poção
        System.out.println("\n=== USANDO POÇÃO ===");
        jogador.curar(30);
        
        // Exemplo de loja
        Loja loja = new Loja();
        loja.mostrarItens();
        
        System.out.println("\nFim do jogo!");
    }
}