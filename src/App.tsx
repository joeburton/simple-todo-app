import './App.css';

import { Todos } from './components/';

function App() {
  return (
    <div className='simple-todo' data-testid='simple-todo-app'>
      <Todos />
    </div>
  );
}

export default App;
