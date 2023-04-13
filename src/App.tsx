import React, { useState } from 'react';
import Question from './components/question/Question';
import History from './components/history/History';
import './App.css'


function App(): JSX.Element {
//source={require('./src/assets/dark_space.png')}
  const [history, setHistory] = useState([{"role": "system", "content": "Tu veux quoi ?"}])

  const handleUpdateHistory = (value: {role: string, content: string}) => {
    // y a comme un petit besoin de déterminer laquelle fonctionne ici,
    // pas de doublons dans l'historique, il n'en restera qu'une
    setHistory(prevHistory => [...prevHistory, value]) 
    history.push(value)
  }

  // placer une div qui englobe history pour mettre deux bandes noires sur les côtés
  return (
    <div className="container">
      <div className="background">
        <History history={history}/>
      </div>
      <Question history={history} handleUpdateHistory={handleUpdateHistory}/>
    </div>
  );
}

export default App;
