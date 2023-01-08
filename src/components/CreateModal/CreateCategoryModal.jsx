import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';

CreateCategoryModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onCreateCategory: PropTypes.func,
};

function CreateCategoryModal(props) {
    const { isShow, onClose, onCreateCategory, errorMessage } = props
    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleCreateCategory(e) {
        e.preventDefault()
        if (onCreateCategory)
            onCreateCategory(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Category</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err,index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleCreateCategory} encType="multipart/form-data">

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control  name="name" type="text" placeholder="Type catagory name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="img" type="file" accept=".png, .jpg, .jpeg" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateCategoryModal;