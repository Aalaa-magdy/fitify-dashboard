
import './App.css'

function App() {

  return (
    <>
        <div className="bg-primary-500 text-white">
  <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <span className=" text-xs font-bold  ">Fitify</span>
    </div>
    <nav className="hidden flex flex-col space-x-6">
      <a href="#" className="hover:text-primary-200 transition-colors ">Dashboard</a>
      <a href="#" className="hover:text-primary-200 transition-colors">Exercises</a>
      <a href="#" className="hover:text-primary-200 transition-colors">Challenges</a>
    </nav>
  </div>
</div>   
    </>
  )
}

export default App
