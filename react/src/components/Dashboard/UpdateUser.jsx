export const UpdateUser = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-4">Update user</h2>

      <form className="text-xl space-y-4 flex justify-center flex-col w-sm">
        <div className="flex gap-4 justify-between">
          <label htmlFor="name">Id</label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="roles">Rol</label>
          <select
            id="roles"
            name="roles"
            className="bg-white/10 text-xl font-medium text-black rounded-lg p-1 w-2/3"
            required
          >
            <option value="">Select a rol</option>
            <option value="INVITED">INVITED</option>
            <option value="DEVELOPER">DEVELOPER</option>

            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
    </div>
  );
};
