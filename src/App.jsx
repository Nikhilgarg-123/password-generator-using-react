import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useCallback } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed,setnumberAllowed] = useState(false);
  const [SymbolAllowed,setSymbolAllowed] = useState(false);
  const [Password,setPassword] = useState("");
  const [click1,setclick1] = useState(false);


  const passwordGenerator = useCallback(() =>{
    let pass="";
    
    let str= "ABCDEfGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed==true){
      str+="1234567890";
    }
    if(SymbolAllowed==true){
      str+="!@#$%^&*()_+=-][{}`~;:<>,./?";
    }

    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length)

      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,setPassword,numberAllowed,SymbolAllowed]

  );

  const copyToClipboard= useCallback(()=>{
    referenceCopy.current?.select(0,5)
    window.navigator.clipboard.writeText(Password)
    setclick1((x)=>!x);

  },[Password])

const referenceCopy= useRef(null);

  useEffect(()=>{
    passwordGenerator();
  },[length,setPassword,numberAllowed,SymbolAllowed]);
    
    
  
  

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3'>Password generator </h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          ref={referenceCopy}
          readOnly
      />
      <button
      onClick={copyToClipboard} 
      className={`outline-none  text-white px-3 py-0.5 shrink-0  ${click1?"bg-slate-400":"bg-blue-700"}`}
      >copy</button>
      
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={6}
      max={100}
      value={length}
       className='cursor-pointer'
       onChange={(e) => {setlength(e.target.value)}}
        />
        <label>Length: {length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input
        type="checkbox"
        id="abc"
        onChange={() => {
          setnumberAllowed((prev) => !prev);
        }}
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            
            onChange={() => {
              setSymbolAllowed((prev) => !prev )
            }}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
</div>
  
  )
}

export default App
