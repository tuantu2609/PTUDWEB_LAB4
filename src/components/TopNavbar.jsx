import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Lưu trữ hashtag nhập vào
  const [showSearch, setShowSearch] = useState(false); // Kiểm soát hiển thị ô nhập

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className="icon" />
      <h2>
        Following | <span>For You</span>{" "}
      </h2>
      <div className="search-container">
        {showSearch ? (
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search hashtag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch} // Xử lý khi nhấn Enter
              className="search-input"
            />
            <button
              className="close-search"
              onClick={() => setShowSearch(false)} // Đóng ô tìm kiếm
            >
              X
            </button>
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faSearch}
            className="icon"
            onClick={() => setShowSearch(true)} // Hiển thị ô nhập khi nhấn kính lúp
          />
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
