document.getElementById('game-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const game1 = document.getElementById('game1').value.toLowerCase();
  const game2 = document.getElementById('game2').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "Loading recommendations...";

  // Fetch the games database
  const response = await fetch('games.json');
  const gameDatabase = await response.json();

  // Filter games based on the user input
  const recommendations = gameDatabase.games.filter(game =>
    game.name.toLowerCase().includes(game1) || game.name.toLowerCase().includes(game2)
  );

  // Display results
  resultsDiv.innerHTML = recommendations.length > 0
    ? recommendations.map(game => `<p><strong>${game.name}</strong>: ${game.themes.join(', ')}</p>`).join('')
    : "No recommendations found. Try different games!";
});
