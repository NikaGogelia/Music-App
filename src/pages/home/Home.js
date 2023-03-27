import "./home.css";
import { useState, useEffect } from "react";

function Home() {
  const [greet, setGreet] = useState("");

  const greeting = new Date();
  const hours = greeting.getHours();

  useEffect(() => {
    if (hours >= 5 && hours <= 12) {
      setGreet("Morning");
    } else if (hours > 12 && hours <= 17) {
      setGreet("Afternoon");
    } else if (hours > 17 && hours <= 20) {
      setGreet("Evening");
    } else {
      setGreet("Night");
    }
  }, [hours]);

  return (
    <div className="home">
      <h1>Good {greet}</h1>
    </div>
  );
}

export default Home;
