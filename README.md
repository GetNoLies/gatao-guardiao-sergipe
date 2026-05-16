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

Isso permite que o jogador salve o progresso, atualize a página e depois carregue a partida de onde parou.

## Como Executar Localmente

1. Baixe ou clone este repositório.

```bash
git clone https://github.com/GetNoLies/NOME-DO-REPOSITORIO.git
```

2. Abra a pasta do projeto no VS Code.

3. Abra o arquivo `index.html` no navegador.

Ou, preferencialmente, use a extensão **Live Server** no VS Code:

1. Instale a extensão Live Server;
2. Clique com o botão direito no `index.html`;
3. Escolha **Open with Live Server**.

## Como Publicar no GitHub Pages

1. Envie os arquivos do projeto para um repositório público no GitHub.
2. Acesse o repositório.
3. Vá em **Settings**.
4. Clique em **Pages**.
5. Em **Build and deployment**, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Clique em **Save**.
7. Aguarde alguns minutos.
8. O GitHub irá gerar um link parecido com:

```txt
https://getnolies.github.io/nome-do-repositorio/
```

## Demonstração do Critério Avaliado

Este projeto atende ao critério de **Tratamento de Exceções e Persistência**, pois:

- Valida entradas inválidas;
- Usa `try/catch` para impedir que erros quebrem o jogo;
- Exibe mensagens amigáveis ao usuário;
- Registra eventos no histórico;
- Possui uma camada separada de persistência;
- Salva e recupera dados do jogador;
- Permite continuar a partida após recarregar a página.

## Exemplo Prático para Apresentação

Durante a apresentação, é possível demonstrar o funcionamento da seguinte forma:

1. Iniciar o jogo sem preencher o nome.
2. Mostrar que o sistema exibe uma mensagem de erro e não quebra.
3. Informar o nome do jogador e iniciar a aventura.
4. Responder uma pergunta.
5. Salvar o progresso.
6. Atualizar a página.
7. Carregar o progresso salvo.
8. Mostrar que fase, vida, inventário e estado do jogo foram recuperados.

Também é possível demonstrar o tratamento de regras do jogo:

- Ao errar uma pergunta, Gatão perde vida;
- Ao acertar, Gatão coleta um item e pode recuperar vida;
- Ao chegar a 0 de vida, o jogo entra em Game Over;
- Ao concluir a última fase, o jogo exibe Vitória.

## Organização do Código

O projeto foi separado em arquivos com responsabilidades diferentes:

- `index.html`: estrutura da página;
- `style.css`: aparência e animações;
- `data.js`: dados do jogo;
- `storage.js`: persistência;
- `script.js`: lógica principal.

Essa separação facilita manutenção, leitura e futuras melhorias.

## Autor

Desenvolvido por:

**Symon Rian Barbosa Campos**  
Matrícula: **16033845**
