import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritePanel from './components/FavoritePanel';
import CardAthlete from './components/CardAthlete';

function App() {
  const [query, setQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [playersPerPage] = useState(3);
  const [playersList, setPlayersList] = useState([]);
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  useEffect(() => {
    fetchThingSpeakData();
    const interval = setInterval(() => {
      fetchThingSpeakData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  
  const fetchThingSpeakData = async () => {
    try {
      const fetchLat = await axios.get(
        'https://api.thingspeak.com/channels/2375212/fields/1.json?results=2&api_key=UAL7PW8CRBAK5FAK'
      );

      const fetchLong = await axios.get(
        'https://api.thingspeak.com/channels/2375212/fields/2.json?results=2&api_key=UAL7PW8CRBAK5FAK'
      );

      const latestLatEntry = fetchLat.data.feeds[0];
      const latestLongEntry = fetchLong.data.feeds[0];
    
      const latitude = latestLatEntry.field1;
      const longitude = latestLongEntry.field2;

      setLocationData({ latitude, longitude });
      console.log("latitude: ", latitude);
      console.log("longitude: ", longitude);
    } catch (error) {
      console.error('Erro recuperando dados da API:', error);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${query}`
      );
      const basketballPlayers = response.data.player.filter(
        (player) => player.strSport === 'Basketball'
      );

      setPlayersList(basketballPlayers);
      setPlayers(basketballPlayers.slice(0, playersPerPage));
      setPage(1);
    } catch (error) {
      console.error('Error searching for players:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePlayers = () => {
    const startIndex = page * playersPerPage;
    const nextPlayers = playersList.slice(startIndex, startIndex + playersPerPage);
    setPlayers(nextPlayers);
    setPage(page + 1);
  };

  const addToFavorites = (player) => {
    if (!favoritePlayers.some((favPlayer) => favPlayer.idPlayer === player.idPlayer)) {
      setFavoritePlayers([...favoritePlayers, player]);
    } else {
      alert("esse jogador já se encontra nos favoritos!");
    }
  };

  return (
    <div className="container">
      <div className="row">
      <div className="col mx-auto text-center mb-2">
          {locationData.latitude !== null && locationData.longitude !== null && (
            <>
              <h3>latitude: {locationData.latitude}</h3>
              <h3>longitude: {locationData.longitude}</h3>
            </>
          )}
        </div>
        </div>
      <div className="row">
        <div className="col">
          <div className="input-group mb-3 mx-auto" style={{ width: '50%' }}>
            <input
              type="text"
              className="form-control"
              placeholder="insira o nome do jogador"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-warning"
                type="button"
                onClick={handleSearch}
              >
                buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {isLoading ? (
          <div className="col text-center">
            <p>carregando...</p>
          </div>
        ) : players.length > 0 ? (
          players.map((player) => (
            <CardAthlete key={player.idPlayer} player={player} addToFavorites={addToFavorites} />
          ))
        ) : (
          <div className="col text-center">
            {query && <p>nenhum jogador encontrado.</p>}
          </div>
        )}
      </div>
      {players.length > 0 && !isLoading && (
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-secondary" onClick={loadMorePlayers}>
              Procurar Mais
            </button>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col">
          <FavoritePanel favoritePlayers={favoritePlayers} />
        </div>
      </div>
    </div>
  );
}

export default App;
