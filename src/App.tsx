import "./App.css";

import { Todos } from "./components/";

function App() {
  return (
    <div className='task-manager' data-testid='task-manager'>
      <Todos />
    </div>
  );
}

export default App;
