import { useEffect } from 'react';
export default function PlayerArea({players, color,switchFunction}) {

    useEffect(()=>{
        console.log("Players",players)
    },[])
    return (
      <div style={{backgroundColor: color,display:'inline-block'}}>
        <ul>
            {players.map((player,index)  => {
            return (<>
            <button style={{marginTop: '10px'}} key={player+"-"+index} onClick={()=>{
                console.log("Clicked on ",player);
                switchFunction(index)
            }}>{player.name+" "}<span className="digits">
            {("0" + Math.floor((player.time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((player.time / 1000) % 60)).slice(-2)}.
          </span></button><br /></>
            )
            })}
        </ul>
        </div>
    );
  }
  