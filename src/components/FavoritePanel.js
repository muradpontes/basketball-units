import React from 'react';

const FavoritePanel = ({ favoritePlayers }) => {
  const rows = [];
  for (let i = 0; i < favoritePlayers.length; i += 3) {
    rows.push(favoritePlayers.slice(i, i + 3));
  }

  return (
    <div className="col text-center">
      {favoritePlayers.length > 0 && (
        <div>
          <h2>favoritos⭐</h2>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((player) => (
                <div key={player.idPlayer} className="col-md-4 mb-2">
                  <div className="card" style={{ width: '90%' }}>
                    <img
                      style={{ width: '100%' }}
                      src={player.strThumb}
                      className="card-img-top mx-auto"
                      alt={player.strPlayer}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{player.strPlayer}</h5>
                      <p className="card-text">Nacionalidade: {player.strNationality}</p>
                      <p className="card-text">Time: {player.strTeam}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePanel;
