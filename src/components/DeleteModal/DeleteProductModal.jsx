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
                <Modal.Title>Xóa sản phẩm: {deletingProduct!= null ? deletingProduct.name: ""}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleDeleteProduct}>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Lưu thay đổi
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default DeleteProductModal;