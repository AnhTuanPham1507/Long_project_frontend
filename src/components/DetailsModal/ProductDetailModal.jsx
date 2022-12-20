import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Card, Button, Row, Col } from "react-bootstrap";
import UpdateProductDetailModal from "../UpdateModal/UpdateProductDetailModal";
import CreateProductDetailModal from "../CreateModal/CreateProductDetailModal";
import { productDetailAPI } from "../../api/axios";
import axios from "axios";
import Loading from "../Loading/Loading";
import { IconButton, Tooltip } from "@mui/material";
import { UilPen } from "@iconscout/react-unicons";
import DeleteProductDetailModal from "../DeleteModal/DeleteProductDetailModal";

ProductDetailModal.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
  product: PropTypes.object,
};

function ProductDetailModal(props) {
  const { isShow, onClose, product, onUpdatingProductDetail, onCreatingProductDetail } = props;
  const [productdetails, setProductDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [clickedElement, setClickedElement] = useState(null);

  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);
  const [isShowDeleteForm, setIsShowDeleteForm] = useState(false);

  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState(null);
  const [errorCreatingMessage, setErrorCreatingMessage] = useState(null);

  async function handleUpdateProductDetail(form) {
    setErrorUpdatingMessage(null);
    setIsShowUpdateForm(false);
    setIsLoading(true);
    try {
      const formData = new FormData(form);
      const res = await productDetailAPI.update(clickedElement._id, formData);
      if (onUpdatingProductDetail) onUpdatingProductDetail(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorUpdatingMessage(error.response.data.message);
        setIsShowUpdateForm(true);
        return;
      }
      alert(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateProductDetail(form) {
    setErrorCreatingMessage(null);
    setIsShowCreateForm(false);
    setIsLoading(true);
    try {
      const formData = new FormData(form);
      formData.append("r_product", product._id)
      const res = await productDetailAPI.create(formData);
      if (onCreatingProductDetail) 
        onCreatingProductDetail(res.data[0]);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorCreatingMessage(error.response.data.message);
        setIsShowCreateForm(true);
        return;
      }
      alert(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteProductDetail() {
    setIsShowDeleteForm(false);
    setIsLoading(true);
    try {
      await productDetailAPI.delete(clickedElement._id);
      const newProductDetail = productdetails.filter(
        (pddt) => pddt._id !== clickedElement._id
      );
      setProductDetails(newProductDetail);
      setClickedElement(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        alert(error.response.data.message);
        return;
      }
      alert(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    if (onClose) onClose();
  }

  return (
    product != null && (
      <>
        <Modal size="xl" show={isShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{product.name}</Modal.Title>
            <Tooltip
              title="Create Product Detail"
              onClick={() => {
                setIsShowCreateForm(true);
              }}
            >
              <IconButton>
                <UilPen />
              </IconButton>
            </Tooltip>
          </Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <Loading />
            ) : (
              <Row xs={1} md={3} className="g-4">
                {product.r_productDetails.map((detail) => (
                  <Col key={detail._id}>
                    <Card style={{ width: "15rem" }}>
                      <Card.Img
                        style={{ height: "150px" }}
                        variant="top"
                        src={`${window.env.CLOUDINARY_URL}/${detail.img}`}
                      />
                      <Card.Body>
                        <Card.Title>{`Color: ${detail.color}`}</Card.Title>
                        <Card.Title>{`Size: ${detail.size}`}</Card.Title>
                        <Button
                          onClick={() => {
                            setClickedElement(detail);
                            setIsShowUpdateForm(true);
                          }}
                          variant="primary"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => {
                            setClickedElement(detail);
                            setIsShowDeleteForm(true)
                          }}
                          style={{ marginLeft: "6px" }}
                          variant="primary"
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Modal.Body>
        </Modal>
        <UpdateProductDetailModal
          updatingProductDetail={clickedElement}
          errorMessage={errorUpdatingMessage}
          onUpdateProductDetail={handleUpdateProductDetail}
          isShow={isShowUpdateForm}
          onClose={() => {
            setIsShowUpdateForm(false);
          }}
        />
        <CreateProductDetailModal
          isShow={isShowCreateForm}
          onClose={() => { setIsShowCreateForm(false) }}
          onCreateProductDetail={handleCreateProductDetail}
          errorMessage={errorCreatingMessage}
        />
        <DeleteProductDetailModal
          isShow={isShowDeleteForm}
          onClose={() => {
            setIsShowDeleteForm(false);
          }}
          onDeleteProductDetail={handleDeleteProductDetail}
          deletingProductDetail={clickedElement}
        />
      </>
    )
  );
}
export default ProductDetailModal;
