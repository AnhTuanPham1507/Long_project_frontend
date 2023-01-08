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
                <Modal.Title>Xóa loại sản phẩm: {deletingCategory!= null ? deletingCategory.name: ""}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleDeleteCategory}>
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

export default DeleteCategoryModal;