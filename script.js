const defaultProgress = {
  playerName: "",
  currentStage: GAME_CONFIG.firstStage,
  life: GAME_CONFIG.initialLife,
  inventory: [],
  usedQuestions: {},
  currentQuestion: null,
  gameOver: false,
  victory: false,
  started: false,
  transitioning: false
};

let progress = createDefaultProgress();

function createDefaultProgress() {
  return {
    ...defaultProgress,
    inventory: [],
    usedQuestions: {}
  };
}

function getStage(id = progress.currentStage) {
  return stages.find(stage => stage.id === Number(id));
}

function startNewGame() {
  runSafely(() => {
    if (progress.started) {
      saveProgress();
      return;
    }

    const playerName = document.querySelector("#startPlayerName").value.trim();

    validatePlayerName(playerName);

    progress = {
      ...createDefaultProgress(),
      playerName,
      started: true,
      currentQuestion: null
    };

    progress.currentQuestion = getNextQuestion(progress.currentStage);

    Persistence.save(progress);

    showGameArea();
    updateScreen();
    animateAction("save", "Jogo iniciado");

    showMessage("Jogo iniciado.");
    addLog("Jogador salvo. A aventura começou na fase 1.");
  }, true);
}

function saveProgress() {
  runSafely(() => {
    if (!progress.started) {
      throw new Error("Inicie o jogo antes de salvar.");
    }

    Persistence.save(progress);

    updateScreen();
    animateAction("save", "💾 Salvo");

    showMessage("Progresso salvo.");
    addLog("Progresso salvo na camada de persistência.");
  });
}

function loadGame() {
  runSafely(() => {
    progress = {
      ...createDefaultProgress(),
      ...Persistence.load(),
      transitioning: false
    };

    if (progress.started && !progress.currentQuestion && !progress.gameOver && !progress.victory) {
      progress.currentQuestion = getNextQuestion(progress.currentStage);
    }

    showGameArea();
    updateScreen();
    animateAction("load", "📂 Carregou");

    showMessage("Progresso carregado.");
    addLog("Dados recebidos da camada de persistência.");
  }, true);
}

function resetGame() {
  runSafely(() => {
    Persistence.clear();

    progress = createDefaultProgress();

    showStartArea();
    updateScreen();

    document.querySelector("#startPlayerName").value = "";

    showStartMessage("Progresso removido. Informe o nome para iniciar novamente.");
  });
}

function answerQuestion(selectedIndex) {
  runSafely(() => {
    ensureGameIsRunning();

    if (!progress.currentQuestion) {
      throw new Error("Nenhuma pergunta disponível no momento.");
    }

    const isCorrect = selectedIndex === progress.currentQuestion.correctIndex;

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

  showMessage("Resposta correta! Gatão recebeu um item.");
  addLog(`Resposta correta na fase ${stage.id}. Item recebido: ${item.name}.`);

  if (healed > 0) {
    animateAction("heal", `+${healed}`);
    addLog(`Gatão recuperou ${healed} de vida.`);
  }

  Persistence.save(progress);

  if (stage.id === stages.length) {
    finishGameWithVictory("última pergunta respondida corretamente");
    return;
  }

  moveToNextStage();
}

function handleWrongAnswer() {
  progress.life = Math.max(0, progress.life - GAME_CONFIG.damageByWrongAnswer);

  updateScreen();
  animateAction("damage", `-${GAME_CONFIG.damageByWrongAnswer}`);

  if (progress.life === 0) {
    progress.gameOver = true;
    progress.currentQuestion = null;

    updateScreen();
    showMessage("Game Over! Gatão ficou sem vida.");
    addLog("Resposta errada. Gatão perdeu toda a vida.");
    Persistence.save(progress);
    return;
  }

  progress.currentQuestion = getNextQuestion(progress.currentStage);

  updateScreen();
  showMessage("Resposta errada! Gatão recebeu dano.");
  addLog(`Resposta errada. Vida atual: ${progress.life}. Nova pergunta carregada.`);

  Persistence.save(progress);
}

function moveToNextStage() {
  const nextStage = progress.currentStage + 1;

  progress.transitioning = true;
  progress.currentQuestion = null;

  updateScreen();
  animateAction("advance", "Indo para próxima fase...");
  showMessage("Gatão está caminhando para a próxima fase.");

  setTimeout(() => {
    progress.currentStage = nextStage;
    progress.transitioning = false;
    progress.currentQuestion = getNextQuestion(progress.currentStage);

    updateScreen();
    showMessage("Nova fase iniciada.");
    addLog(`Cenário alterado para a fase ${nextStage}.`);

    Persistence.save(progress);
  }, 850);
}

function finishGameWithVictory(reason) {
  progress.victory = true;
  progress.transitioning = false;
  progress.currentQuestion = null;

  updateScreen();
  animateAction("victory", "🏆 Vitória!");

  showMessage("Parabéns! Gatão concluiu a aventura com sucesso.");
  addLog(`Vitória alcançada: ${reason}`);

  Persistence.save(progress);
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

  const selectedQuestion = {
    ...questions[randomIndex],
    stageId,
    questionIndex: randomIndex
  };

  return shuffleQuestionOptions(selectedQuestion);
}

function shuffleQuestionOptions(question) {
  const correctAnswer = question.options[question.correctIndex];

  const shuffledOptions = question.options
    .map(option => ({ option, random: Math.random() }))
    .sort((a, b) => a.random - b.random)
    .map(item => item.option);

  const newCorrectIndex = shuffledOptions.findIndex(option => option === correctAnswer);

  return {
    ...question,
    options: shuffledOptions,
    correctIndex: newCorrectIndex
  };
}

function validatePlayerName(playerName) {
  if (!playerName) {
    throw new Error("Informe o nome do jogador.");
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

function hasCollectedItem(itemId) {
  return progress.inventory.some(item => item.id === itemId);
}

function healPlayer() {
  const oldLife = progress.life;

  progress.life = Math.min(
    GAME_CONFIG.initialLife,
    progress.life + GAME_CONFIG.healByRightAnswer
  );

  return progress.life - oldLife;
}

function runSafely(action, showOnStartScreen = false) {
  try {
    action();
  } catch (error) {
    if (showOnStartScreen) {
      showStartMessage("Erro: " + error.message);
    } else {
      showMessage("Erro: " + error.message);
      addLog("Erro tratado: " + error.message);
      animateAction("error", "⚠️ Erro");
    }
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

  document.querySelector("#collectibleScreen").textContent = "?";

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

function showGameArea() {
  document.querySelector("#startScreen").classList.add("hidden");
  document.querySelector("#gameContainer").classList.remove("hidden");
}

function showStartArea() {
  document.querySelector("#gameContainer").classList.add("hidden");
  document.querySelector("#startScreen").classList.remove("hidden");
}

function showMessage(text) {
  document.querySelector("#message").textContent = text;
}

function showStartMessage(text) {
  document.querySelector("#startMessage").textContent = text;
}

function addLog(text) {
  const log = document.querySelector("#log");

  if (!log) {
    return;
  }

  const time = new Date().toLocaleTimeString();

  log.insertAdjacentHTML(
    "afterbegin",
    `<p>${time} - ${text}</p>`
  );
}

function animateAction(type, text) {
  const player = document.querySelector("#player");
  const floatingText = document.querySelector("#floatingText");
  const hudAction = document.querySelector("#hudAction");

  if (!player || !floatingText || !hudAction) {
    return;
  }

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

showStartArea();
