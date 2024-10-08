import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import "../chat.css";
import { FaArrowLeft } from "react-icons/fa";

function ChatComponent(props) {

   
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      const db = getDatabase();
      const messageRef = ref(db, "messages/"+props.currentCase);
      onValue(messageRef, (snapshot) => {
        const messages = snapshot.val();
        const messageList = [];
        for (let id in messages) {
          messageList.push({ id, ...messages[id] });
        }
        setMessages(messageList);
      });
    }, []);
  
    const handleSubmit = (e) => {
      let name = props.userDetails[0];
      let type = props.userDetails[4];
      e.preventDefault();
      const db = getDatabase();
      const messageRef = push(ref(db,  "messages/"+props.currentCase));
      set(messageRef, { name, message,type});
      setMessage("");
    };

    const handleGoBack = () => {
      window.history.back();
    };

    useEffect(() => {
      if(props.currentCase===""){
        window.history.back();
      }
      
    }, []);

  return (
    <div>

      <div class="card text-center container mt-3 p-1 mb-3" style={{width:"900px"}}>
      <div className="card-header" style={{backgroundColor:"#051922",color:"white"}}>
      <div className="d-flex justify-content-between align-items-center w-100">
        {/* Left div */}
        <div style={{fontWeight:"bold"}}>
        <button
        className="btn btn-secondary"
        onClick={handleGoBack}
      >
        <FaArrowLeft className="mr-3" />
        Chat 
      </button>
      <span className='ml-3 text-success'>Case Name - </span>{props.currentCaseName}  
      <span className='ml-3 text-success'>Case Id - </span>{props.currentCase}
        </div>
        {/* Right div */}
        <div>
      
          <button
            style={{ marginLeft: "150px" }}
            type="button"
            className={`btn ${message.type === "client" ? 'btn-success' : 'btn-primary'}`}
         
            data-toggle="modal"
            data-target="#exampleModal2"
            data-whatever="@getbootstrap"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
    
        <div class="card-body">
        <ul className="message-list">
        {messages.map((message, index) => (
          <li
            key={message.id}
            className={message.type === "client" ? "left" : "right"}
          >

            <nav aria-label="breadcrumb">
              <ol className={`breadcrumb ${message.type === "client" ? 'bg-success' : 'bg-primary'}`}>
                <h2 style={{fontSize:"16px",color:"black"}}>{message.name} : </h2>&nbsp;&nbsp;&nbsp;
                <h2 class="breadcrumb-item active"  style={{fontSize:"14px",color:"white"}}> {message.message}</h2>
               
              </ol>
            </nav>
          </li>
        ))}
      </ul>
        </div>

        <div class="card-footer " style={{backgroundColor:"#051922",color:"white"}}>
          Connecting Lawyer and Client
        </div>
      </div>



    <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Chats
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                   Message
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={message} onChange={e => setMessage(e.target.value)}
                    required
                  />
                </div>
              
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-outline-success my-2 my-sm-0 ml-3" data-dismiss="modal" onClick={handleSubmit} >Send</button>
         
            </div>
          </div>
        </div>
      </div>
   
  </div>
  )
}

export default ChatComponent