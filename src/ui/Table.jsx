import { forwardRef } from "react";

const Table = forwardRef(
  ({ headers, data, rowKey, rowClass, renderRow }, ref) => {
    return (
      <div className="self-container">
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
                  ref={ref ? (el) => (ref.current[index] = el) : null}
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
);

export default Table;
