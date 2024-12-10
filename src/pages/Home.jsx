import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div class="flex  justify-center min-h-screen">
                <h1 class=" font-bold text-3xl text-gray-800">Welcome to the Admin Page</h1>
            </div>
        </div>
    );
  };
  
  export default Home;