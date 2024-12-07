import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    // profilePic: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D',
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzP19hTpBvH-pZ8hFdy9O6HbvZbKUbMRI0w&s",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startY = useRef(null); // To track initial Y position of mouse
  const [showDetails, setShowDetails] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState([]); // Video đã lọc
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = videos.filter((video) =>
        video.description.toLowerCase().includes(`#${searchTerm.toLowerCase()}`)
      );
      console.log("Search Term:", searchTerm); // Hiển thị từ khóa tìm kiếm
      console.log("Filtered Videos:", filtered); // Hiển thị danh sách đã lọc
      setFilteredVideos(filtered); // Lọc video theo hashtag
    } else {
      setFilteredVideos(videos); // Hiển thị toàn bộ video nếu không tìm kiếm
    }
  }, [searchTerm, videos]);

  useEffect(() => {
    const videoList = searchTerm.trim() ? filteredVideos : videos;
    if (currentIndex >= videoList.length) {
      setCurrentIndex(0); // Đặt lại index nếu vượt quá danh sách
    }
  }, [filteredVideos, searchTerm, videos, currentIndex]);

  const handleSearch = (term) => {
    console.log("Search initiated with term:", term); // Log từ khóa tìm kiếm
    setSearchTerm(term); // Cập nhật từ khóa tìm kiếm
    if (!term.trim()) {
      setFilteredVideos(videos); // Hiển thị toàn bộ video nếu không có từ khóa
    }
  };

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const handleMouseDown = (e) => {
    startY.current = e.clientY; // Store the initial Y position
  };

  // const handleMouseUp = (e) => {
  //   if (startY.current === null) return;

  //   const endY = e.clientY;
  //   const distance = endY - startY.current;

  //   if (distance > 100 && currentIndex > 0) {
  //     // Scroll up
  //     setCurrentIndex((prevIndex) => prevIndex - 1);
  //   } else if (distance < -100 && currentIndex < videos.length - 1) {
  //     // Scroll down
  //     setCurrentIndex((prevIndex) => prevIndex + 1);
  //   }
  //   startY.current = null; // Reset startY
  // };

  const handleMouseUp = (e) => {
    if (startY.current === null) return;

    const endY = e.clientY;
    const distance = endY - startY.current;

    const videoList = searchTerm ? filteredVideos : videos;

    if (distance > 100 && currentIndex > 0) {
      // Scroll up
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (distance < -100 && currentIndex < videoList.length - 1) {
      // Scroll down
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    startY.current = null; // Reset startY
  };

  useEffect(() => {
    // Scroll to the current video
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      setShowDetails(true); // Hiển thị chi tiết người dùng
    } else if (e.key === "Escape") {
      setShowDetails(false); // Ẩn chi tiết người dùng
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="app"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="container">
        <TopNavbar className="top-navbar" onSearch={handleSearch} />
        {/* Here we map over the videos array and create VideoCard components */}
        {(searchTerm ? filteredVideos : videos).map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            comments={video.comments}
            saves={video.saves}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === currentIndex}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
      {/* {showDetails && (
        <div className="user-details-overlay">
          <div className="details-content">
            <img src={videos[currentIndex].profilePic} alt="Profile" />
            <h2>@{videos[currentIndex].username}</h2>
            <p>{videos[currentIndex].description}</p>
            <p>Bài hát: {videos[currentIndex].song}</p>
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )} */}
      {showDetails && (
        <div className="user-details-overlay">
          <div className="details-content">
            <img
              src={
                (searchTerm ? filteredVideos : videos)[currentIndex].profilePic
              }
              alt="Profile"
            />
            <h2>
              @{(searchTerm ? filteredVideos : videos)[currentIndex].username}
            </h2>
            <p>
              {(searchTerm ? filteredVideos : videos)[currentIndex].description}
            </p>
            <p>
              Bài hát:{" "}
              {(searchTerm ? filteredVideos : videos)[currentIndex].song}
            </p>
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
