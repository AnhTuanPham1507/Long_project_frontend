import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { categoryAPI, trademarkAPI } from '../../api/axios';
import axios from 'axios';

UpdateProductModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onUpdateProduct: PropTypes.func,
};

function UpdateProductModal(props) {
    const [categories, setCategories] = useState([])
    const [trademarks, setTrademarks] = useState([])

    const { isShow, onClose, onUpdateProduct, updatingProduct, errorMessage } = props

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

    function handleUpdateProduct(e) {
        e.preventDefault()
        if (onUpdateProduct)
            onUpdateProduct(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật sản phẩm</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err, index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleUpdateProduct} encType="multipart/form-data">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control defaultValue={updatingProduct ? updatingProduct.name : ""} name="name" type="text" placeholder="Nhập tên sản phẩm" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá bán</Form.Label>
                        <Form.Control defaultValue={updatingProduct ? updatingProduct.price : 2} name="price" type="number" min="1" placeholder="Nhập giá bán (VND)" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control defaultValue={updatingProduct ? updatingProduct.description : ""} name="description" type="text" placeholder="Nhập mô tả sản phẩm" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control name="imgs" type="file" accept=".png, .jpg, .jpeg" multiple/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Loại sản phẩm</Form.Label>
                        <Form.Select defaultValue={updatingProduct?.r_category._id} name="r_category" aria-label="Select Category">
                            {
                                categories?.map(cate => {
                                    return (<option key={cate._id} value={cate._id}>{cate.name}</option>)
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Thương hiệu</Form.Label>
                        <Form.Select defaultValue={ updatingProduct?.r_trademark._id} name="r_trademark" aria-label="Select Trademark">
                            {
                                trademarks?.map(trademark => {
                                    return <option key={trademark._id} value={trademark._id}>{trademark.name}</option>
                                })
                            }
                        </Form.Select>
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

export default UpdateProductModal;