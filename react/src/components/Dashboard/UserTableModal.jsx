export const UserTableModal = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 ">
      <div className="bg-indigo-900 rounded-lg shadow-lg p-8 w-3/5 max-h-2/3 overflow-scroll overflow-y-auto overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Response Details</h2>

        {typeof data === "string" ? (
          <p className="text-2xl text-green-800 font-bold">{data}</p>
        ) : (
          newFunction(data)
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

function newFunction(data) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-black">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Surname</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Roles</th>
          <th className="border border-gray-300 px-4 py-2">Permissions</th>
          <th className="border border-gray-300 px-4 py-2">Created at</th>
          <th className="border border-gray-300 px-4 py-2">Updated at</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.surname}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.roles.join(", ")}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {user.permissions.join(", ")}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(user.createdAt).toLocaleString()}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(user.updatedAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
