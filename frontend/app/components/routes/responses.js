export default function Responses({ data, setData, routeKey }) {
  const newResponses = () => {
    let route = data.routes[routeKey] || [];
    route.responses = route.responses || [];
    route.responses.push({
      code: "",
      description: "",
      schema: "",
    });
    let newData = data;
    newData.routes[routeKey] = route;
    setData({ ...newData });
  };
  const deleteResponse = (key) => {
    let route = data.routes[routeKey] || [];
    route.responses = route.responses || [];
    route.responses.splice(key, 1);
    let newData = data;
    newData.routes[routeKey] = route;
    setData({ ...newData });
  };
  return (
    <div className="border rounded p-3 mt-2 w-full">
      <h3 className="text-2xl mb-3">Responses</h3>
      {!!data.routes[routeKey].responses &&
        data.routes[routeKey].responses.map((response, key) => (
          <div
            className="mb-2 flex flex-col border-b-2 pb-2"
            key={"Responses" + key + response.code}
          >
            <span>
              {key + 1}. Responses{" "}
              <button
                className={"text-red-500"}
                onClick={() => deleteResponse(key)}
              >
                Delete
              </button>
            </span>
            <label>Code:</label>
            <input />

            <label>Description:</label>
            <textarea></textarea>

            <label>Schema:</label>
            <textarea></textarea>
          </div>
        ))}
      <button
        onClick={newResponses}
        type="button"
        className="w-full inline-block bg-sky-500 rounded p-2 text-white"
      >
        Add
      </button>
    </div>
  );
}
