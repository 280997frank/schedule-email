import React from 'react';
import { Navbar, Container, Nav, Col, Row, Button, InputGroup, FormControl, Table } from 'react-bootstrap';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from '@emailjs/browser';

// eslint-disable-next-line react/prop-types
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            startDate: new Date(),
            description: '',
            schedules: [],
        };
    }

    componentDidMount() {
        const dayInMilliseconds = 1000 * 60 * 60 * 24;
        const { schedules } = this.state;
        setInterval(() => {
            for (let index = 0; index < schedules.length; index++ ) {
                if (new Date().toLocaleDateString() === schedules[index].startDate.toLocaleDateString()) {
                    this.sendEmail(schedules[index].description);
                }
            }
        },dayInMilliseconds);
    }

  handleChange = (type, newValue) => {
      this.setState({
          [type]: newValue
      });
  };

  sendEmail = (description) => {
      emailjs.send('huda_email_dev','template_schedule_email',{
          description,
      }, 'user_RzadSic2nXGpRFB8kmN6e')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
  };

  handleSubmit = () => {
      let { id } = this.state;
      const { schedules, description, startDate } = this.state;
      id = id + 1;
      const schedule = {
          id,
          description,
          startDate,
      };
      schedules.push(schedule);
      this.setState({
          ...schedules,
          description: '',
          startDate: new Date()
      });
  };

  render() {
      const { startDate, schedules } = this.state;
      const { handleChange, handleSubmit } = this;
      return (
          <>
              <Navbar bg="primary" variant="dark">
                  <Container>
                      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                      <Nav className="me-auto">
                          <Nav.Link href="#home">Home</Nav.Link>
                          <Nav.Link href="#features">Features</Nav.Link>
                          <Nav.Link href="#pricing">Pricing</Nav.Link>
                      </Nav>
                  </Container>
              </Navbar>
              <Container className="mt-md-5">
                  <Row className="justify-content-md-center">
                      <Col xs lg="2">
                          <h2>My Schedule</h2>
                      </Col>
                  </Row>
              </Container>
              <Container className="mt-md-5">
                  <Row className="justify-content-md-center">
                      <Col xs lg="2">
                          <DatePicker selected={startDate} onChange={(date) => handleChange('startDate', date)} />
                      </Col>
                  </Row>
              </Container>
              <Container className="mt-md-5">
                  <Row className="justify-content-md-center">
                      <Col xs lg="6">
                          <InputGroup onChange={({ target }) => handleChange('description', target.value)} size="sm" className="mb-3">
                              <InputGroup.Text id="inputGroup-sizing-sm">Description</InputGroup.Text>
                              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                          </InputGroup>
                      </Col>
                  </Row>
              </Container>
              <Container className="mt-5">
                  <Row className="justify-content-md-center">
                      <Col xs lg="2">
                          <Button onClick={handleSubmit}>Add Schedule</Button>
                      </Col>
                  </Row>
              </Container>
              <Container className="mt-md-5">
                  <Row className="justify-content-md-center">
                      <Col xs>
                          <Table striped bordered hover>
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Description</th>
                                      <th>Start Date</th>
                                  </tr>
                              </thead>
                              {schedules.map(item => (
                                  <tbody key={item.id}>
                                      <tr>
                                          <td>{item.id}</td>
                                          <td>{item.description}</td>
                                          <td>{item.startDate.getDate() + '-' + item.startDate.getMonth() + '-' + item.startDate.getFullYear()}</td>
                                      </tr>
                                  </tbody>
                              ))}
                          </Table>
                      </Col>
                  </Row>
              </Container>
          </>
      );
  }
}

export default App;
