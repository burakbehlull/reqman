import { Sidebar } from "@components";
import Routes from "@routes"

function Container() {
  
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-[80wh] p-4">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col p-4">
        <Routes />
      </div>
    </div>
  );
}

export default Container;
