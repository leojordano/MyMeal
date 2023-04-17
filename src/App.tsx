import { FC } from 'react';

const App: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="App">
      <h1>{title}</h1>
    </div>
  );
};

export default App;
