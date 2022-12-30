import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';
import ORDERSTATUS from "../../enums/orderStatus"

UpdateExportOrderModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onUpdateCategory: PropTypes.func,
};

function UpdateExportOrderModal(props) {
    const { isShow, onClose, onUpdateExportOrder, updatingExportOrder, errorMessage } = props
    const [status, setStatus] = useState("new")
    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleUpdateOrder(e) {
        e.preventDefault()
        if (onUpdateExportOrder)
        onUpdateExportOrder({status})
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Status</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err,index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }

                {
                    ["success", "falied"].includes(updatingExportOrder?.status) ?
                    <h1>Bạn không thể thay đổi trạng thái đơn hàng được nữa!</h1> :
                    <Form onSubmit={handleUpdateOrder}>
                        <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select onChange={(e) => { setStatus(e.target.value) }}>
                            {
                                updatingExportOrder?.status === "new" ?
                                <>
                                    <option selected value="shipping">Giao hàng</option>
                                    <option value="failed">Bỏ đơn hàng</option>
                                </> :
                                updatingExportOrder?.status === "shipping" ?
                                    <>
                                    <option selected value="success">Giao thành công</option>
                                    <option value="failed">Bỏ đơn hàng</option>
                                    </> :
                                    <></>
                            }
                            </Form.Select>
                        </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Cập nhật
                        </Button>
                        </Modal.Footer>
                    </Form>
                }
        </Modal>
    );
}

export default UpdateExportOrderModal;