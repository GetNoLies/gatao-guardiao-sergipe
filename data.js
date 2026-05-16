const GAME_CONFIG = {
  storageKey: "gatao_quiz_save",
  firstStage: 1,
  initialLife: 100,
  damageByWrongAnswer: 25,
  healByRightAnswer: 15
};

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
      text: "Aracaju foi planejada no século XIX para substituir qual cidade como capital de Sergipe?",
      options: ["São Cristóvão", "Laranjeiras", "Estância", "Itabaiana"],
      correctIndex: 0
    },
    {
      text: "A região dos mercados de Aracaju é importante para o jogo porque representa principalmente:",
      options: [
        "A circulação de produtos, costumes e memória popular",
        "A ausência de relação entre comércio e cultura",
        "Um espaço exclusivamente moderno e sem tradição",
        "Um ponto isolado sem ligação com a cidade"
      ],
      correctIndex: 0
    },
    {
      text: "Qual produto agrícola está historicamente associado ao litoral nordestino e pode ser relacionado ao primeiro item coletável do jogo?",
      options: ["Caju", "Trigo", "Uva", "Maçã"],
      correctIndex: 0
    },
    {
      text: "No contexto do MVP, usar o Centro e os Mercados como primeira fase ajuda a apresentar ao jogador:",
      options: [
        "Um ponto de contato inicial com a cultura urbana sergipana",
        "Uma região sem relevância para a identidade local",
        "Uma fase puramente fictícia sem referência regional",
        "Um cenário voltado apenas para combate"
      ],
      correctIndex: 0
    },
    {
      text: "Qual característica melhor justifica o uso de mercados populares como cenário cultural?",
      options: [
        "Concentram práticas sociais, alimentos, artesanato e memória cotidiana",
        "São espaços sem circulação de pessoas",
        "Servem apenas como decoração sem significado",
        "Representam somente tecnologia industrial"
      ],
      correctIndex: 0
    },
    {
      text: "A primeira fase do jogo funciona como introdução porque:",
      options: [
        "Apresenta elementos cotidianos antes de aprofundar a jornada histórica",
        "Entrega imediatamente o final da narrativa",
        "Ignora o tema cultural do projeto",
        "Remove a necessidade de exploração"
      ],
      correctIndex: 0
    },
    {
      text: "Ao transformar um mercado em fase jogável, o projeto valoriza qual aspecto da cultura?",
      options: [
        "A cultura vivida no dia a dia pelas pessoas",
        "A cultura apenas como documento oficial",
        "A cultura sem relação com espaço urbano",
        "A cultura como algo distante da população"
      ],
      correctIndex: 0
    },
    {
      text: "Qual alternativa melhor representa a relação entre Aracaju e a proposta do jogo?",
      options: [
        "Capital sergipana usada como porta de entrada para a jornada cultural",
        "Cidade estrangeira usada sem vínculo com Sergipe",
        "Local escolhido apenas por acaso, sem função narrativa",
        "Espaço fictício que substitui todos os locais reais"
      ],
      correctIndex: 0
    }
  ],

  2: [
    {
      text: "São Cristóvão tem importância histórica porque foi:",
      options: [
        "Uma das primeiras capitais de Sergipe",
        "A capital atual de Sergipe",
        "Uma cidade planejada no século XXI",
        "Um bairro moderno de Aracaju"
      ],
      correctIndex: 0
    },
    {
      text: "Na lógica do jogo, São Cristóvão representa melhor qual ideia?",
      options: [
        "Memória histórica e preservação patrimonial",
        "Ruptura total com o passado",
        "Tecnologia futurista sem contexto regional",
        "Ambiente natural sem presença humana"
      ],
      correctIndex: 0
    },
    {
      text: "O uso de elementos arquitetônicos antigos nessa fase serve para reforçar:",
      options: [
        "A permanência de marcas históricas no espaço urbano",
        "A inexistência de patrimônio em Sergipe",
        "A ideia de que história não influencia lugares",
        "A substituição da cultura por fantasia pura"
      ],
      correctIndex: 0
    },
    {
      text: "Qual alternativa melhor descreve patrimônio cultural material?",
      options: [
        "Construções, objetos e espaços preservados por seu valor histórico",
        "Apenas músicas transmitidas oralmente",
        "Somente hábitos individuais sem registro",
        "Elementos naturais sem ação humana"
      ],
      correctIndex: 0
    },
    {
      text: "A fase Caminhos da História se diferencia da primeira porque:",
      options: [
        "Aprofunda a relação entre cidade, memória e patrimônio",
        "Abandona qualquer referência cultural",
        "Foca apenas em dano e combate",
        "Remove a exploração do espaço"
      ],
      correctIndex: 0
    },
    {
      text: "Em um jogo educativo-cultural, uma cidade histórica pode funcionar como:",
      options: [
        "Cenário narrativo para aproximar o jogador da memória local",
        "Obstáculo sem significado para a jornada",
        "Elemento visual sem relação com aprendizagem",
        "Lugar usado apenas para aumentar dificuldade"
      ],
      correctIndex: 0
    },
    {
      text: "Qual relação existe entre azulejos, igrejas, praças e casarões antigos?",
      options: [
        "Podem expressar estilos, técnicas e memórias de uma época",
        "São sempre elementos sem valor cultural",
        "Pertencem apenas a jogos de fantasia medieval",
        "Não ajudam a contar a história de uma cidade"
      ],
      correctIndex: 0
    },
    {
      text: "No contexto do projeto, preservar a memória de São Cristóvão significa:",
      options: [
        "Reconhecer sua importância na formação histórica de Sergipe",
        "Apagar referências ao passado",
        "Trocar os locais reais por cenários genéricos",
        "Transformar a cidade em ambiente sem identidade"
      ],
      correctIndex: 0
    }
  ],

  3: [
    {
      text: "A Orla de Atalaia é usada na jornada por estar associada principalmente a:",
      options: [
        "Turismo, litoral e circulação de pessoas",
        "Clima polar e montanhas nevadas",
        "Mineração subterrânea",
        "Arquitetura colonial fechada"
      ],
      correctIndex: 0
    },
    {
      text: "Uma ponte em um jogo de exploração costuma simbolizar:",
      options: [
        "Passagem entre etapas e superação de percurso",
        "Interrupção definitiva da jornada",
        "Ausência de movimento",
        "Retorno obrigatório ao início"
      ],
      correctIndex: 0
    },
    {
      text: "A fase Ventos da Passagem combina melhor com qual sensação de jogo?",
      options: [
        "Movimento, travessia e continuidade",
        "Imobilidade e confinamento",
        "Isolamento subterrâneo",
        "Encerramento imediato da narrativa"
      ],
      correctIndex: 0
    },
    {
      text: "Ao incluir uma paisagem litorânea, o projeto amplia a representação de Sergipe porque:",
      options: [
        "Mostra que a identidade regional também envolve espaços costeiros",
        "Limita Sergipe apenas a centros históricos",
        "Apaga a relação com turismo e paisagem",
        "Transforma todos os locais em ambientes iguais"
      ],
      correctIndex: 0
    },
    {
      text: "Qual alternativa interpreta melhor a ideia de 'passagem' no nome da fase?",
      options: [
        "Transição física e simbólica dentro da jornada",
        "Fim automático do jogo",
        "Perda de todos os itens",
        "Ausência de progresso"
      ],
      correctIndex: 0
    },
    {
      text: "A presença de vento, orla e ponte sugere uma fase mais ligada a:",
      options: [
        "Deslocamento e paisagem aberta",
        "Ambiente fechado e subterrâneo",
        "Arquitetura religiosa colonial",
        "Mercado popular coberto"
      ],
      correctIndex: 0
    },
    {
      text: "No design do jogo, atravessar uma ponte pode ser entendido como:",
      options: [
        "Um recurso visual para indicar avanço na narrativa",
        "Um erro de construção da fase",
        "Uma forma de impedir qualquer progresso",
        "Um elemento sem função simbólica"
      ],
      correctIndex: 0
    },
    {
      text: "A terceira fase prepara o jogador para o final porque:",
      options: [
        "Funciona como etapa de transição antes da conclusão da busca",
        "Resolve a história antes da fase final",
        "Retira todos os elementos culturais",
        "Elimina a necessidade de coletar itens"
      ],
      correctIndex: 0
    }
  ],

  4: [
    {
      text: "A fase final na Praia da Costa - Barra funciona narrativamente como:",
      options: [
        "O encerramento da jornada e recuperação do último elemento",
        "Uma introdução sem impacto na história",
        "Uma fase sem relação com as anteriores",
        "Um retorno obrigatório ao início"
      ],
      correctIndex: 0
    },
    {
      text: "O Monumento do Caranguejo é usado como referência porque se relaciona com:",
      options: [
        "Identidade visual, turismo e cultura litorânea sergipana",
        "Arquitetura europeia medieval",
        "Clima polar",
        "Tecnologia espacial"
      ],
      correctIndex: 0
    },
    {
      text: "Em termos de narrativa, recuperar o último fragmento representa:",
      options: [
        "Completar o objetivo principal da aventura",
        "Cancelar todo o progresso do jogador",
        "Gerar uma derrota automática",
        "Reiniciar a fase inicial"
      ],
      correctIndex: 0
    },
    {
      text: "A conclusão do jogo reforça qual mensagem central do projeto?",
      options: [
        "Valorizar e preservar a memória cultural de Sergipe",
        "Substituir a cultura local por cenários genéricos",
        "Mostrar que os locais reais não importam",
        "Focar apenas em pontuação sem narrativa"
      ],
      correctIndex: 0
    },
    {
      text: "A escolha de uma praia para a fase final amplia o mapa cultural do jogo porque:",
      options: [
        "Inclui também a dimensão litorânea da identidade sergipana",
        "Remove a relação do jogo com Sergipe",
        "Impede a associação com turismo",
        "Transforma a jornada em cenário estrangeiro"
      ],
      correctIndex: 0
    },
    {
      text: "Qual alternativa melhor define a função do item final dentro da lógica do jogo?",
      options: [
        "Representa a peça que completa a missão de Gatão",
        "É apenas um item decorativo sem efeito",
        "Serve para causar dano ao jogador",
        "Apaga o inventário coletado"
      ],
      correctIndex: 0
    },
    {
      text: "A vitória ao final da quarta fase acontece porque:",
      options: [
        "O jogador concluiu o percurso cultural e reuniu os elementos necessários",
        "O jogador errou todas as perguntas",
        "A vida chegou a zero",
        "O jogo foi reiniciado manualmente"
      ],
      correctIndex: 0
    },
    {
      text: "Do ponto de vista do MVP, a tela de vitória serve para demonstrar:",
      options: [
        "Fechamento do fluxo de jogo e mudança de estado da aplicação",
        "Falha no tratamento de exceções",
        "Perda dos dados salvos",
        "Ausência de persistência"
      ],
      correctIndex: 0
    }
  ]
};