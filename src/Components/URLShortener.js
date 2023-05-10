import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { decodeToken } from "react-jwt";

const URLShortener = () => {
  const [allURLData, setAllURlData] = useState();
  const [longURL, setLongURl] = useState();
  const history = useHistory()

  const getAllURLData = async () => {
    try {
      await axios
        .get("https://url-shortener-app-cubz.onrender.com/shURl/geturl", {headers:{"x-auth-token": localStorage.getItem("token")}})
        .then((res) => setAllURlData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return history.push("/");
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        history.push("/");
      }
    };

  useEffect(() => {
    getUser()
    getAllURLData();
  }, []);

  const handleSubmit = async () => {
    if (longURL !== "") {
      const newData = {
        longURL,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        await axios
          .post("https://url-shortener-app-cubz.onrender.com/shURL/posturl", newData, config)
          .then((res) => console.log(res.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <Container>
      
      <Navbar>
      <Container>
        <Navbar.Brand href="#home">
        <h1>URL-Shortener-APP</h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={logOut} className="btn-success">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Row>
        <Col xs={1}></Col>
        <Col xs={10}>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Paste your long-URL"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => setLongURl(e.target.value)}
                value={longURL}
              />
              <Button
                type="submit"
                variant="outline-success"
                id="button-addon2"
              >
                Submit
              </Button>
            </InputGroup>
          </Form>
          <div className="card">
            {allURLData?.map((data) => (
              <Card
                bg="success"
                style={{ width: "18rem" }}
                className="mb-2"
                text="white"
                key={data._id}
              >
                <Card.Header>
                  <h5>Click Count: {data.clickCount}</h5>
                </Card.Header>
                <Card.Body>
                  <h6>
                    Short-URL :{" "}
                    <a
                      href={`https://url-shortener-app-cubz.onrender.com/shURl/${data.shortURL}`}
                      target="blank"
                    >
                      https://url-shortener-app-cubz.onrender.com/shURL/{data.shortURL}
                    </a>
                  </h6>
                  <h6>Long-URL : {data.longURL}</h6>

                </Card.Body>
                <Card.Footer>
                <a
                    href={`https://url-shortener-app-cubz.onrender.com/shURL/delete/${data._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Remove
                  </a>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </Container>
  );
};

export default URLShortener;
