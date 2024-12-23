document.getElementById('game-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const game1 = document.getElementById('game1').value.toLowerCase();
  const game2 = document.getElementById('game2').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "Loading recommendations...";

  // Fetch the games database
  const response = await fetch('games.json');
  const gameDatabase = await response.json();

  // Find matching games
  const inputGames = gameDatabase.games.filter(game =>
    game.name.toLowerCase() === game1 || game.name.toLowerCase() === game2
  );

  if (inputGames.length === 0) {
    resultsDiv.innerHTML = "No matching games found. Try different inputs!";
    return;
  }

  // Gather genres and mechanics from input games
  const inputGenres = inputGames.flatMap(game => game.genres);
  const inputMechanics = inputGames.flatMap(game => game.mechanics);

  // Find recommendations based on shared genres or mechanics
  const recommendations = gameDatabase.games.filter(game =>
    !inputGames.includes(game) &&
    (game.genres.some(genre => inputGenres.includes(genre)) ||
     game.mechanics.some(mechanic => inputMechanics.includes(mechanic)))
  );

  // Display recommendations
  resultsDiv.innerHTML = recommendations.length > 0
    ? `<h2>Recommended Games:</h2>${recommendations.map(game => `
      <p><strong>${game.name}</strong>: ${game.themes.join(', ')}</p>`).join('')}`
    : "No recommendations found. Try different games!";
});
