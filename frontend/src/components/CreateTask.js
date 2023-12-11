import React, { useState , useEffect} from 'react'
import '../styles/css/CreateTask.css'
import Form from 'react-bootstrap/Form';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const NewTask = () =>{
    const [date, setDate] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/v1/projects?page=0&size=5', {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0YXNrc3BoZXJlLmNvbSIsImlhdCI6MTcwMjI2MzEzOSwiZXhwIjoxNzAyMzQ5NTM5fQ.pywRzp3DiTErzwDFnGQRFQvxJrPFBQYzTukXnhHnVSc`,
                  },
            });
            
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, []);

      console.log(data);

    return(
        <div className='formBackground'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Project</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select Project</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control type='text'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <div className='DatePicker'>
                    <Form.Label>Select Dealdine</Form.Label>
                    <input type='date' onChange={e => setDate(e.target.value)}></input>
                </div>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Select Priority</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Priority</option>
                        <option value="1">Highest</option>
                        <option value="2">High</option>
                        <option value="3">Medium</option>
                        <option value="2">Low</option>
                        <option value="3">Lowest</option>
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Assignee</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select Member</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
            
            </Form>
            <div className='Buttons'>
                <Button variant='primary btn-lg'>Assign</Button>
                <Button variant='danger btn-lg'>Cancel</Button>
            </div>
            

        </div>
    )
}

export default NewTask;