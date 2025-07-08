import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform duration-300">
            <img src={viteLogo} className="h-24 w-24 p-6 hover:drop-shadow-[0_0_2em_#646cffaa] transition-all duration-300" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform duration-300">
            <img src={reactLogo} className="h-24 w-24 p-6 hover:drop-shadow-[0_0_2em_#61dafbaa] transition-all duration-300 animate-spin" alt="React logo" />
          </a>
        </div>
        <h1 className="text-5xl font-bold mb-8">Vite + React</h1>
        <div className="p-8">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg border border-transparent transition-colors duration-250 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
          >
            count is {count}
          </button>
          <p className="text-gray-300 mb-4">
            Edit <code className="bg-gray-800 px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-gray-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
