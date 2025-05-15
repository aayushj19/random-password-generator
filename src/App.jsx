import React from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

function App(){

const [length, setLength] = useState(0);
const [password, setPassword] = useState("");
const [numberAllowed, setNumallowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);

const passwordRef = useRef(null)

const generatePassword = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(setNumallowed) str+= "0123456789";
  if(setCharAllowed) str+= "!@#$%&*"

  for (let i = 1; i <= length; i++) {
    let char = Math.floor( Math.random()  *str.length);
    pass += str.charAt(char);

    setPassword(pass);
  }
}, [length, charAllowed,numberAllowed]);

useEffect(() => {
  generatePassword()
}, [length, numberAllowed, charAllowed, generatePassword])

const copypassword = () => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999); 
  window.navigator.clipboard.writeText(password);
};

  return (
    <div className="h-screen flex w-50 h-500 justify-center items-center" >
    <div className=" w-full items-center max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className=" justify-center px-50 flex text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg justify-center m overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copypassword}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumallowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
