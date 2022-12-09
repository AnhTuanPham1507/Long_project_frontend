import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { productAPI } from '../../api/axios';


function CreateImportOrderDetailModaldal(props) {
    const [products, setProducts] = useState([])
    const [indexActiveProduct, setIndexActiveProduct] = useState(0)
    const [details, setDetails] = useState([])
    const [indexActiveDetail, setIndexActiveDetail] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(1)
    const [consignmentStatus, setConsignmentStatus] = useState("new")

    const { isShow, onClose, onAddMoreDetail } = props

    useEffect(() => {
        async function getStartingProducts() {
            try {
                const res = await productAPI.getAll()
                const startingProducts = res.data
                setProducts(startingProducts)
            } catch (error) {
                alert(error.toString())
            }
        }
        getStartingProducts()
    }, [])

    useEffect(() => {
        if (products[indexActiveProduct] !== undefined)
            setDetails(products[indexActiveProduct].r_productDetails)
    }, [indexActiveProduct, products])

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleAddMoreProducts(e) {
        e.preventDefault()
        if (onAddMoreDetail) {
            const activeProduct = products[indexActiveProduct]
            const activeProductDetail = activeProduct.r_productDetails[indexActiveDetail]
            console.log(activeProductDetail)
            onAddMoreDetail({
                _id: activeProductDetail._id,
                name: `${activeProduct.name} ${activeProductDetail.color} - Size: ${activeProductDetail.size}`,
                quantity: parseInt(quantity),
                price: parseInt(price),
                consignmentStatus
            })
        }
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add More Products</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddMoreProducts}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Product</Form.Label>
                        <Form.Select onChange={(e) => { console.log(e.target.value); setIndexActiveProduct(e.target.value) }}>
                            {
                                products.map((product, index) => (
                                    <option key={product._id} value={index}>{product.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Choose Size And Color</Form.Label>
                        <Form.Select onChange={(e) => { setIndexActiveDetail(e.target.value) }}>
                            {
                                details.map((detail, index) => (
                                    <option key={detail._id} value={index}>{detail.color} - {detail.size}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control min={1} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control min={1} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select onChange={(e) => { setConsignmentStatus(e.target.value) }}>
                            <option  value={"new"}>New</option>
                            <option  value={"in_stock"}>In stock now</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateImportOrderDetailModaldal;