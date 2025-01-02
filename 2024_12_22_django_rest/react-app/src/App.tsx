import React, { useEffect, useState } from 'react';
import api, { Question } from './services/api';

function App() {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    api.questions.get().then(r => setQuestions(r))
  }, [])

  const postQuestion = () => {
    api.questions.post()
  }

  console.log(questions)

  return (
    <div className="App">
     <button onClick={postQuestion}>Post</button>
     {questions?.map(({question_text, pub_date}) => <li key={pub_date}>{question_text}</li>)}
    </div>
  );
}

export default App;
