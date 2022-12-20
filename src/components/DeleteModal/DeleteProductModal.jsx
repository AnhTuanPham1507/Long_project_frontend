import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function DeleteProductModal(props) {
    const { isShow, onClose, onDeleteProduct, deletingProduct } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleDeleteProduct(e) {
        e.preventDefault()
        if (onDeleteProduct)
            onDeleteProduct()
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Category: {deletingProduct!= null ? deletingProduct.name: ""}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleDeleteProduct}>
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

export default DeleteProductModal;