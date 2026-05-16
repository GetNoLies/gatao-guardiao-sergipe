# Gatão: O Guardião das Cidades Sergipanas

**Gatão: O Guardião das Cidades Sergipanas** é um jogo educativo em formato de quiz cultural, desenvolvido como parte de um projeto MVP da faculdade.

O jogo acompanha Gatão em uma jornada por locais inspirados em cidades e pontos culturais de Sergipe. O jogador responde perguntas, coleta itens culturais, avança pelas fases e tenta concluir a aventura sem perder toda a vida.

## Objetivo do Projeto

O objetivo principal desta implementação é demonstrar:

- Tratamento de exceções;
- Persistência de dados;
- Validação de entradas;
- Organização básica de um projeto front-end;
- Simulação visual de regras de jogo.

A parte desenvolvida busca garantir que o jogo não quebre com entradas inválidas e que consiga salvar, carregar e limpar o progresso do jogador por meio de uma camada de persistência.

## Tecnologias Utilizadas

- HTML5;
- CSS3;
- JavaScript;
- LocalStorage.

## Estrutura do Projeto

```txt
gatao-quiz/
│
├── index.html
├── style.css
├── data.js
├── storage.js
└── script.js
```

## Função de Cada Arquivo

### `index.html`

Contém a estrutura da interface do jogo, incluindo:

- Tela inicial;
- Área do quiz;
- Status do jogador;
- Inventário;
- Histórico;
- Tela visual simulada do personagem.

### `style.css`

Contém toda a estilização visual do projeto, como:

- Layout da página;
- Cores;
- Animações;
- Tela de vitória;
- Tela de Game Over;
- Simulação visual do personagem Gatão.

### `data.js`

Contém os dados principais do jogo, como:

- Configurações gerais;
- Fases;
- Locais;
- Itens coletáveis;
- Perguntas e alternativas do quiz.

### `storage.js`

Representa a camada de persistência do projeto.

Possui os métodos:

```js
Persistence.save(data)
```

Salva o progresso do jogador no `localStorage`.

```js
Persistence.load()
```

Carrega o progresso salvo.

```js
Persistence.clear()
```

Remove os dados salvos.

### `script.js`

Contém a lógica principal do jogo, incluindo:

- Início da partida;
- Salvamento do progresso;
- Carregamento do progresso;
- Reset da partida;
- Validação do nome do jogador;
- Sorteio de perguntas;
- Embaralhamento das alternativas;
- Verificação de resposta correta;
- Sistema de dano;
- Sistema de cura;
- Coleta de itens;
- Avanço de fase;
- Game Over;
- Vitória.

## Mecânica do Jogo

1. O jogador informa seu nome.
2. O jogo inicia sempre na fase 1.
3. Uma pergunta cultural é exibida.
4. O jogador escolhe uma alternativa.
5. Se acertar:
   - Coleta o item da fase;
   - Recupera vida, caso tenha perdido;
   - Avança para a próxima fase.
6. Se errar:
   - Perde vida;
   - Recebe uma nova pergunta da mesma fase.
7. Se a vida chegar a 0:
   - O jogo entra em estado de Game Over.
8. Ao concluir a última fase:
   - O jogo exibe a tela de Vitória.

## Tratamento de Exceções

O projeto utiliza uma função central chamada `runSafely()` para encapsular ações importantes dentro de blocos `try/catch`.

Isso impede que o jogo quebre em situações como:

- Tentar iniciar sem informar o nome;
- Tentar carregar um progresso inexistente;
- Responder quando não há pergunta ativa;
- Responder durante a troca de fase;
- Continuar jogando após Game Over;
- Continuar jogando após Vitória.

Quando um erro acontece, o sistema exibe uma mensagem amigável e registra o ocorrido no histórico.

## Persistência de Dados

A persistência é feita com `localStorage`.

O jogo salva informações como:

- Nome do jogador;
- Fase atual;
- Vida;
- Inventário;
- Pergunta atual;
- Perguntas já utilizadas;
- Estado de Game Over;
- Estado de Vitória;
- Estado de partida iniciada.
