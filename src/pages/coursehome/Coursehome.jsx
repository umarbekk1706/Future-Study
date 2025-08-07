import styles from "./coursehome.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Course from "../../components/Course";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Coursehome() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/courses")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Ma'lumot yuklashda xatolik:", error));
  }, []);


  if (!data || data.length === 0) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <Header />
               <h1 className={styles.coursh1}>All courses</h1>
      <div className={styles.container} id="courses">
        <div className={styles.grid}>
          {data.map((item) => (
            <Course key={item?.id} styles={styles} data={item} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Coursehome;
