import './App.css';
import axios from "axios"
import {useEffect, useState} from "react"

function App() {

  const [list , setList] = useState([])

  const [searchTerm, setSearchTerm] = useState('');

  const [filteredUsers, setFilteredUsers] = useState([]);
  

  const fetchUsers = async() =>{
    try {
      const response = await axios("https://jsonplaceholder.typicode.com/users")
        setList(response.data)
        setFilteredUsers(response.data); 
        
    } catch (error) {
      console.error(error);
      
    }

  }

  useEffect(()=>{
    fetchUsers();

    return() => console.log("unsubscribe")  
  },[])



  const handleChange = (e) =>{
    e.preventDefault()

    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    filterUsers(searchTerm);
    
  }

  const filterUsers = (search) => {
    const filtered = list.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }


  
  const getFunction = () =>{

    return filteredUsers.map((item) => (
      <div key={item.id}>
        <h1>Name = {item.name}</h1>
      </div>
    ))
  }

  
  return (
    <div className="App">
        <input type="text" name='text' value={searchTerm} placeholder='Search' onChange={handleChange} />
        {getFunction()}
    </div>
  );
}

export default App;
