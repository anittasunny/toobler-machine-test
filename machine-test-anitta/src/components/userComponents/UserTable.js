import React from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { useAppDataContext } from "../../store/AppDataProvider";

const UserTable = () => {
  const {
    userDatas,
    handlePagination,
    pageMeta,
    UI: { handleModalDisplay },
  } = useAppDataContext();

  const pageNumber = pageMeta?.page;
  const isNoPrev = pageMeta?.links?.previous === null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0rem",
        }}
      >
        <h2>Users list</h2>
        <Button
          onClick={() => {
            handleModalDisplay(true);
          }}
          size="lg"
        >
          Add new user
        </Button>
      </div>
      <div
        style={{
          minHeight: "20rem",
          backgroundColor: "lightgray",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userDatas.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.gender}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div
        style={{
          alignSelf: "flex-end",
        }}
      >
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePagination({ isNext: false })}
            disabled={isNoPrev}
          />
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Pagination.Item
                onClick={() => handlePagination({ pageNumber: i + 1 })}
                active={i + 1 === pageNumber}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          <Pagination.Next onClick={() => handlePagination({ isNext: true })} />
        </Pagination>
      </div>
    </div>
  );
};

export default UserTable;
