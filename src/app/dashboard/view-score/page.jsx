const ViewScore = () => {
  const tableData = ["Math", "A0123", 4];
  return (
    <>
      <div className="p-4 sm:ml-64 flex flex-row">
        <table className="table-auto w-full">
          <thead className="border-b">
            <tr className="bg-gray-200">
              <th className="text-left p-4 font-medium">Subject Name</th>
              <th className="text-left p-4 font-medium">Subject Id</th>
              <th className="text-left p-4 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              {tableData.map((data) => (
                <td className="p-4">{data}</td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-100">
              {tableData.map((data) => (
                <td className="p-4">{data}</td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-100">
              {tableData.map((data) => (
                <td className="p-4">{data}</td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="py-4">Avg:</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ViewScore;
