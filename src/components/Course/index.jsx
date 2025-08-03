import { Link, useNavigate } from "react-router-dom";

function CourseCard({ styles, data }) {
  const navigate = useNavigate();
  
  function course(id) {
    let isLogin = localStorage.getItem("login");    
    navigate(isLogin ? `/course/${id}` : "login");
  }

  return (
    <div className={styles.card}>
      <div className={styles.categoryBadge}>{data?.type}</div>
      <div className={styles.imagePlaceholder}>
        <img
          src={
            data?.avatar > 9
              ? data?.imgUrl
              : "https://www.shutterstock.com/image-photo/online-education-elearning-concept-person-600nw-2525348649.jpg"
          }
          alt={data?.name}
        className={styles.cardImg}/>
      </div>
      <div className={styles.cardContent}>
        <strong className={styles.courseTitle}>{data?.name}</strong>
        <p className={styles.description}>{data?.desc}</p>
        <div className={styles.meta}>
          <span>⭐ {data?.star}</span>
          <span className={styles.metaViews}>👁 {data?.viewer}</span>
        </div>

        <button onClick={() => course(data.id)} className={styles.viewButton}>
          Kursni ko'rish
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
