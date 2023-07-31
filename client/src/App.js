import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [products, setProducts] = useState([]);
  async function getData() {
    const { data } = await axios.get('/api/v1/products');
    if (data) {
      console.log('data', data);
      setProducts(data);
    }
  }
  useEffect(() => {
    getData();
  });
  return (
    <div className="App">
      this is the product page
      {products ? (
        products.map((ele) => {
          return (
            <div className="name" key={ele._id}>
              {ele.name}
            </div>
          );
        })
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

export default App;
