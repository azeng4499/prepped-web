import React from "react";
import { MaterialReactTable } from "material-react-table";

const HomeComponent = () => {
  return (
    <div class="w-screen h-screen flex justify-start items-center flex lato flex-col bg-zinc-900 p-10px">
      {/* <div class="w-full h-1/6 bg-blue-400 rounded-md"></div> */}
      <div class="w-full h-full">
        <div class="w-full pb-5px" style={{ height: "calc(100% * 1/10)" }}>
          <div class="w-full h-full rounded-md bg-black"></div>
        </div>
        <div class="w-full pt-5px" style={{ height: "calc(100% * 9/10)" }}>
          <div class="w-full h-full rounded-md bg-black text-white p-10px">
            <table class="w-full h-content bg-blue-500">
              <thead class="border-b">
                <td>Question</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
              </thead>
              <tr>
                <td>hey</td>
                <td>hey</td>
                <td>hey</td>
                <td>hey</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
