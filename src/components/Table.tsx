import React from 'react';

interface TableProps {
    headers: string[];
    data: { [key: string]: any }[]; // Ensure data is an array of objects
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
    // Check if data is an array
    if (!Array.isArray(data)) {
        return <div>No data available</div>;
    }

    return (
        <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
                <tr className="border-b border-gray-300 md:border-none block md:table-row">
                    {headers.map((header, idx) => (
                        <th key={idx} className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="block md:table-row-group">
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-300 md:border-none block md:table-row">
                        {headers.map((header, colIndex) => (
                            <td key={colIndex} className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                                {row[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;

