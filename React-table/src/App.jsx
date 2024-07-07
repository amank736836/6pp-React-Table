import React from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { data } from "./assets/data.json";
// const data = [
//   {
//     id: 1,
//     gender: "Male",
//     salary: 400000,
//   },
//   {
//     id: 2,
//     gender: "Female",
//     salary: 500000,
//   },
//   {
//     id: 3,
//     gender: "Robot",
//     salary: 600000,
//   },
// ];

const columns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
];

function App() {
  // const data2 = data.data;
  // console.log(data2);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState : { pageSize: 6 , pageIndex: 3},
    },
    useSortBy,
    usePagination
  );

  // const props = getTableProps();

  return (
    <div className="container">
      <table
        // {...props}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              // {...headerGroup.getHeaderGroupProps()}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  // {...column.getHeaderProps()}
                  {...header.getHeaderProps(header.getSortByToggleProps())}
                >
                  {header.render("Header")}
                  <span>
                    {header.isSorted
                      ? header.isSortedDesc
                        ? " 👇"
                        : // 🔽⬇️
                          " 👆"
                      : // 🔼⬆️
                        ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
          {/* <tr>
            <th>Id</th>
            <th>Gender</th>
            <th>Salary</th>
          </tr> */}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                // {...row.getRowProps()}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      // {...cell.getCellProps()}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {/* <tr>
            <td>1</td>
            <td>Male</td>
            <td>333333</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Male</td>
            <td>45000</td>
          </tr> */}
          {/* {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.gender}</td>
              <td>{item.salary}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
      <div className="button-container">

        <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
          First
        </button>

        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>

        <span>
          {pageIndex + 1} of {pageCount}
        </span>

        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>

        <button onClick={() => gotoPage(pageCount - 1)} disabled={pageIndex === pageCount - 1}>
          Last
        </button>
      </div>
    </div>
  );
}

export default App;
