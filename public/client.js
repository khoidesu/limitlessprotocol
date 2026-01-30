document.addEventListener('DOMContentLoaded', () => {

  const socket = io();
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    location.href = '/index.html';
    return;
  }

  const board = document.getElementById('board');
  const teamSelect = document.getElementById('team');

  socket.on('leaderboard', teams => {
    renderBoard(teams);

    if (user.role === 'admin' && teamSelect) {
      fillTeamSelect(teams);
    }
  });

  function renderBoard(teams) {
    if (!board) return;

    board.innerHTML = '';

    // Sort by stations (descending), then by ammo (descending)
    const sortedTeams = [...teams].sort((a, b) => {
      if (b.stations !== a.stations) {
        return b.stations - a.stations;
      }
      return b.ammo - a.ammo;
    });

    sortedTeams.forEach((t, i) => {
      const tr = document.createElement('tr');

      if (user.role === 'team' && t.name === user.team) {
        tr.classList.add('me');
      }

      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${t.score}</td>
        <td>${t.ammo}</td>
        <td>${t.stations} / 6</td>
      `;

      board.appendChild(tr);
    });
  }

  function fillTeamSelect(teams) {
    teamSelect.innerHTML = '<option value="">-- Select Team --</option>';

    teams.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.name;
      opt.textContent = t.name;
      teamSelect.appendChild(opt);
    });
  }

});
