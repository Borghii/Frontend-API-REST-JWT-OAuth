export const SearchUser = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-4">Search user</h2>

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

        <button type="submit" className="btn-register">
          Search
        </button>
      </form>
    </div>
  );
};
