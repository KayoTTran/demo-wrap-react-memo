import React, { useState } from 'react';
import './App.css';
import WithMemo from './ComponentWithMemo';
import WithoutMemo from './ComponentWithoutMemo';

const WrapChild: React.FC<{count: number}> = ({ count }) => {
  return (
    <div>
      <p>Count {count}</p>
      <WithMemo />
      <WithoutMemo />
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setCount(current => current + 1)}>Go go go</button>
      <WrapChild count={count} />
    </div>
  );
}

export default App;
