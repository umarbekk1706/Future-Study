import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./solvetest.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function SolveTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  // Testni yuklash
  useEffect(() => {
    fetch(`https://6815e18a32debfe95dbcb148.mockapi.io/fstudy/tests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTest(data);
        const totalTime = data.questions.length * 2 * 60;
        setTimeLeft(totalTime);
      });
  }, [id]);
  console.log(test);

  // Taymer
  useEffect(() => {
    if (timeLeft === null || isFinished) return;

    if (timeLeft <= 0) {
      finishTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleOptionSelect = (questionIndex, option) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const finishTest = () => {
    setIsFinished(true);

    if (test && test.questions) {
      let correct = 0;
      test.questions.forEach((q, i) => {
        const correctOption = q.options[q.answer]; // to‘g‘ri javobni indeks asosida topish
        if (answers[i] === correctOption) {
          correct++;
        }
      });
      const calculatedScore = Math.round(
        (correct / test.questions.length) * 100
      );
      setScore(calculatedScore);
    }

    setOpenModal(true); // Modalni ochish
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/tests");
  };

  if (!test) return <div className={styles.loading}>Yuklanmoqda...</div>;

  const progress = (
    (timeLeft / (test.questions.length * 2 * 60)) *
    100
  ).toFixed(0);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{test.title}</h2>
          <div className={styles.timer}>
            Qolgan vaqt: <span>{formatTime(timeLeft)}</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {!isFinished ? (
          <div className={styles.questions}>
            {test.questions.map((q, idx) => (
              <div key={idx} className={styles.questionCard}>
                <p className={styles.questionText}>
                  {idx + 1}. {q.question}
                </p>
                <ul className={styles.options}>
                  {q.options.map((opt, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="radio"
                          name={`q${idx}`}
                          disabled={isFinished}
                          checked={answers[idx] === opt}
                          onChange={() => handleOptionSelect(idx, opt)}
                        />
                        {opt}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <button className={styles.finishBtn} onClick={finishTest}>
              Yakunlash
            </button>
          </div>
        ) : (
          <div className={styles.finished}>
            <h3>Test yakunlandi. Natijani ko‘rish uchun kuting...</h3>
          </div>
        )}
      </div>
      <Footer />

      {/* Modal (Natijani ko‘rsatadi) */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: "center", fontSize: "24px", fontWeight: 600, mt: 2 }}
        >
          🎉 Tabriklaymiz!
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Siz testni yakunladingiz
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px", mb: 3 }}>
            Sizning natijangiz:{" "}
            <strong style={{ fontSize: "22px" }}>{score} / 100</strong>
          </Typography>

          <img
            src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
            alt="congrats"
            style={{ width: "80px", marginBottom: "20px" }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: "20px", px: 4 }}
          >
            Ortga qaytish
          </Button>
           { score>80 && <Button
            onClick={() => navigate(`/certificate?score=${score}&title=${encodeURIComponent(test.title)}`)}
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px", px: 4 }}
          >
            Sertifikatni olish
          </Button>
             
           }
            
         
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SolveTest;
