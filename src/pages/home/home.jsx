import styles from "./home.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Course from "../../components/Course";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/courses")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const user = JSON.parse(localStorage.getItem("user"))
  function checkuser() {
    if (user) {
      navigate("/courses")
    } else {
      navigate("/login")
    }
  }


  return (
    <div>
      <Header></Header>
      <div className={styles.hero} id="hero">
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <h1>
              Enhance your knowledge,create the future.
            </h1>
            <p>
              Take your knowledge to the next level through modern courses and interactive tests.
            </p>
            <button className={styles.ctaBtn} onClick={checkuser}>
              View Courses <span>→</span>
            </button>
          </div>

          <div className={styles.heroRight}>
            <img src="./heroimg.png" alt="Hero rasm" />
          </div>
        </div>
      </div>



      <div className={styles.container} id="courses">
        <h2 className={styles.title}>Courses</h2>
        <div className={styles.grid}>
          {data?.map((item) => (
            <Course key={item?.id} styles={styles} data={item} />
          ))}
        </div>
      </div>

      <div className={styles.statsSection} id="stats">
        <h2 className={styles.statsTitle}>Statistics</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👥</div>
            <div className={styles.statValue}>10,000+</div>
            <div className={styles.statLabel}>Users</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📖</div>
            <div className={styles.statValue}>200+</div>
            <div className={styles.statLabel}>Courses</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📝</div>
            <div className={styles.statValue}>5,000+</div>
            <div className={styles.statLabel}>Tests</div>
          </div>
        </div>
      </div>

      <div className={styles.reviewsSection} id="review">
        <h2 className={styles.reviewsTitle}>Terms of Use yoki Terms and Conditions</h2>
        <div className={styles.reviewsGrid}>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.reviewText}>
              "Through this platform, my knowledge in mathematics has improved significantly. The tests are very useful!"
            </p>
            <div className={styles.reviewer}>
              <div className={styles.avatar}></div>
              <div>
                <div className={styles.name}>Aziz Karimov</div>
                <div className={styles.role}>Student</div>
              </div>
            </div>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.reviewText}>
              "A great resource for my students. The quality of the courses and ease of understanding are excellent."
            </p>
            <div className={styles.reviewer}>
              <div className={styles.avatar}></div>
              <div>
                <div className={styles.name}>Nilufar Sobirova</div>
                <div className={styles.role}>Teacher</div>
              </div>
            </div>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★☆</div>
            <p className={styles.reviewText}>
              "Completing the programming courses greatly helped me get a job. Thank you!!"
            </p>
            <div className={styles.reviewer}>
              <div className={styles.avatar}></div>
              <div>
                <div className={styles.name}>Jasur Toshmatov</div>
                <div className={styles.role}>IT Specialist</div>
              </div>
            </div>
          </div>
        </div>

        <h2 className={styles.howItWorksTitle}>How does it work</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              📘<span className={styles.stepNumber}>1</span>
            </div>
            <div className={styles.stepTitle}>Choose a course</div>
            <div className={styles.stepDesc}>
              Select your preferred course and register
            </div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              🎥<span className={styles.stepNumber}>2</span>
            </div>
            <div className={styles.stepTitle}>Master the content</div>
            <div className={styles.stepDesc}>
              Watch the video lessons and review the supplementary materials.
            </div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              🧠<span className={styles.stepNumber}>3</span>
            </div>
            <div className={styles.stepTitle}>Attempt the test questions</div>
            <div className={styles.stepDesc}>
              Try practice tests to reinforce what you’ve learned!
            </div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              🎓<span className={styles.stepNumber}>4</span>
            </div>
            <div className={styles.stepTitle}>Get a certificate</div>
            <div className={styles.stepDesc}>
              Demonstrate your achievement by securing your course certificate.
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Home;
