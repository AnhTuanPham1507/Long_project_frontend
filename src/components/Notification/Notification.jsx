import React from "react";
import "./Notification.css";

const Notification = () => {
  return (
    <div className="Updates">
          <div className="update">
            <img src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-9/68777839_1250101721841100_3044441315266789376_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1o25qcbBmiAAX9lyCIu&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfCxG8US1KAxv4Cw4E1QsDGH-eIZgAwHZmRM74qJvu4qKQ&oe=63A50489" alt="profile" />
            <div className="noti">
              <div  style={{marginBottom: '0.5rem'}}>
                <span>Long ngu</span>
                <span> xóa đồ án</span>
              </div>
                <span>20-10-2022</span>
            </div>
          </div>
    </div>
  );
};

export default Notification;
