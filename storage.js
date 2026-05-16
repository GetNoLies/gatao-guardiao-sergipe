const Persistence = {
  save(data) {
    localStorage.setItem(GAME_CONFIG.storageKey, JSON.stringify(data));
  },

  load() {
    const savedData = localStorage.getItem(GAME_CONFIG.storageKey);

    if (!savedData) {
      throw new Error("Nenhum progresso salvo encontrado.");
    }

    return JSON.parse(savedData);
  },

  clear() {
    localStorage.removeItem(GAME_CONFIG.storageKey);
  }
};