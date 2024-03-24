import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";

const CountTable = () => {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "insert", //access nested data with dot notation
        header: "Insert",
        size: 150,
      },
      {
        accessorKey: "update",
        header: "Update",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true, //enable some features
    enableRowSelection: false,
    enablePagination: false, //disable a default feature
    muiPaginationProps: {
      rowsPerPageOptions: [2, 4, 6],
      showRowsPerPage: false,
      showFirstButton: false,
      showLastButton: false,
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/count`
      );
      console.log(response);
      setData([response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MaterialReactTable table={table} /> //other more lightweight MRT sub components also available
  );
};

export default CountTable;
