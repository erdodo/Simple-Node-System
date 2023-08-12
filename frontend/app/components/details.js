import React from "react";

export default function Details({ data, setData }) {
  return (
    <div className="border-2 border-sky-700 grid grid-cols-3 items-start justify-items-start text-lg rounded-lg p-8 my-2 gap-3">
      <h3 className="text-4xl text-white col-span-3">Detail</h3>
      <div>
        <label title="Page and swagger title">Page Title:</label>
        <br />
        <input
          defaultValue={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
      <div>
        <label title="Swagger description">Description:</label>
        <br />
        <input
          defaultValue={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>
      <div>
        <label title="Swagger host">Host:</label>
        <br />
        <input
          defaultValue={data.host}
          onChange={(e) => setData({ ...data, host: e.target.value })}
        />
      </div>

      <div className="col-span-3">
        <h4 className="text-xl">Database Connection:</h4>

        <label className={"text-sm"}>
          mongodb+srv://
          <input
            placeholder="Database username"
            defaultValue={data.db.username}
            onChange={(e) =>
              setData({ ...data, db: { ...data.db, username: e.target.value } })
            }
          />
          :
          <input
            type="password"
            placeholder="Database password"
            defaultValue={data.db.password}
            onChange={(e) =>
              setData({ ...data, db: { ...data.db, password: e.target.value } })
            }
          />
          @
          <input
            placeholder="Database host"
            defaultValue={data.db.host}
            onChange={(e) =>
              setData({ ...data, db: { ...data.db, host: e.target.value } })
            }
          />
          /?retryWrites=true&w=majority
        </label>
      </div>
      <div>
        <label>DB Name: </label>
        <br />
        <input
          placeholder="Database name"
          defaultValue={data.db.name}
          onChange={(e) =>
            setData({ ...data, db: { ...data.db, name: e.target.value } })
          }
        />
      </div>
    </div>
  );
}
