import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // still keep input

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        WELCOME
      </h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Type something..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md"
        />
      </div>

      {loading ? (
        <h2 className="text-xl text-center text-white">Loading...</h2>
      ) : error ? (
        <h2 className="text-xl text-center text-red-500">{error}</h2>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

function UserCard({ user }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-300 w-72 text-white">
      <p className="font-semibold">User Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
        <div className="mt-2 text-gray-300">
          <p>Street: {user.address.street}</p>
          <p>City: {user.address.city}</p>
          <p>Zipcode: {user.address.zipcode}</p>
        </div>
      )}
    </div>
  );
}

export default App;
