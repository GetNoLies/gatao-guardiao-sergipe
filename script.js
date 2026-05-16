const STORAGE_KEY = "gatao_quiz_save";

const FIRST_STAGE = 1;
const DAMAGE_BY_WRONG_ANSWER = 25;
const HEAL_BY_RIGHT_ANSWER = 15;

const stages = [
  {
    id: 1,
    name: "O Coração de Aracaju",
    place: "Centro e Mercados",
    icon: "🌰",
    collectible: {
      id: "castanhas_caju",
      name: "Castanhas de Caju"
    }
  },
  {
    id: 2,
    name: "Caminhos da História",
    place: "São Cristóvão",
    icon: "🏛️",
    collectible: {
      id: "azulejos_antigos",
      name: "Azulejos Antigos"
    }
  },
  {
    id: 3,
    name: "Ventos da Passagem",
    place: "Orla de Atalaia e Ponte",
    icon: "⭐",
    collectible: {
      id: "estrela_aracaju",
      name: "Estrela de Aracaju"
    }
  },
  {
    id: 4,
    name: "O Segredo da Costa",
    place: "Praia da Costa - Barra",
    icon: "🔮",
    collectible: {
      id: "fragmento_amuleto",
      name: "Fragmento Final do Amuleto"
    }
  }
];

const questionsByStage = {
  1: [
    {
      text: "Na fase Centro e Mercados, qual item Gatão deve coletar?",
      options: ["Castanhas de Caju", "Azulejos Antigos", "Fragmento do Amuleto", "Estrela de Aracaju"],
      correctIndex: 0
    },
    {
      text: "O Coração de Aracaju representa principalmente qual tipo de ambiente?",
      options: ["Centro e Mercados", "Floresta fechada", "Deserto", "Montanha gelada"],
      correctIndex: 0
    },
    {
      text: "Qual ação combina com a proposta da primeira fase?",
      options: ["Explorar barracas coloridas", "Pilotar uma nave", "Escalar um vulcão", "Lutar em uma arena"],
      correctIndex: 0
    },
    {
      text: "Aracaju é capital de qual estado brasileiro?",
      options: ["Sergipe", "Bahia", "Alagoas", "Pernambuco"],
      correctIndex: 0
    }
  ],
  2: [
    {
      text: "Na fase São Cristóvão, qual item histórico Gatão encontra?",
      options: ["Cocos", "Azulejos Antigos", "Castanhas", "Conchas"],
      correctIndex: 1
    },
    {
      text: "São Cristóvão se destaca no jogo por seu valor ligado a quê?",
      options: ["Futurismo", "História e patrimônio", "Neve", "Mineração espacial"],
      correctIndex: 1
    },
    {
      text: "Qual local é associado à fase Caminhos da História?",
      options: ["Praia da Costa", "São Cristóvão", "Orla de Atalaia", "Centro e Mercados"],
      correctIndex: 1
    },
    {
      text: "Que tipo de objeto combina melhor com memória histórica e arquitetura antiga?",
      options: ["Azulejos Antigos", "Controle remoto", "Capacete espacial", "Raquete"],
      correctIndex: 0
    }
  ],
  3: [
    {
      text: "Na fase Ventos da Passagem, qual ambiente aparece no percurso?",
      options: ["Ponte e Orla de Atalaia", "Caverna subterrânea", "Fazenda nevada", "Castelo europeu"],
      correctIndex: 0
    },
    {
      text: "Qual item é coletado na terceira fase?",
      options: ["Azulejos Antigos", "Castanhas de Caju", "Estrela de Aracaju", "Fragmento Final do Amuleto"],
      correctIndex: 2
    },
    {
      text: "O destaque da fase envolve atravessar uma grande ponte. Qual habilidade isso sugere?",
      options: ["Equilíbrio e atenção", "Mergulho profundo", "Voo espacial", "Escavação"],
      correctIndex: 0
    },
    {
      text: "A Orla de Atalaia está ligada a qual tipo de paisagem?",
      options: ["Litoral", "Gelo", "Deserto", "Montanha"],
      correctIndex: 0
    }
  ],
  4: [
    {
      text: "Na última fase, qual item final Gatão precisa recuperar?",
      options: ["Fragmento Final do Amuleto", "Castanhas de Caju", "Azulejos Antigos", "Estrela de Aracaju"],
      correctIndex: 0
    },
    {
      text: "A fase final acontece em qual localização?",
      options: ["Praia da Costa - Barra", "Centro e Mercados", "São Cristóvão", "Orla de Atalaia"],
      correctIndex: 0
    },
    {
      text: "Qual monumento aparece como destaque da última fase?",
      options: ["Monumento do Caranguejo", "Torre Eiffel", "Cristo Redentor", "Farol da Barra da Bahia"],
      correctIndex: 0
    },
    {
      text: "Ao recuperar o último fragmento, o que acontece com Gatão?",
      options: ["Conclui a aventura com vitória", "Volta para a primeira fase", "Perde automaticamente", "Fica sem inventário"],
      correctIndex: 0
    }
  ]
};

