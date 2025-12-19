* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Trebuchet MS', sans-serif;
}

body {
  height: 100vh;
  overflow: hidden;

  /* 🔁 CHANGE THIS TO YOUR IMAGE NAME */
  background-image: url("background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: #ffe066;
}

/* Dark overlay for readability */
body::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 0;
}

.container {
  position: relative;
  z-index: 5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 0 25px rgba(255, 224, 102, 0.9);
}

.hidden {
  display: none;
}

button {
  background: #ffe066;
  color: #2b1055;
  border: none;
  padding: 15px 35px;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 224, 102, 0.7);
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 35px rgba(255, 224, 102, 1);
}

canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
}
