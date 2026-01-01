import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";

export const App = () => {
  const DIGITS = 5;
  const [inputArr, setInputArr] = useState([...Array(DIGITS).fill("")]);
  const ref = useRef([]);
  useEffect(() => {
    ref.current[0]?.focus();
  }, []);
  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim().slice(-1);
    const newArr = [...inputArr];
    newArr[index] = newValue;
    setInputArr(newArr);
    newValue && ref.current[index + 1]?.focus();
  };
  const handleKeyDown = (e, index) => {
    if (e.key == "Backspace") {
      !e.target.value && ref.current[index - 1]?.focus();
    }
    if (e.key == "ArrowLeft") {
      ref.current[index - 1]?.focus();
    }
    if (e.key == "ArrowRight") {
      ref.current[index + 1]?.focus();
    }
  };
  return (
    <div className="otp">
      {inputArr.map((_, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => (ref.current[index] = input)}
          value={inputArr[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

const container = document.getElementById("root");
let root = container._reactRoot;
if (!root) {
  root = ReactDOM.createRoot(container);
  container._reactRoot = root;
}
root.render(<App />);
