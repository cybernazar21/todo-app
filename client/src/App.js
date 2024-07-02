import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";

const App = () => {
  const [cookies, , ] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [ tasks, setTasks ] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    }catch (err) {
      console.error(err)
    } 
  };

  useEffect(() => {
    if(authToken) {
      getData()
    }}, [authToken, getData]);

    console.log(tasks);

  // Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));


  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && 
      <>
              <ListHeader listName={'🏝️ Holiday Tick list'} getData={getData} />
              <p className="user-email">Welcome back, {userEmail} !</p>
              {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
      <img className="logo" alt="cyber_rose" src="https://preview.redd.it/cyber-rose-v0-9s5y72fhtfia1.png?width=1000&format=png&auto=webp&s=e8cb7e9ed2005392cb67bd2c38c2a0838f421ac1" />
      <p className="copyright"> © Creating by Cyber_R0se21</p>
    </div>
  );
}

export default App;
