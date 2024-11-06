import { MaterialReactTable } from "material-react-table";
import { useState } from "react";

const generateData = () => {
  const columnLabels = ["A", "B", "C"];
  const rowsCount = 5;
  const data = [];
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const rowId = rowIndex + 1;
    const rowData = { rowLabel: `Row ${rowId}`, row: rowId }; // Add rowLabel here
    for (const label of columnLabels) {
      const cellValue = `${label}${rowId}`; // Generate cell value
      rowData[label] = cellValue; // Add cell value to the row
    }
    data.push(rowData);
  }
  return data;
};

const Table = () => {
  const [data, setData] = useState(generateData());
  const columnLabels = ["A", "B", "C"];
  const columns = [
    {
      accessorKey: "rowLabel",
      header: "Row Label",
      enableEditing: false,
      muiTableBodyCellProps: {
        sx: { fontWeight: "bold" },
      },
    },
    ...columnLabels.map((label) => ({
      accessorKey: label,
      header: label,
      muiEditTextFieldProps: ({ cell }) => ({
        onBlur: (event) => {
          const updatedData = [...data];
          const rowIndex = cell.row.index;
          updatedData[rowIndex][label] = event.target.value;
          setData(updatedData);
          console.log(updatedData);
        },
      }),
    })),
  ];
  const tableOptions = {
    enableHiding: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableFilters: false,
    enablePagination: false,
    enableColumnActions: false,
    enableSorting: false,
    editDisplayMode: "cell",
    enableEditing: true,
  };

  return <MaterialReactTable {...tableOptions} columns={columns} data={data} />;
};

export default Table;
