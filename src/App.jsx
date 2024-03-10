// The password is initially set during the first render of the App component. When the App component is mounted, the useEffect hook is triggered after the initial render, and within this effect, the passwordGenerator function is called.

// Let's go through the sequence:

// Component Mount:

// The App component is mounted.
// State variables (length, numberAllowed, charAllowed, password) are initialized using useState.
// The passwordGenerator function is defined using useCallback.
// Initial Render:

// The initial render of the UI takes place based on the initial state values.
// The useEffect hook is triggered after the initial render.
// Password Generation:

// Within the useEffect hook, the passwordGenerator function is called.
// The passwordGenerator function generates a password based on the initial state values (length, numberAllowed, charAllowed).
// The generated password is stored in the password state using setPassword.
// Re-render:

// The component re-renders with the updated password state.
// The UI reflects the initially generated password.
// User Interactions and Subsequent Renderings:

// If the user interacts with the UI (changes length, toggles options), subsequent renders may occur.
// These subsequent renders also trigger the useEffect hook, leading to password regeneration based on the updated state values.
// So, the password is set and displayed in the UI during the initial render of the App component, which is part of the component's mounting process. Subsequent renders, triggered by user interactions, may lead to the regeneration of the password.

// is generatePassword is called during initial render

// ChatGPT
// No, based on the provided React code, generatePassword is not directly called during the initial render. Instead, it is defined within the useEffect hook, and the useEffect is triggered after the initial render.

// Here's the breakdown:

// Component Mounting:

// The App component is mounted, and state variables (length, numberAllowed, charAllowed, password) are initialized.
// JSX Evaluation and Initial Render:

// The JSX code within the return statement is evaluated during the initial render, and the UI is rendered based on the initial state values.
// However, the useEffect hook, which contains the call to generatePassword, is not executed during this initial render.
// useEffect Execution:

// After the initial render, the useEffect hook is triggered. This occurs after the component has been initially rendered and inserted into the DOM.
// Within the useEffect, the generatePassword function is called, generating the initial password based on the initial state values.
// Re-render with Updated Password:

// The component re-renders with the updated password state, and the UI reflects the initially generated password.
// In summary, while the App component goes through an initial render when it is mounted, the generatePassword function is not called directly during this initial render. It is executed later as part of the useEffect after the initial rendering phase.


// ui render hua based on initial state values , fir passwordGenerator function define kr rkha h, then useEffect hook trigger hua, then passwordGenerator call hua, naya password jo bana wo password state me store hua setPassword se, then re render hua , ui me nayi values reflect hui, ab based on dependencies component re render hoga

import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*()_-+=}[]|:;'<>,.?/"

    for(let i=1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) 
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className=' bg-slate-700 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400'>
        <h1 className=' text-white text-center my-3'>Password Generator</h1>

        <div className=' flex shadow rounded-lg overflow-hidden mb-4'>

          <input 
          type="text"
          value={password}
          className=' outline-none w-full px-3 py-1'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />

          <button 
          onClick={copyPasswordToClipboard}
          className=' outline-none bg-blue-600 text-white px-3 py-1 shrink-0'>Copy
          </button> 
        
        </div>

        <div className=' flex text-sm gap-x-2'>

          <div className=' flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className=' cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div className=' flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked={numberAllowed} 
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className=' flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked={charAllowed} 
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
