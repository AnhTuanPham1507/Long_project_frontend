import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function DeleteProductDetailModal(props) {
    const { isShow, onClose, onDeleteProductDetail, deletingProductDetail} = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleDeleteProductDetail(e) {
        e.preventDefault()
        if (onDeleteProductDetail)
            onDeleteProductDetail(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product Detail: {deletingProductDetail!= null ? deletingProductDetail.name: ""}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleDeleteProductDetail}>
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

export default DeleteProductDetailModal;