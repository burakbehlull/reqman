import { Sidebar, ContentHeader } from "@components";

function Container() {

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:basis-1/5 p-4">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col p-4">
        <div className="h-[20%] p-2 rounded-md">
          <ContentHeader />
        </div>

        <div className="h-[80%] mt-4 flex flex-row gap-4">
          <div className="flex-1 p-2 rounded-md">
            <textarea className="textarea h-[95%] w-[90%]" placeholder="JSON"></textarea>
          </div>
          <div className="flex-1 bg-purple-500 p-2 rounded-md">
            YANIT ALANI
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;
