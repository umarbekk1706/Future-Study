import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./test.module.css";


function Test() {
  const [testlar, setTestlar] = useState([]);
  const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
  if(!user){
    navigate("/login")
  }

  useEffect(() => {
    fetch(`https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/tests`)
      .then((res) => res.json())
      .then((data) => {
        setTestlar(data);
      });
  }, []);

  const handleStartTest = (id) => {
    navigate(`/solve-test/${id}`);
  };

  return (
    <div>
      <Header />
 <div className={styles.main} >
      <div className="container">
        <h2 className={styles.title}>Testlar Ro'yxati</h2>
        <div className={styles.testContainer}>
          {testlar.map((test) => (
            <div key={test.id} className={styles.card}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135765.png"
                alt="test icon"
                className={styles.testIcon}
              />
              <h3>{test.title}</h3>
              <p>Savollar soni: {test.questions?.length || 0}</p>
              <button onClick={() => handleStartTest(test.id)}>
                Testni boshlash
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
     
      <Footer />
    </div>
  );
}

export default Test;
