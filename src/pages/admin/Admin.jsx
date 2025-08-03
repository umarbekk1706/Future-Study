"use client"

import { useState, useEffect } from "react"
import styles from "./admin.module.css"

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeSection, setActiveSection] = useState("statistics")
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(false)
   const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  const [courseFormData, setCourseFormData] = useState({
    name: "",
    avatar: "",
    type: "",
    viewer: 0,
    star: 0,
    desc: "",
    author: "",
    videos: [""],
    status: 0,
  })

  // Login credentials
  const ADMIN_LOGIN = "test1234"
  const ADMIN_PASSWORD = "user1234"

   useEffect(() => {
    fetch("https://6825bb6d0f0188d7e72e379f.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);
   useEffect(() => {
    fetch("https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);
   useEffect(() => {
    fetch("https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/tests")
      .then((res) => res.json())
      .then((data) => setTests(data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  useEffect(() => {
    if (isLoggedIn && activeSection === "users") {
      setUsers(users)
    } else if (isLoggedIn && activeSection === "courses") {
      setCourses(courses)
    } else if (isLoggedIn && activeSection === "tests") {
      setTests(tests)
    }
  }, [activeSection, isLoggedIn])

  const handleLogin = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const login = formData.get("login")
    const password = formData.get("password")

    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setActiveSection("statistics")
    } else {
      alert("Noto'g'ri login yoki parol!")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveSection("statistics")
  }
const handleAddCourse = () => {
    setShowAddCourseModal(true)
  }
    const handleCloseModal = () => {
    setShowAddCourseModal(false)
    setCourseFormData({
      name: "",
      avatar: "",
      type: "",
      viewer: 0,
      star: 0,
      desc: "",
      author: "",
      videos: [""],
      status: 0,
    })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseFormData((prev) => ({
      ...prev,
      [name]: name === "viewer" || name === "star" || name === "status" ? Number(value) : value,
    }))
  }
   const handleVideoChange = (index, value) => {
    const newVideos = [...courseFormData.videos]
    newVideos[index] = value
    setCourseFormData((prev) => ({
      ...prev,
      videos: newVideos,
    }))
  }
   const addVideoField = () => {
    setCourseFormData((prev) => ({
      ...prev,
      videos: [...prev.videos, ""],
    }))
  }
  const removeVideoField = (index) => {
    if (courseFormData.videos.length > 1) {
      const newVideos = courseFormData.videos.filter((_, i) => i !== index)
      setCourseFormData((prev) => ({
        ...prev,
        videos: newVideos,
      }))
    }
  }
  
  const handleSubmitCourse = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...courseFormData,
          videos: courseFormData.videos.filter((video) => video.trim() !== ""),
        }),
      })

      if (response.ok) {
        const newCourse = await response.json()
        setCourses((prev) => [...prev, newCourse])
        handleCloseModal()
        alert("Kurs muvaffaqiyatli qo'shildi!")
      } else {
        throw new Error("Kurs qo'shishda xatolik")
      }
    } catch (error) {
      alert("Xatolik yuz berdi: " + error.message)
    } finally {
      setLoading(false)
    }
  }
const deleteUser = async (userId) => {
  if (window.confirm("Foydalanuvchini o'chirishni tasdiqlaysizmi?")) {
    setLoading(true);
    try {
      const response = await fetch(`https://6825bb6d0f0188d7e72e379f.mockapi.io/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("O‘chirishda xatolik yuz berdi");
      }
      setUsers(users.filter((user) => user.id !== userId));
      alert("Foydalanuvchi muvaffaqiyatli o'chirildi!");
    } catch (error) {
      alert("Xatolik yuz berdi!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
};
  const deleteCourse = async (courseId) => {
  if (window.confirm("Foydalanuvchini o'chirishni tasdiqlaysizmi?")) {
    setLoading(true);
    try {
      const response = await fetch(`https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/courses/${courseId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("O‘chirishda xatolik yuz berdi");
      }
      setUsers(courses.filter((course) => course.id !== courseId));
      alert("Foydalanuvchi muvaffaqiyatli o'chirildi!");
    } catch (error) {
      alert("Xatolik yuz berdi!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
};

  const deleteTest = async (testId) => {
    if (window.confirm("Testni o'chirishni tasdiqlaysizmi?")) {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTests(tests.filter((test) => test.id !== testId))
        alert("Test muvaffaqiyatli o'chirildi!")
      } catch (error) {
        alert("Xatolik yuz berdi!")
      } finally {
        setLoading(false)
      }
    }
  }

  const renderStatistics = () => (
    <div className={styles.statistics}>
      <h2>Statistika</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Jami Foydalanuvchilar</h3>
          <p className={styles.statNumber}>{users.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Jami Kurslar</h3>
          <p className={styles.statNumber}>{courses.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Jami Testlar</h3>
          <p className={styles.statNumber}>{tests.length}</p>
        </div>
       
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className={styles.section}>
      <h2>Foydalanuvchilar</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ism</th>
              <th>Familya</th>
              <th>Username</th>
              <th>Email</th>
              <th>Parol</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => deleteUser(user.id)} disabled= 
                   {loading}>
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCourses = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Kurslar</h2>
        <button className={styles.addBtn} onClick={handleAddCourse}>
          + Kurs qo'shish
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Kurs nomi</th>
              <th>O'qituvchi</th>
              <th>Talabalar soni</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title || course.name}</td>
                <td>{course.instructor || course.author}</td>
                <td>{course.students || course.viewer}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => deleteCourse(course.id)} disabled={loading}>
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddCourseModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Yangi Kurs Qo'shish</h3>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitCourse} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Kurs nomi:</label>
                <input type="text" name="name" value={courseFormData.name} onChange={handleInputChange} required />
              </div>

              <div className={styles.formGroup}>
                <label>Avatar:</label>
                <input
                  type="text"
                  name="avatar"
                  value={courseFormData.avatar}
                  onChange={handleInputChange}
                  placeholder="avatar 1"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Turi:</label>
                <input
                  type="text"
                  name="type"
                  value={courseFormData.type}
                  onChange={handleInputChange}
                  placeholder="IT course"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Ko'ruvchilar:</label>
                  <input
                    type="number"
                    name="viewer"
                    value={courseFormData.viewer}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Yulduzlar:</label>
                  <input type="number" name="star" value={courseFormData.star} onChange={handleInputChange} min="0" />
                </div>

                <div className={styles.formGroup}>
                  <label>Reyting:</label>
                  <input
                    type="number"
                    name="status"
                    value={courseFormData.status}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Tavsif:</label>
                <textarea name="desc" value={courseFormData.desc} onChange={handleInputChange} rows="3" required />
              </div>

              <div className={styles.formGroup}>
                <label>Muallif:</label>
                <input type="text" name="author" value={courseFormData.author} onChange={handleInputChange} required />
              </div>

              <div className={styles.formGroup}>
                <label>Videolar:</label>
                {courseFormData.videos.map((video, index) => (
                  <div key={index} className={styles.videoInput}>
                    <input
                      type="url"
                      value={video}
                      onChange={(e) => handleVideoChange(index, e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      required={index === 0}
                    />
                    {courseFormData.videos.length > 1 && (
                      <button type="button" className={styles.removeVideoBtn} onClick={() => removeVideoField(index)}>
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className={styles.addVideoBtn} onClick={addVideoField}>
                  + Video qo'shish
                </button>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}>
                  Bekor qilish
                </button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

  const renderTests = () => (
    <div className={styles.section}>
      <h2>Testlar</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Test nomi</th>
              <th>Savollar soni</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td>{test.id}</td>
                <td>{test.title}</td>
                <td>{test.questions.length}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => deleteTest(test.id)} disabled={loading}>
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "statistics":
        return renderStatistics()
      case "users":
        return renderUsers()
      case "courses":
        return renderCourses()
      case "tests":
        return renderTests()
      default:
        return renderStatistics()
    }
  }

  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Admin Panel</h2>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="login">Login:</label>
              <input type="text" id="login" name="login" required placeholder="Login kiriting" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Parol:</label>
              <input type="password" id="password" name="password" required placeholder="Parol kiriting" />
            </div>
            <button type="submit" className={styles.loginBtn}>
              Kirish
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Admin Panel</h3>
        </div>
        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${activeSection === "statistics" ? styles.active : ""}`}
            onClick={() => setActiveSection("statistics")}
          >
            📊 Statistika
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "tests" ? styles.active : ""}`}
            onClick={() => setActiveSection("tests")}
          >
            📝 Testlar
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "users" ? styles.active : ""}`}
            onClick={() => setActiveSection("users")}
          >
            👥 Userlar
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "courses" ? styles.active : ""}`}
            onClick={() => setActiveSection("courses")}
          >
            📚 Kurslar
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            🚪 Chiqish
          </button>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1>Admin Dashboard</h1>
        </div>
        <div className={styles.content}>
          {loading && <div className={styles.loading}>Yuklanmoqda...</div>}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Admin
