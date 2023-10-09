import React from 'react';

function CardAthlete({ player, addToFavorites }) {
  return (
    <div key={player.idPlayer} className="col-md-4 mb-3">
      <div className="card" style={{ width: '100%' }}>
        <img
          src={player.strThumb}
          className="card-img-top"
          alt={player.strPlayer}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{player.strPlayer}</h5>
          <p className="card-text">Nacionalidade: {player.strNationality}</p>
          <p className="card-text">Time: {player.strTeam}</p>
          <button className="btn btn-primary" onClick={() => addToFavorites(player)}>
            Adicionar aos Favoritos
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAthlete;
