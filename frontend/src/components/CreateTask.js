import React, { useState, useEffect } from 'react'
import '../styles/css/CreateTask.css'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const jwtToken = localStorage.getItem("jwtToken");

const NewTask = () => {
    const [assignees, setAssignees] = useState([]);
    const [projectData] = useState({
        projectId: 1
    });

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        deadline: new Date(),
        priority: "",
        status: "",
        assigneeId: 0,
        projectId: projectData.projectId
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, deadline: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/tasks/create`, formData, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200 && response.data.id > 0) {
                window.location.reload();
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        const fetchAssignees = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects/${projectData.projectId}/users`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                });
                setAssignees(response.data);
            } catch (error) {
                console.error('Error fetching assignees:', error);
            }
        };

        fetchAssignees();
    }, []);

    return (
        <div className='formBackground'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className='DatePicker'>
                    <Form.Label>Select Deadline</Form.Label>
                    <DatePicker
                        selected={formData.deadline}
                        value={formData.deadline}
                        onChange={handleDateChange}
                    />
                </div>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Select Priority</Form.Label>
                    <Form.Select aria-label="Default select example"
                        name='priority'
                        value={formData.priority}
                        onChange={handleChange}>
                        <option> -- </option>
                        <option value="Highest">Highest</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                        <option value="Lowest">Lowest</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Select Status</Form.Label>
                    <Form.Select aria-label="Select Status"
                        name='status'
                        value={formData.status}
                        onChange={handleChange}>
                        <option> -- </option>
                        <option value="Open">Open</option>
                        <option value="InProgress">InProgress</option>
                        <option value="OnHold">OnHold</option>
                        <option value="InReview">InReview</option>
                    </Form.Select>
                </Form.Group>

                <Form.Select aria-label="Assignee"
                    name='assigneeId'
                    value={formData.assigneeId}
                    onChange={handleChange}>
                    <option>Select Assignee</option>
                    {assignees.map((assignee) => (
                        <option key={"assignee_" + assignee.id} value={assignee.id}>{`${assignee.firstname} ${assignee.lastname}`}</option>
                    ))}
                </Form.Select>

                <div className='Buttons'>
                    <Button variant='primary btn-lg' type='submit'>Assign</Button>
                    <Button variant='danger btn-lg' type='reset'>Cancel</Button>
                </div>
            </Form>
        </div>
    )
}

export default NewTask;