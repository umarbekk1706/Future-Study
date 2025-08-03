import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./detail.module.css"; 
import { blogPosts } from "./detailData"; 

function Detail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = blogPosts.find((item) => item.id.toString() === id);
    if (foundPost) {
      setPost(foundPost); 
    } else {
      setPost(null); 
    }
    setLoading(false); 
  }, [id]);

  
  if (loading) return <p>⏳ Yuklanmoqda...</p>;


  if (!post) return <p>❌ Post topilmadi</p>;

  
  const content = post.content || post.body || "Content mavjud emas"; 

  return (
    <div className={styles.blogContainer}>
      
      <Link to="/blogs" className={styles.backLink}>
        ← Orqaga
      </Link>

      
      <div className={styles.blogCard}>
        {/* <img
          src={post.image || `https://picsum.photos/seed/${post.id}/800/400`} // Postning rasmini chiqarish
          alt={post.title}
          className={styles.blogImage}
        /> */}
        <div className={styles.blogContent}>
          <h2 className={styles.blogPostTitle}>{post.title}</h2>
          <p className={styles.blogDate}>📅 {post.date}</p>
          {/* Post kontentini ko'rsatish */}
          <p className={styles.blogBody}>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