const defaultProgress = {
  playerName: "",
  currentStage: FIRST_STAGE,
  life: 100,
  inventory: [],
  usedQuestions: {},
  currentQuestion: null,
  gameOver: false,
  victory: false,
  started: false,
  transitioning: false
};

let progress = {
  ...defaultProgress,
  inventory: [],
  usedQuestions: {}
};

const persistence = {
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  load() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      throw new Error("Nenhum progresso salvo encontrado.");
    }

    return JSON.parse(data);
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};

function getStage(id = progress.currentStage) {
  return stages.find(stage => stage.id === Number(id));
}

function getFormData() {
  return {
    ...progress,
    playerName: document.querySelector("#playerName").value.trim(),
    currentStage: FIRST_STAGE,
    life: progress.started ? progress.life : 100,
    transitioning: false
  };
}

function validate(data) {
  if (!data.playerName) {
    throw new Error("Informe o nome do jogador.");
  }

  if (!getStage(data.currentStage)) {
    throw new Error("Fase inicial inválida.");
  }
}

function ensureGameIsRunning() {
  if (!progress.started) {
    throw new Error("Inicie o jogo antes de responder.");
  }

  if (progress.transitioning) {
    throw new Error("Aguarde a troca de fase terminar.");
  }

  if (progress.gameOver) {
    throw new Error("Game Over. Resete o jogo para continuar.");
  }

  if (progress.victory) {
    throw new Error("O jogo já foi concluído com vitória. Resete para jogar novamente.");
  }
}

function startGame() {
  runSafely(() => {
    const data = getFormData();

    validate(data);

    progress = {
      ...defaultProgress,
      playerName: data.playerName,
      currentStage: FIRST_STAGE,
      life: 100,
      inventory: [],
      usedQuestions: {},
      started: true
    };

    progress.currentQuestion = getNextQuestion(progress.currentStage);

    persistence.save(progress);

    fillForm();
    updateScreen();
    animateAction("save", "Jogo iniciado");

    showMessage("Jogo iniciado.");
    addLog("Jogador salvo. A aventura começou na fase 1.");
  });
}

function loadGame() {
  runSafely(() => {
    progress = {
      ...defaultProgress,
      ...persistence.load(),
      transitioning: false
    };

    if (progress.started && !progress.currentQuestion && !progress.gameOver && !progress.victory) {
      progress.currentQuestion = getNextQuestion(progress.currentStage);
    }

    fillForm();
    updateScreen();
    animateAction("load", "📂 Carregou");

    showMessage("Progresso carregado.");
    addLog("Dados recebidos da camada de persistência.");
  });
}

function resetGame() {
  runSafely(() => {
    persistence.clear();

    progress = {
      ...defaultProgress,
      inventory: [],
      usedQuestions: {}
    };

    fillForm();
    updateScreen();
    animateAction("reset", "🔄 Reset");

    showMessage("Aguardando ação...");
    addLog("Dados removidos da persistência.");
  });
}

function answerQuestion(selectedIndex) {
  runSafely(() => {
    ensureGameIsRunning();

    if (!progress.currentQuestion) {
      throw new Error("Nenhuma pergunta disponível no momento.");
    }

    const question = progress.currentQuestion;
    const isCorrect = selectedIndex === question.correctIndex;

    if (isCorrect) {
      handleCorrectAnswer();
      return;
    }

    handleWrongAnswer();
  });
}

function handleCorrectAnswer() {
  const stage = getStage();
  const item = stage.collectible;

  if (!hasCollectedItem(item.id)) {
    progress.inventory.push(item);
  }

  const healed = healPlayer();

  updateScreen();
  animateAction("collect", `+ ${item.name}`);
  showItemReward(item);

  showMessage(`Resposta correta! Gatão recebeu um item.`);
  addLog(`Resposta correta na fase ${stage.id}. Item recebido: ${item.name}.`);

  if (healed > 0) {
    addLog(`Gatão recuperou ${healed} de vida.`);
  }

  persistence.save(progress);

  if (stage.id === stages.length) {
    finishGameWithVictory("última pergunta respondida corretamente");
    return;
  }

  moveToNextStage();
}

