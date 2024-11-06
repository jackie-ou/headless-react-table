import { MaterialReactTable } from "material-react-table";

const generateData = () => {
  const columnLabels = ["A", "B", "C"];
  const rowsCount = 5; 
  const data = [];

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const rowId = rowIndex + 1;
    const rowData = { row: rowId };

    for (const label of columnLabels) {
      const cellValue = `${label}${rowId}`; // Generate cell value
      rowData[label] = cellValue; // Add cell value to the row
    }

    data.push(rowData);
  }

  return data;
};

const Table = () => {
  const columns = [
    {
      accessorKey: "A",
      header: "A",
    },
    {
      accessorKey: "B",
      header: "B",
    },
    {
      accessorKey: "C",
      header: "C",
    },
  ];

  const data = generateData();
  console.log(data);

  return <MaterialReactTable columns={columns} data={data} enableEditing />;
};

export default Table;
