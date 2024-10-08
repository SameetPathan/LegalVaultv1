import { React, useState, useEffect } from "react";
import "../Typewriter.css";

function ForceLogin() {
  const [text, setText] = useState("");
  const messages = [
    "Explore a secure platform tailored for legal professionals and clients.",
    "Efficiently manage legal documents and streamline case handling processes.",
    "Your trusted partner in navigating the complexities of the legal system.",
    "Ensuring confidentiality and compliance with the highest standards.",
    "Empowering lawyers and clients for a seamless legal experience."
  ];
  
  useEffect(() => {
    let i = 0;
    let timer = setInterval(() => {
      setText(messages[i]);
      i = (i + 1) % messages.length;
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="home-page" >
        <img
          className="bg-img"
          src={process.env.PUBLIC_URL + "/img1.jpg"}
          alt="Background"
          style={{


            width: "100%",
            height: "700px",
            objectFit: "cover",
          }}
        />
        <div className="typewriter-text my-div">{text}</div>
      </div>
    </>
  );
}

export default ForceLogin;