function handleWrongAnswer() {
  progress.life = Math.max(0, progress.life - DAMAGE_BY_WRONG_ANSWER);

  updateScreen();
  animateAction("damage", `-${DAMAGE_BY_WRONG_ANSWER}`);

  if (progress.life === 0) {
    progress.gameOver = true;
    progress.currentQuestion = null;

    updateScreen();
    showMessage("Game Over! Gatão ficou sem vida.");
    addLog("Resposta errada. Gatão perdeu toda a vida.");
    persistence.save(progress);
    return;
  }

  progress.currentQuestion = getNextQuestion(progress.currentStage);

  updateScreen();
  showMessage("Resposta errada! Gatão recebeu dano.");
  addLog(`Resposta errada. Vida atual: ${progress.life}. Nova pergunta carregada.`);

  persistence.save(progress);
}

function moveToNextStage() {
  const next = progress.currentStage + 1;

  progress.transitioning = true;
  progress.currentQuestion = null;

  updateScreen();
  updateQuizButtons();
  animateAction("advance", "Indo para próxima fase...");
  showMessage("Gatão está caminhando para a próxima fase.");

  setTimeout(() => {
    progress.currentStage = next;
    progress.transitioning = false;
    progress.currentQuestion = getNextQuestion(progress.currentStage);

    updateScreen();
    showMessage("Nova fase iniciada.");
    addLog(`Cenário alterado para a fase ${next}.`);
    persistence.save(progress);
  }, 850);
}

function getNextQuestion(stageId) {
  const questions = questionsByStage[stageId];

  if (!questions || questions.length === 0) {
    throw new Error("Nenhuma pergunta cadastrada para esta fase.");
  }

  if (!progress.usedQuestions[stageId]) {
    progress.usedQuestions[stageId] = [];
  }

  if (progress.usedQuestions[stageId].length >= questions.length) {
    progress.usedQuestions[stageId] = [];
  }

  const availableIndexes = questions
    .map((_, index) => index)
    .filter(index => !progress.usedQuestions[stageId].includes(index));

  const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

  progress.usedQuestions[stageId].push(randomIndex);

  return {
    ...questions[randomIndex],
    stageId,
    questionIndex: randomIndex
  };
}

function hasCollectedItem(itemId) {
  return progress.inventory.some(item => item.id === itemId);
}

function healPlayer() {
  const oldLife = progress.life;
  progress.life = Math.min(100, progress.life + HEAL_BY_RIGHT_ANSWER);

  return progress.life - oldLife;
}

function finishGameWithVictory(reason) {
  progress.victory = true;
  progress.transitioning = false;
  progress.currentQuestion = null;

  updateScreen();
  animateAction("victory", "🏆 Vitória!");

  showMessage("Parabéns! Gatão concluiu a aventura com sucesso.");
  addLog(`Vitória alcançada: ${reason}`);

  persistence.save(progress);
}

function runSafely(action) {
  try {
    action();
  } catch (error) {
    showMessage("Erro: " + error.message);
    addLog("Erro tratado: " + error.message);
    animateAction("error", "⚠️ Erro");
  }
}

function updateScreen() {
  const stage = getStage();

  document.querySelector("#statusName").textContent =
    progress.playerName || "---";

  document.querySelector("#statusStage").textContent =
    stage ? `${stage.id} - ${stage.name}` : "---";

  document.querySelector("#statusPlace").textContent =
    stage ? stage.place : "---";

  document.querySelector("#statusLife").textContent =
    `${progress.life}/100`;

  document.querySelector("#statusGame").textContent =
    getGameStatus();

  renderInventory();
  renderQuestion();
  updateGameScreen(stage);
  updateMessageStyle();
  updateQuizButtons();
}

function getGameStatus() {
  if (progress.gameOver) {
    return "Game Over";
  }

  if (progress.victory) {
    return "Vitória";
  }

  if (progress.transitioning) {
    return "Mudando de fase";
  }

  if (!progress.started) {
    return "Aguardando jogador";
  }

  return "Em andamento";
}

