import { MaterialReactTable } from "material-react-table";
import { useState } from "react";

const generateData = (json) => {
  // Set up constants
  const rowHeaders = [];
  for (let row of json) {
    rowHeaders.push(row.rowHeaders);
  }
  const columnHeaders = Object.keys(json[0]);

  // Generate each cell value
  const data = [];
  for (let row of json) {
    const rowData = {};
    for (let columnHeader of columnHeaders) {
      const cellValue = row[columnHeader];
      rowData[columnHeader] = cellValue; // Add cell value to the row
    }
    data.push(rowData);
  }

  return data;
};

const Table = ({ json, columnHeaders }) => {
  const [data, setData] = useState(generateData(json));
  const getToday = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const columns = [
    {
      accessorKey: "rowHeaders",
      header: getToday(), // Set today's date as the header
      enableEditing: false,
      muiTableBodyCellProps: {
        sx: { fontWeight: "bold" },
      },
    },
    ...columnHeaders.map((columnHeader) => ({
      accessorKey: columnHeader,
      header: columnHeader,
      muiEditTextFieldProps: ({ cell }) => ({
        onBlur: (event) => {
          const updatedData = [...data];
          const rowIndex = cell.row.index;
          updatedData[rowIndex][columnHeader] = event.target.value;
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
