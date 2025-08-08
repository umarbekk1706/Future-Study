import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./course.module.css";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

function CoursePage() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState("");
  const user=JSON.parse(localStorage.getItem("user"));
  if(!user){
    navigate("/login")
  }

  useEffect(() => {
    fetch(`https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setActiveVideo(data.videos[0]); // birinchi video default
      });
  }, [id]);

  if (!course) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.courseContainer}>
          <div className={styles.infoSection}>
            <h1 className={styles.title}>{course.name}</h1>
            <p className={styles.desc}>{course.desc}</p>
            <div className={styles.meta}>
              <span><strong>Author:</strong> {course.author}</span>
              <span><strong>Rating:</strong> ⭐ {course.status}</span>
              <span><strong>Viewers:</strong> 👁 {course.viewer}</span>
            </div>
          </div>

          <div className={styles.videoSection}>
            {/* <ReactPlayer
              url={`${activeVideo}?rel=0`}
              controls
              width="100%"
              height="100%"
              className={styles.player}
            /> */}  
          </div>
        </div>
        <div className={styles.videoList}>
          {course.videos.map((videoUrl, index) => (
            <button
              key={index}
              className={`${styles.videoButton} ${videoUrl === activeVideo ? styles.active : ""}`}
              onClick={() => setActiveVideo(videoUrl)}
            >
              Video {index + 1}
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CoursePage;
