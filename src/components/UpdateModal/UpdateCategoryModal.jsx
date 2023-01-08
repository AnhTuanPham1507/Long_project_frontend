import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';

UpdateCategoryModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onUpdateCategory: PropTypes.func,
};

function UpdateCategoryModal(props) {
    const { isShow, onClose, onUpdateCategory, updatingCategory, errorMessage } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleUpdateCategory(e) {
        e.preventDefault()
        if (onUpdateCategory)
            onUpdateCategory(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật loại sản phẩm</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err,index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleUpdateCategory} encType="multipart/form-data">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên loại sản phẩm</Form.Label>
                        <Form.Control defaultValue={updatingCategory ? updatingCategory.name : ""} name="name" type="text" placeholder="Nhập tên loại sản phẩm"  required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control name="img" type="file" accept=".png, .jpg, .jpeg" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdateCategoryModal;