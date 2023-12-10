import React, { useState } from 'react'
import '../styles/css/CreateTask.css'
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';
// import { Flex } from 'antd';

const NewTask = () =>{
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState();

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
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

                <div className='DatePicker'>
                    <Form.Label>Select Dealdine</Form.Label>
                    <input type='date' onChange={e => setDate(e.target.value)}></input>
                </div>
                 {/* error with useState*/}
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

export default NewTask