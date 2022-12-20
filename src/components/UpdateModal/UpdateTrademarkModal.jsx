import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';

UpdateTrademarkModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onUpdateTrademark: PropTypes.func,
};

function UpdateTrademarkModal(props) {
    const { isShow, onClose, onUpdateTrademark, updatingTrademark, errorMessage } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleUpdateTrademark(e) {
        e.preventDefault()
        if (onUpdateTrademark)
            onUpdateTrademark(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Trademark</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err,index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleUpdateTrademark} encType="multipart/form-data">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control defaultValue={updatingTrademark ? updatingTrademark.name : ""} name="name" type="text" placeholder="Type trademark name"  required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="img" type="file" accept=".png, .jpg, .jpeg" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdateTrademarkModal;