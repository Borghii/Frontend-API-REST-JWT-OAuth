import { useState } from "react";
import { getUserById, getAllUsers } from "../../services/UserService";

export const SearchUser = ({ onSearch }) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let data;
      if (!userId) {
        data = await getAllUsers();
      } else {
        const user = await getUserById(userId);
        data = Array.isArray(user) ? user : [user]; // asegurar array
      }

      console.log(data);
      onSearch(data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-4">Search user</h2>

      {error && <div className="text-red-600">{error}</div>}

      <form
        className="text-xl space-y-4 flex justify-center flex-col w-sm"
        onSubmit={handleSearch}
      >
        <div className="flex gap-4 justify-between">
          <label htmlFor="id">Id</label>
          <input
            type="text"
            id="id"
            name="id"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            value={userId}
            onChange={handleChange}
            placeholder="Enter user id or leave empty to get all users"
          />
        </div>

        <button type="submit" className="btn-register">
          Search
        </button>
      </form>
    </div>
  );
};
