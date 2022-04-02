import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserStatitics from "./components/userComponents/UserStatitics";
import UserTable from "./components/userComponents/UserTable";
import UserForm from "./components/userComponents/UserForm";
import AppDataProvider from "./store/AppDataProvider";

function App() {
  const userStatiticsData = [
    {
      headText: "Total Users",
      subText: 10000,
    },
    {
      headText: "Total Males",
      subText: 10000,
    },
    {
      headText: "Total Females",
      subText: 10000,
    },
    {
      headText: "Total Active",
      subText: 10000,
    },
  ];
  return (
    <AppDataProvider>
      <div className="App">
        <UserStatitics data={userStatiticsData} />
        <UserTable />
        <UserForm />
      </div>
    </AppDataProvider>
  );
}

export default App;
