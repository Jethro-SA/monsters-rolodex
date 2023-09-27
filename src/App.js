import logo from './logo.svg';
import './App.css';
import { Component, useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users));
    }, []);

    useEffect(() => {
      const newFilteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField));

      setFilteredMonsters(newFilteredMonsters)
    }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldValue = event.target.value.toLowerCase();

    setSearchField(searchFieldValue);
  };

  return (
    <div className="App">
    <h1 className='app-title'>Monsters Rolodex</h1>
    
    <SearchBox onChangeHandler={onSearchChange} className='monsters-searchBox' placeholder='search monsters'/>   
    <CardList monsters={filteredMonsters}/>      
    </div>
  );
};

export default App;
