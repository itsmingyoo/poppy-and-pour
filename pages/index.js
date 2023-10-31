// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <h1>HOME PAGE</h1>
//   )
// }


import { useRef, useState } from "react";

function HomePage() {

  const [feedbackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  // this is for a POST request to /api/feedback.js
  function submitFormHandler(e) {
    e.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInputRef.current.value

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({email: enteredEmail, text: enteredFeedback}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => console.log("THIS IS DATA ON FRONTEND FROM FETCH RETURN --->", data))
  }

  // this is for a GET request to /api/feedback.js
  async function loadFeedbackHandler() {
    fetch('/api/feedback')
    .then((response) => response.json())
    .then((data) => setFeedbackItems(data));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}/>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load All Feedback</button>
      <ul>
        {/* dont need to set a !(feedbackIems) statement since useState is orginally an empty arr, so it will map over empty arr [] */}
        {feedbackItems.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
