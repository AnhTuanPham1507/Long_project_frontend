import axios from "axios";
import React, { useEffect, useState } from "react";
import { notificationAPI } from "../../api/axios";
import { fDate, fToNow } from "../../utils/formatTime";
import Loading from "../Loading/Loading";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getNotifications() {
      setLoading(true)
      try {
        const res = await notificationAPI.getAll();
        setNotifications(res.data);
      } catch (error) {
        if (axios.isAxiosError(error))
          alert((error.response ? error.response.data.message : error.message));
        else alert((error.toString()));
      } finally {
        setLoading(false)
      }
    }
    getNotifications();
  },[])

  return (
    loading ?
      <Loading /> :
      <div className="Updates">
        {
          notifications?.map(n => (
            <div className="update">
              <img src={`${window.env.CLOUDINARY_URL}${n.r_consignment.r_product.imgs[0]}`} alt="profile" />
              <div className="noti">
                <div style={{ marginBottom: '0.5rem' }}>
                  <span>Hệ Thống</span>
                  <div>Lô hàng {n.r_consignment.r_product.name} nhập ngày {fDate(n.r_consignment.importedAt)} sắp hết, hãy chú ý kiếm tra kho hàng của bạn</div>
                </div>
                <span>{fToNow(n.createdAt)}</span>
              </div>
            </div>
          ))
        }
      </div>
  );
};

export default Notification;
