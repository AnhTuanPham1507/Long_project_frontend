import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';
import  numberWithCommas  from '../../utils/FormatPrice';
import { useEffect } from 'react';
import CreateImportOrderDetailModaldal from './CreateImportOrderDetailModal';
import { useState } from 'react';

function CreateImportOrderModal(props) {
    const [details, setDetails] = useState([])
    const [importedAt, setImportedAt] = useState(new Date())
    const [totalPrice, setTotalPrice] = useState(0)
    const [isShowDetailForm, setIsShowDetailForm] = useState(false)

    const { isShow, onClose, onCreateImportOrder, errorMessage } = props

    useEffect(() => {
        const tempTotalPrice = details.reduce((total, detail) => total + detail.price * detail.quantity, 0)
        setTotalPrice(tempTotalPrice)
    }, [details])

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleCreateImportOrder(e) {
        e.preventDefault()
        if(onCreateImportOrder){
            const tempDetails = details.map(detail => {
                return {
                    r_product: detail._id,
                    quantity: detail.quantity,
                    price: detail.price,
                    size: Number(detail.size),
                    consignmentStatus: detail.consignmentStatus
                }
            })
            onCreateImportOrder({totalPrice,importedAt,r_importDetails:tempDetails})
        }
    }

    function handleAddMoreDetail(detail) {
        const newDetails = [...details]
        const foundDetail = newDetails.find(d => d._id === detail._id && d.size === detail.size)
        if (foundDetail)
            foundDetail.quantity += detail.quantity
        else
            newDetails.push(detail)
        setIsShowDetailForm(false)
        setDetails(newDetails)
    }

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm đơn nhập hàng</Modal.Title>
                </Modal.Header>
                {errorMessage ?
                    errorMessage.split("---").map((err, index) => <Alert key={index} severity="error">{err}</Alert>) :
                    <></>
                }
                <Form onSubmit={handleCreateImportOrder}>

                    <Modal.Body>
                        <Form.Group className="mb-3" >
                            <Form.Label>
                                Sản phẩm
                            </Form.Label>
                            {
                                details.map(detail => (
                                    <Form.Check
                                        key={detail._id}
                                        type={"checkbox"}
                                        id={`${detail._id}`}
                                        label={`${detail.name} - Quantity: ${detail.quantity} - Price: ${numberWithCommas(detail.price)}`}
                                        defaultChecked={true}
                                        onChange={(e) => setDetails(details.filter(d => d._id !== detail._id))}
                                    />
                                ))
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tạo vào:</Form.Label>
                            <Form.Control max={new Date()} type="date" value={importedAt} onChange={(e) => setImportedAt(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tổng giá nhập: <strong>{numberWithCommas(totalPrice)}</strong></Form.Label>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setIsShowDetailForm(true)}>
                            Thêm sản phẩm nhập
                        </Button>
                        <Button variant="primary" type="submit">
                            Tạo đơn nhập kho
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <CreateImportOrderDetailModaldal
                isShow={isShowDetailForm}
                onClose={() => setIsShowDetailForm(false)}
                onAddMoreDetail={handleAddMoreDetail}
            />
        </>
    );
}

export default CreateImportOrderModal;