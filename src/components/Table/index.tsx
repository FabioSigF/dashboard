type Props = {
  columns: Array<string>;
  tbody: React.ReactElement;
};

const Table = ({ columns, tbody }: Props) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg border border-gray-300-p rounded-md shadow-[#919eab4d 0 0 2px]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700">
          <tr className="">
            {columns.map((item, key) => (
              <th scope="col" className="px-6 py-3 font-medium" key={key}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        {tbody && tbody}
      </table>
    </div>
  );
};

export default Table;
