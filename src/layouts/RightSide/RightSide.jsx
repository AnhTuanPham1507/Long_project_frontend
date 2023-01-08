import React from "react";
import Updates from "../../components/Notification/Notification";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <h2> Thông báo</h2>
        <Updates />
      </div>
    </div>
  );
};

export default RightSide;
