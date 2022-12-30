import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function DeleteCategoryModal(props) {
    const { isShow, onClose, onDeleteCategory, deletingCategory } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleDeleteCategory(e) {
        e.preventDefault()
        if (onDeleteCategory)
            onDeleteCategory()
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Category: {deletingCategory!= null ? deletingCategory.name: ""}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleDeleteCategory}>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default DeleteCategoryModal;