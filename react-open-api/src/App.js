import React, {useState,useEffect} from "react";
import axios from "axios";

function CallCaffe(){
  const [menus,setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({
    id : '',
    item : '',
    description : '',
    price : ''
  });

  async function fetchMenus() {
    try{
      //debugger;
      const url = `http://${window.location.hostname}:8190/data`;
      const response = await axios.get(url);
      console.log(response.data.data);
      setMenus(response.data.data);
    } catch (e) {
      console.log(e);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newMenu);
    axios.post(`http://${window.location.hostname}:8190/data`,newMenu)
    .then(response => {
      console.log(response.status);
    })
    .catch((e) =>{
      console.log(e);
    });
  }

  const handleChange = (e) => {
    e.preventDefault();
    setNewMenu({[e.target.name]: e.target.value});
  }
  useEffect(() => {
    console.log("component mounted");
  },[menus]);  

  const caffeMenu = menus.map((menu) => (
    <li key={menu.id}> {menu.item} </li>
  ));
  
  return (
    <div>
      <h1>카페 메뉴</h1>
      <div>{caffeMenu}</div>
      <button onClick={fetchMenus}>불러오기</button>
      <div>
        <form onSubmit={handleSubmit}>
          <p>ID<input type="text" name="id" onChange={handleChange}></input></p>
          <p>카페 메뉴<input type="text" name="item" onChange={handleChange}></input></p>
          <p>설명<input type="text" name="description" onChange={handleChange}></input></p>
          <p>가격<input type="text" name="price" onChange={handleChange}></input></p>
          <input type="submit" value="등록하기"></input>
        </form>
      </div>
    </div>
  );
}



function App() {

  return (
    <div className="App">
      <CallCaffe />
    </div>
  );
}

export default App;
