import logo from './logo.svg';
import './App.css';
import PlayerArea from './PlayerArea';
import { useState, useEffect } from 'react';
function App() {
  const [fieldPlayers, setFieldPlayers] = useState([])
  const [subs, setSubs] = useState([])
  const [newPlayerName, setNewPlayerName] = useState("")
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  useEffect(() => {
    let interval = null;

    if (isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
        console.log("time", time)
        if (fieldPlayers.length > 0) {
          var newFieldPlayers = []
          for (var i = 0; i < fieldPlayers.length; i++) {
            var p = fieldPlayers[i];
            p.time = p.time + 10;
            newFieldPlayers.push(p);
          }
          setFieldPlayers(newFieldPlayers);
        }
        if (subs.length > 0) {
          var newsubs = []
          for (var i = 0; i < subs.length; i++) {
            var p = subs[i];
            p.time = p.time + 10;
            newsubs.push(p);
          }
          setSubs(newsubs);
        }

      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPaused, fieldPlayers, subs]);
  
  const newPlayerNameChange = function (event) {
    setNewPlayerName(event.target.value);
    console.log(event.target.value);
  }

  const addPlayer = function () {
    var player = { name: newPlayerName, time: 0 };
    var newFieldPlayers = [];
    for (var i = 0; i < fieldPlayers.length; i++) {
      newFieldPlayers.push(fieldPlayers[i]);
    }
    newFieldPlayers.push(player);
    setFieldPlayers(newFieldPlayers);
    setNewPlayerName("");
  }

  const removePlayer = function (list, index, setter) {
    console.log("removep layer called on index: " + index, list);
    var newList = [];
    for (var i = 0; i < list.length; i++) {
      if (i === index) {
        continue;
      }
      newList.push(list[i])
    }
    setter(newList);
  }

  const switchPlayers = function (index, currentList, currentSetter, destList, destSetter) {
    var playerToRemove = currentList[index];
    playerToRemove.time = 0;
    var newCurrentList = []
    for (var i = 0; i < currentList.length; i++) {
      if (i === index) continue;
      newCurrentList.push(currentList[i]);
    }
    var newDestList = [];
    for (var i = 0; i < destList.length; i++) {
      newDestList.push(destList[i])
    }
    newDestList.push(playerToRemove);
    currentSetter(newCurrentList);
    destSetter(newDestList);
  }

  const togglePause = function () {
    setIsPaused(!isPaused);
  }

  const reset = function () {
    setTime(0);
    var newFieldPlayers = [];
    for (var i = 0; i < fieldPlayers.length; i++) {
      var p = fieldPlayers[i];
      p.time = 0;
      newFieldPlayers.push(p);
    }
    var newSubs = [];
    for (var i = 0; i < subs.length; i++) {
      var p = subs[i];
      p.time = 0;
      newSubs.push(p);
    }
    setFieldPlayers(newFieldPlayers);
    setSubs(newSubs);
  }
  return (
    <div className="App">
      {isPaused ? <button onClick={togglePause}>Start</button> : <button onClick={togglePause}>Stop</button>}
      <button onClick={reset}>Reset</button>
      <span className="digits">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
      <br />
      <PlayerArea
        players={fieldPlayers}
        color="green"
        switchFunction={(index) => {
          console.log("switch function called", index);
          switchPlayers(index, fieldPlayers, setFieldPlayers, subs, setSubs)
        }} />

      <PlayerArea
        players={subs}
        color="cyan"
        switchFunction={(index) => {
          switchPlayers(index, subs, setSubs, fieldPlayers, setFieldPlayers)
        }} />
        <br />
      <input type="text" value={newPlayerName} onChange={newPlayerNameChange} />
      <button onClick={addPlayer}> Add Player</button>
      <h3>All Players</h3>
      <ul>
        {fieldPlayers.map((player, index) => {
          return (<li key={player + "-fp-" + index}>{player.name}
            <button
              onClick={() => { removePlayer(fieldPlayers, index, setFieldPlayers) }
              }>Remove</button></li>)
        })}
         {subs.map((player, index) => {
          return (<li key={player + "-fp-" + index}>{player.name}
            <button
              onClick={() => { removePlayer(subs, index, setSubs) }
              }>Remove</button></li>)
        })}
      </ul>
    </div>
  );
}

export default App;