function renderQuestion() {
  const questionText = document.querySelector("#questionText");
  const answers = document.querySelector("#answers");

  if (!progress.started) {
    questionText.textContent = "Inicie o jogo para receber uma pergunta.";
    answers.innerHTML = `<button class="answer-button" disabled>Aguardando...</button>`;
    return;
  }

  if (progress.gameOver) {
    questionText.textContent = "Gatão perdeu a partida. Resete para tentar novamente.";
    answers.innerHTML = `<button class="answer-button" disabled>Game Over</button>`;
    return;
  }

  if (progress.victory) {
    questionText.textContent = "Gatão concluiu a aventura com sucesso!";
    answers.innerHTML = `<button class="answer-button" disabled>Vitória alcançada</button>`;
    return;
  }

  if (progress.transitioning) {
    questionText.textContent = "Gatão está indo para a próxima fase...";
    answers.innerHTML = `<button class="answer-button" disabled>Aguarde...</button>`;
    return;
  }

  if (!progress.currentQuestion) {
    questionText.textContent = "Nenhuma pergunta carregada.";
    answers.innerHTML = `<button class="answer-button" disabled>Indisponível</button>`;
    return;
  }

  questionText.textContent = progress.currentQuestion.text;

  answers.innerHTML = progress.currentQuestion.options
    .map((option, index) => {
      const letter = String.fromCharCode(65 + index);

      return `
        <button class="answer-button quiz-action" onclick="answerQuestion(${index})">
          ${letter}) ${option}
        </button>
      `;
    })
    .join("");
}

function updateQuizButtons() {
  const buttons = document.querySelectorAll(".quiz-action");

  buttons.forEach(button => {
    button.disabled =
      !progress.started ||
      progress.gameOver ||
      progress.victory ||
      progress.transitioning;
  });
}

function updateGameScreen(stage) {
  const scene = document.querySelector("#scene");

  scene.className = `scene stage-${progress.currentStage}`;

  if (progress.gameOver) {
    scene.classList.add("is-game-over");
  }

  if (progress.victory) {
    scene.classList.add("is-victory");
  }

  document.querySelector("#scenePlace").textContent =
    stage ? stage.place : "---";

  document.querySelector("#hudStage").textContent =
    stage ? `${stage.id} - ${stage.name}` : "---";

  document.querySelector("#lifeFill").style.width = `${progress.life}%`;

  document.querySelector("#collectibleScreen").textContent =
    progress.started ? "?" : "?";

  const collectible = stage?.collectible;

  const wasCollected = collectible
    ? progress.inventory.some(item => item.id === collectible.id)
    : false;

  document.querySelector("#collectibleScreen").style.opacity =
    wasCollected ? "0.25" : "1";
}

function renderInventory() {
  const inventory = document.querySelector("#inventory");

  if (progress.inventory.length === 0) {
    inventory.innerHTML = `<span class="item">Vazio</span>`;
    return;
  }

  inventory.innerHTML = progress.inventory
    .map(item => `<span class="item">${item.name}</span>`)
    .join("");
}

function updateMessageStyle() {
  const message = document.querySelector("#message");

  message.classList.remove("game-over-message", "victory-message");

  if (progress.gameOver) {
    message.classList.add("game-over-message");
  }

  if (progress.victory) {
    message.classList.add("victory-message");
  }
}

function showItemReward(item) {
  const reward = document.querySelector("#itemReward");
  const rewardName = document.querySelector("#itemRewardName");
  const rewardIcon = document.querySelector("#itemRewardIcon");

  rewardName.textContent = item.name;
  rewardIcon.textContent = "🎁";

  reward.classList.remove("show");
  void reward.offsetWidth;
  reward.classList.add("show");
}

function fillForm() {
  document.querySelector("#playerName").value = progress.playerName;
}

function showMessage(text) {
  document.querySelector("#message").textContent = text;
}

function addLog(text) {
  const time = new Date().toLocaleTimeString();

  document.querySelector("#log").insertAdjacentHTML(
    "afterbegin",
    `<p>${time} - ${text}</p>`
  );
}

function animateAction(type, text) {
  const player = document.querySelector("#player");
  const floatingText = document.querySelector("#floatingText");
  const hudAction = document.querySelector("#hudAction");

  const animationClass = {
    damage: "damage",
    heal: "heal",
    collect: "collect",
    advance: "advance",
    victory: "victory-jump"
  }[type];

  hudAction.textContent = text;
  floatingText.textContent = text;

  floatingText.classList.remove("float-active");
  void floatingText.offsetWidth;
  floatingText.classList.add("float-active");

  if (animationClass) {
    player.classList.remove("damage", "heal", "collect", "advance", "victory-jump");

    void player.offsetWidth;

    player.classList.add(animationClass);

    setTimeout(() => {
      player.classList.remove(animationClass);
    }, 900);
  }
}

fillForm();
updateScreen();
addLog("Sistema iniciado.");