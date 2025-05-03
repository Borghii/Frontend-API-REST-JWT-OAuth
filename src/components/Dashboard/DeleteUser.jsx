import { useState } from "react";
import { deleteUserById } from "../../services/UserService";

export const DeleteUser = ({ onSearch }) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await deleteUserById(userId);

      console.log(data);

      onSearch(data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-4">Delete user</h2>

      {error && <div className="text-red-600">{error}</div>}

      <form
        className="text-xl space-y-4 flex justify-center flex-col w-sm"
        onSubmit={handleDelete}
      >
        <div className="flex gap-4 justify-between">
          <label htmlFor="id">Id</label>
          <input
            type="text"
            id="id"
            name="id"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            value={userId}
            required
            placeholder="Enter user id"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-register">
          Delete
        </button>
      </form>
    </div>
  );
};
