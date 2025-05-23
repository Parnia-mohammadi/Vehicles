import { forwardRef } from "react";

const Table = forwardRef(
  ({ headers, data, rowKey, rowClass = () => "", renderRow }, ref) => {
    return (
      <div className="self-container">
        <div className="mytable-container no-scrollbar">
          <table className="mytable">
            <thead className="mytable-header">
              <tr className="text-nowrap">
                {headers.map((header) => (
                  <th key={header} className="mytable-cell">
                    <p className="w-fit">{header}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item[rowKey] || index}
                  className={`mytable-row text-nowrap  ${rowClass(item)}`}
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
