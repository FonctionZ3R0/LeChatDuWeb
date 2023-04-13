import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

const Question = ({history, handleUpdateHistory}) => {

  const [question, setQuestion] = useState('');
  const [isTouchable, setTouchable] = useState(true);
  const vars = require("../../variables.json")

  const handleApiRequest = async () => {
    try {
      setTouchable(false)
      handleUpdateHistory({"role": "user", "content": question})
      setQuestion('')
      
      const configuration = new Configuration({
          apiKey: vars.REACT_APP_APIKEY,
          organization: vars.REACT_APP_ORGANIZATION,
      });

      const openai = new OpenAIApi(configuration);

      const getAnswer = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: history,
          //max_tokens: 1000,
      })

      if (getAnswer) {
        console.log({"role": getAnswer.data.choices[0].message?.role, "content": getAnswer.data.choices[0].message?.content})
        handleUpdateHistory({"role": getAnswer.data.choices[0].message?.role, "content": getAnswer.data.choices[0].message?.content})
        setTouchable(true)
      }
    } catch (error) {
      if (error.message.split(" ").pop() == '401') {
        handleUpdateHistory({"role": "system", "content": 'Il y a un problème d\'autorisation, tu devrais contacter Donovan.'})
      } else if (error.message.split(" ").pop() == '429') {
        handleUpdateHistory({"role": "system", "content": 'Il y a un problème :\n- Soit Donovan n\'a pas payé\n- Soit tu envoies' +
        ' tes questions trop vite, si c\'est le cas relax\n- Soit les serveurs sont surchargés\n\nQuoi qu\'il en soit, réessaie dans quelques instants.'})
      } else if (error.message.split(" ").pop() == '500') {
        handleUpdateHistory({"role": "system", "content": 'Les serveurs de ChatGPT ont un problème, réessaie plus tard.'})
      }
      setTouchable(true)
    }
  };

  return (
    <div className="container">
      <input className="input" onChange={(event) => setQuestion(event.target.value)} value={question} placeholder="Hmmm..."/>
      <button onClick={handleApiRequest} className={`send ${!isTouchable || question == '' ? 'disabled' : ''}`} disabled={!isTouchable || question == ''}>
        <img src={require('../../assets/question.png').default} alt="Send" className="image"/>
      </button>
    </div>
  )
};

export default Question