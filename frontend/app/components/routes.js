import React from "react";

import Parameters from "@/app/components/routes/parameters";
import Responses from "@/app/components/routes/responses";

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Routes({ data, setData }) {
  const [routes, setRoutes] = React.useState(data.routes);
  const onChange = (routeKey, key, value) => {
    const newData = { ...data };
    newData.routes[routeKey][key] = value;
    setData(newData);
  };
  const newRoute = () => {
    const newData = { ...data };
    newData.routes.push({
      url: "/",
      method: "get",
      tags: "",
      description: "",
      summary: "",
      parameters: [],
      responses: [],
    });
    setData(newData);
  };
  const routeDelete = (key) => {
    const newData = { ...data };
    newData.routes.splice(key, 1);
    setData(newData);
  };
  return (
    <div
      className={"flex flex-col border-2 rounded-lg border-sky-700 w-full p-8"}
    >
      <div className="flex gap-4 items-center my-2">
        <h3 className="text-4xl text-white">Routes</h3>
        <button
          type="button"
          className="inline-block bg-sky-500 rounded p-2 text-white"
          onClick={newRoute}
        >
          Add Route
        </button>
      </div>
      <Accordion>
        {routes.map((route, k) => (
          <AccordionItem
            key={"route" + route.url + k}
            title={route.url}
            subtitle={route.method}
            className={"border rounded p-3 mt-2 AccordionItem"}
          >
            <div
              className="grid grid-cols-3 gap-4"
              key={"route-div" + route.url + k}
            >
              <div className="flex flex-col border rounded p-3 mt-2">
                <h3 className="text-2xl mb-3">Route Details</h3>
                <label>Url:</label>
                <input
                  defaultValue={route.url}
                  onChange={(e) => onChange(k, "url", e.target.value)}
                />
                <label>Method:</label>
                <select
                  defaultValue={route.method}
                  onChange={(e) => onChange(k, "method", e.target.value)}
                >
                  <option value="get">GET (Find)</option>
                  <option value="post">POST (Insert Many)</option>
                  <option value="put">PUT (Update Many)</option>
                  <option value="delete">DELETE (Delete Many)</option>
                </select>
                <label className="mt-2">Tags:</label>
                <input
                  defaultValue={route.tags}
                  onChange={(e) => onChange(k, "tags", e.target.value)}
                />
                <label className="mt-2">Description:</label>
                <input
                  defaultValue={route.description}
                  onChange={(e) => onChange(k, "description", e.target.value)}
                />
                <label className="mt-2">Summary:</label>
                <input
                  defaultValue={route.summary}
                  onChange={(e) => onChange(k, "summary", e.target.value)}
                />
                <button
                  className={"text-red-500 m-3"}
                  onClick={() => routeDelete(k)}
                >
                  Delete
                </button>
              </div>
              <Parameters data={data} setData={setData} routeKey={k} />
              <Responses data={data} setData={setData} routeKey={k} />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
