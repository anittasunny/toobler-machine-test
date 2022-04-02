import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { postUserData } from "../../services/app-services";
import { useAppDataContext } from "../../store/AppDataProvider";
import { isEmailValid } from "../../utils/helper";
import MyModal from "./../UI/MyModal";

const UserForm = () => {
  const {
    UI: { isModalShown, handleModalDisplay },
    getIntialPageData,
  } = useAppDataContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [isStatusActive, setIsStatusActive] = useState(null);

  const handleClear = () => {
    setName("");
    setEmail("");
    setGender("");
    setIsStatusActive(null);
  };

  const isValid = !!(
    name &&
    isEmailValid(email) &&
    gender &&
    isStatusActive !== null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      name,
      email,
      gender,
      status: isStatusActive ? "active" : "inactive",
    };
    postUserData(postData).then((_) => {
      getIntialPageData();
      handleClose();
    });
  };

  const handleClose = () => {
    handleClear();
    handleModalDisplay(false);
  };

  return (
    <MyModal onClose={handleClose} isDisplay={isModalShown}>
      <div>
        <h3>Add new user</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Please enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="email"
            placeholder="Please enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            value={gender}
          >
            <option value="">Choose gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
            onChange={(e) => {
              setIsStatusActive(e.target.value === "active" ? true : false);
            }}
          >
            <span>Choose status</span>
            <Form.Check
              name="gender"
              type={"radio"}
              value="active"
              label={`Active`}
            />
            <Form.Check
              name="gender"
              type={"radio"}
              value="inactive"
              label={`Inactive`}
            />
          </div>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="m-2"
          disabled={!isValid}
        >
          SUBMIT
        </Button>
        <Button onClick={handleClear} variant="danger" type="reset">
          CLEAR
        </Button>
      </Form>
    </MyModal>
  );
};

export default UserForm;
