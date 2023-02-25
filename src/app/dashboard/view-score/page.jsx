const ViewScore = () => {
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
              <td className="p-4">Math</td>
              <td className="p-4">M0123</td>
              <td className="p-4">4</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-4">Data structure & Algorithm</td>
              <td className="p-4">D123</td>
              <td className="p-4">5</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-4">OOP</td>
              <td className="p-4">C234</td>
              <td className="p-4">7</td>
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
