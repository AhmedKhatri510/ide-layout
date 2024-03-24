import React, { useEffect, useMemo, useState } from "react";

// axios
import axios from "axios";

//components
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: data.length / 2, //customize the default page size
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "age", //normal accessorKey
        header: "Age",
        size: 2,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true, //enable some features
    enableRowSelection: false,
    enablePagination: true, //disable a default feature
    pageCount: Math.round(data.length / 2),
    muiPaginationProps: {
      rowsPerPageOptions: [2, 4, 6],
      showRowsPerPage: true,
      showFirstButton: false,
      showLastButton: false,
    },
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: { pagination }, //pass the pagination state to the table
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setPagination({
        pageIndex: 0,
        pageSize: data.length / 2,
      });
    }
  }, [data]);

  return (
    <MaterialReactTable table={table} /> //other more lightweight MRT sub components also available
  );
};

export default UserTable;
