import { MaterialReactTable } from "material-react-table";
import { useState } from "react";

const generateData = () => {
  const columnLabels = ["A", "B", "C"];
  const rowLabels = [
    "AV Infrastructure",
    "Elemental",
    "HELO",
    "CC Encoder",
    "Studio | CTRL Rooms",
    "Switcher",
    "Vinten",
    "Broadcast Audio",
    "Hallway TVs",
    "Brio",
    "CATV",
    "CATV Infrastructure",
    "CATV Routing",
    "Chamber Pre-Session",
    "Vote PC",
    "Sergeant & Presiding Officer PC",
    "Committee Support",
    "WebEx",
    "Room TV",
    "Microphones (In-Room Audio)",
    "Webpage Link Active",
  ];
  const rowsCount = rowLabels.length; // Use the length of rowLabels
  const data = [];
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const rowId = rowIndex + 1;
    const rowData = { rowLabel: rowLabels[rowIndex], row: rowId }; // Set rowLabel dynamically
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
  const getToday = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const columnLabels = ["A", "B", "C"];
  const columns = [
    {
      accessorKey: "rowLabel",
      header: getToday(), // Set today's date as the header
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
