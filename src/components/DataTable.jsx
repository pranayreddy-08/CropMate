import { useState, useMemo } from 'react';
import { ArrowUpDown, Edit2, Trash2, Search } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete, searchable = true }) => {
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;

    return sortedData.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            aria-label="Search table"
          />
        </div>
      )}

      <div className="border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  >
                    <button
                      onClick={() => column.sortable && handleSort(column.key)}
                      className={`flex items-center gap-1 ${
                        column.sortable ? 'hover:text-foreground cursor-pointer' : ''
                      }`}
                    >
                      {column.label}
                      {column.sortable && <ArrowUpDown className="h-3 w-3" />}
                    </button>
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-muted/50 transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3 text-sm text-foreground">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors"
                              aria-label="Edit row"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="p-1.5 text-destructive hover:bg-destructive/10 rounded transition-colors"
                              aria-label="Delete row"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
