import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./certificate.module.css"
const CertificatePage = () => {
  const location = useLocation();
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [score, setScore] = useState(0);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser({ name: userData.name, lastName: userData.lastname });
    }

    const query = new URLSearchParams(location.search);
    setScore(query.get("score"));
    setTitle(query.get("title"));

    const today = new Date();
    const formattedDate = today.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(formattedDate);
  }, [location]);

  const downloadPDF = () => {
    const input = document.getElementById("certificate");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <>
      <Header />
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>CERTIFICATE PAGE</h2>
        <div
          id="certificate"
          className={styles.certificate}
        >
          <h1 className={styles.title} >CERTIFICATE</h1>
          <p>
            This certificate is issued to the following person:
          </p>
          <h2
            className={styles.h2}
          >
            {user.name} {user.lastName}
          </h2>
          <p>
            for successfully completing the test <strong>"{title}"</strong>.
          </p>
          <p >
            grade: <strong>{score} / 100</strong>
          </p>
          <p className={styles.sana}>Date given: {date}</p>

          {/* Muhr rasmi */}
          <img
            src="./stamp2.png"
            alt="Fstudy Stamp"
            className={styles.stamp}
          />
        </div>

        <button
          onClick={downloadPDF}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          download  PDF
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CertificatePage;
