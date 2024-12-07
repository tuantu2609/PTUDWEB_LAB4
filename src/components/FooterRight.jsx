import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import "./FooterRight.css";

function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
  videoRef,
  videoUrl,
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [isMuted, setIsMuted] = useState(false); // Trạng thái âm thanh
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000);
  };

  const handleShareClick = () => {
    setShowSharePopup(true); // Hiển thị popup khi nhấn nút Share
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false); // Đóng popup khi nhấn nút X
  };

  const handleSaveClick = () => {
    setSaved((prevSaved) => !prevSaved);

    if (!saved && videoUrl) {
      const absoluteUrl = `${window.location.origin}${videoUrl}`;
      navigator.clipboard
        .writeText(absoluteUrl) // Sao chép URL vào clipboard
        .then(() => {
          alert("Video URL copied to clipboard!"); // Hiển thị thông báo thành công
        })
        .catch((error) => {
          console.error("Failed to copy video URL", error);
        });
    }
  };

  const handleMuteClick = () => {
    setIsMuted(!isMuted); // Đảo trạng thái âm thanh
    if (videoRef && videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("k")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {profilePic ? (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: "45px", height: "45px", color: "#616161" }}
          />
        ) : null}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: "15px", height: "15px", color: "#FF0000" }}
          onClick={handleUserAddClick}
        />
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: "35px",
            height: "35px",
            color: liked ? "#FF0000" : "white",
          }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{comments}</p>
      </div>

      {/* <div className="sidebar-icon">
        {saved ? (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: "35px", height: "35px", color: "#ffc107" }}
            onClick={() => setSaved(false)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: "35px", height: "35px", color: "white" }}
            onClick={() => setSaved(true)}
          />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div> */}
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faBookmark}
          style={{
            width: "35px",
            height: "35px",
            color: saved ? "#ffc107" : "white",
          }}
          onClick={handleSaveClick}
        />
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: "35px", height: "35px", color: "white" }}
          onClick={handleShareClick}
        />
        <p>{shares}</p>
      </div>

      <div className="sidebar-icon">
        {/* Nút mute/unmute */}
        <FontAwesomeIcon
          icon={isMuted ? faVolumeMute : faVolumeUp}
          style={{ width: "35px", height: "35px", color: "white" }}
          onClick={handleMuteClick}
        />
        <p>{isMuted ? "Unmuted" : "Muted"}</p>
      </div>

      <div className="sidebar-icon record">
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
        />
      </div>

      {showSharePopup && (
        <div className="share-popup-overlay">
          <div className="share-popup">
            <button
              className="close-button"
              onClick={handleCloseSharePopup} // Đóng popup
            >
              X
            </button>
            <h3>Share this video</h3>
            <div className="share-options">
              <button>Facebook</button>
              <button>Instagram</button>
              <button>Thread</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
