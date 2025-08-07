import styles from './blog.module.css'
import { Link } from 'react-router-dom'
import { blogPosts } from "./blogData.js";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Blog() {
  return (
    <>
        <Header/>
      <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>📚 Our Blog</h1>
      <div className={styles.blogList}>
         {blogPosts.map((post) => (
            <div key={post.id}  className={styles.blogCard}>
            <img src={post.image} alt={post.title} className={styles.blogImage} />
            <div className={styles.blogContent}>
              <h2 className={styles.blogPostTitle}>{post.title}</h2>
              <p className={styles.blogDate}>📅 {post.date}</p>
              <p className={styles.blogExcerpt}>{post.excerpt}</p>
             <Link to={`/post/${post.id}`} className={styles.readMore}>Read more</Link>
            </div>
          </div>
        ))}
        
    
      </div>
    </div>
      <Footer/>
      </>
  )
}

export default Blog