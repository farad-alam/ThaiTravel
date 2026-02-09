export const Table = (props: any) => {
  const { value } = props;
  const { rows } = value;

  if (!rows || rows.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-gray-200 border">
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row: any, i: number) => (
            <tr key={row._key || i} className={i === 0 ? 'bg-gray-50' : ''}>
              {row.cells.map((cell: string, j: number) => {
                const CellTag = i === 0 ? 'th' : 'td';
                return (
                  <CellTag
                    key={j}
                    className={`px-6 py-4 text-sm ${
                      i === 0
                        ? 'font-semibold text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    {cell}
                  </CellTag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
