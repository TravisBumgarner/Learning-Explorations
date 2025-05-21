import { Wrapper } from "./styles";

const Dashboard = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log(data); // logs out to server. 

  return <Wrapper>Dashboard: {data.title}</Wrapper>;
};

export default Dashboard;


