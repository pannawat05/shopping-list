import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [list, setList] = useState<string[]>([]);
  const [item, setItem] = useState("");

  function addItem(n: string, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newList = [...list, n];
    setList(newList);
    localStorage.setItem('items', JSON.stringify(newList));
  }

  const checkItem = (index: number, event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    element.classList.toggle("fa-circle-check");
    const wrapper = element.closest('.wrapper');
    if (wrapper) {
      wrapper.classList.toggle('checked');
    }
  }

  function removeItem(index: number) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    localStorage.setItem('items', JSON.stringify(newList));
  }

  useEffect(() => {
    const items = localStorage.getItem('items');
    if (items) {
      setList(JSON.parse(items));
    }
  }, []);

  return (
    <>
      <div>
        <center>
          <div className="card">
            <div className="card-header">
              <h2>Shopping List</h2>
            </div>
            <div className="card-body">
              <form onSubmit={(event) => { addItem(item, event); (event.target as HTMLFormElement).reset(); }}>
                <input type="text" id="item" placeholder="Item name" onChange={(e) => setItem(e.target.value)} />
                <button type="submit">Add</button>
              </form>
              <div>
                {list.map((item, index) => (
                  <div key={index} className="wrapper" id='wrapper'>
                    <i className="fa-regular fa-circle" onClick={(event) => checkItem(index, event)}></i>
                    {item}
                    <i onClick={() => removeItem(index)} className='remove fa-solid fa-xmark'></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </center>
      </div>
    </>
  );
}

export default App;
