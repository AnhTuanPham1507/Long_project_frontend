import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';
import { ProductDetailSizes, ProductDetailColors } from "../../Data/Data";

CreateProductDetailModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onCreateProduct: PropTypes.func,
};

function CreateProductDetailModal(props) {

    const { isShow, onClose, onCreateProductDetail, errorMessage } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleCreateProduct(e) {
        e.preventDefault()
        if (onCreateProductDetail)
            onCreateProductDetail(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Product Detail</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err, index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleCreateProduct} encType="multipart/form-data">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Select 
                            name="size" aria-label="Select Size">
                            {
                                ProductDetailSizes.map((size, index) => {
                                    return (<option key={index} value={size}>{size}</option>)
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Select 
                            name="color" aria-label="Select Color">
                            {
                                ProductDetailColors.map((color, index) => {
                                    return (<option key={index} value={color}>{color}</option>)
                                })
                            }
                        </Form.Select>
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

export default CreateProductDetailModal;