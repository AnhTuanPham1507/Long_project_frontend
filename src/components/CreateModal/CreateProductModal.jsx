import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { categoryAPI, trademarkAPI } from '../../api/axios';
import axios from 'axios';


CreateProductModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onCreateProduct: PropTypes.func,
};

function CreateProductModal(props) {
    const [categories, setCategories] = useState([])
    const [trademarks, setTrademarks] = useState([])

    const { isShow, onClose, onCreateProduct, errorMessage } = props

    useEffect(() => {
        async function getCategories() {
            try {
                const res = await categoryAPI.getAll()
                setCategories(res.data)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    alert(error.response.data.message)
                    return
                }
                alert(error.toString())
            }
        }

        async function getTrademarks() {
            try {
                const res = await trademarkAPI.getAll()
                setTrademarks(res.data)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    alert(error.response.data.message)
                    return
                }
                alert(error.toString())
            }
        }

        getCategories()
        getTrademarks()
    }, [])

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleCreateProduct(e) {
        e.preventDefault()
        if (onCreateProduct)
            onCreateProduct(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tạo sản phẩm mới</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err, index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleCreateProduct} encType="multipart/form-data">

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Type product name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá bán</Form.Label>
                        <Form.Control name="price" type="number" min="1" placeholder="Type product price (VND)" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control name="description" type="text" placeholder="Type product description" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control name="imgs" type="file" accept=".png, .jpg, .jpeg" multiple/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại sản phẩm</Form.Label>
                        <Form.Select name="r_category" aria-label="Select Category">
                            {
                                categories.map(cate => (
                                    <option key={cate._id} value={cate._id}>{cate.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Thương hiệu</Form.Label>
                        <Form.Select name="r_trademark" aria-label="Select Trademark">
                            {
                                trademarks.map(trademark => (
                                    <option key={trademark._id} value={trademark._id}>{trademark.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Tạo sản phẩm
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateProductModal;