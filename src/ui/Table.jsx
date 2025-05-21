function Table({ headers, data, rowKey, rowClass, renderRow }) {
  return (
    <div className="container">
      <div className="table-container no-scrollbar">
        <table className="table">
          <thead className="table-header">
            <tr>
              {headers.map((header) => (
                <th key={header} className="table-cell">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item[rowKey] || index}
                className={`table-row ${rowClass(item)}`}
              >
                {renderRow(item, index)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
