export default function Parameters({ data, setData, routeKey }) {
  const newParams = () => {
    let route = data.routes[routeKey] || [];
    route.parameters = route.parameters || [];
    route.parameters.push({
      name: "",
      description: "",
      required: false,
      in: "path",
      type: "",
    });
    let newData = data;
    newData.routes[routeKey] = route;
    setData({ ...newData });
  };
  const deleteParams = (key) => {
    let route = data.routes[routeKey] || [];
    route.parameters = route.parameters || [];
    route.parameters.splice(key, 1);
    let newData = data;
    newData.routes[routeKey] = route;
    setData({ ...newData });
  };
  return (
    <div className="border rounded p-3 mt-2 w-full">
      <h3 className="text-2xl mb-3">Parameters</h3>
      {!!data.routes[routeKey].parameters &&
        data.routes[routeKey].parameters.map((param, key) => (
          <div
            className="mb-2 flex flex-col border-b-2 pb-2"
            key={"Parameters" + key + param.name}
          >
            <span>
              {key + 1}. Parameter{" "}
              <button
                className={"text-red-500"}
                onClick={() => deleteParams(key)}
              >
                Delete
              </button>
            </span>
            <label>Name:</label>
            <input />

            <label>Description:</label>
            <textarea></textarea>
            <div>
              <label className="mr-2">Required:</label>
              <input type="checkbox" />
            </div>
            <label>In:</label>
            <select>
              <option value="path">Path</option>
              <option value="query">Query</option>
              <option value="header">Header</option>
              <option value="body">Body</option>
              <option value="formData">Form Data</option>
            </select>
            <label>Type:</label>
            <input />
          </div>
        ))}
      <button
        onClick={newParams}
        type="button"
        className="w-full inline-block bg-sky-500 rounded p-2 text-white"
      >
        Add
      </button>
    </div>
  );
}
