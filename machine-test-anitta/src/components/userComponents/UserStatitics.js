import React from "react";
import { Card } from "react-bootstrap";
import { useAppDataContext } from "./../../store/AppDataProvider";

const UserStatitics = () => {
  const { userStatiticsData } = useAppDataContext();

  const userData = [
    {
      headText: "Total Users",
      subText: userStatiticsData.users,
    },
    {
      headText: "Total Males",
      subText: userStatiticsData.males,
    },
    {
      headText: "Total Females",
      subText: userStatiticsData.females,
    },
    {
      headText: "Total Active",
      subText: userStatiticsData.actives,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
      }}
    >
      {userData.map(({ headText, subText }) => (
        <UserCard headText={headText} subText={subText} />
      ))}
    </div>
  );
};

export default UserStatitics;

const UserCard = ({ headText, subText }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{headText} in this page</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subText}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
