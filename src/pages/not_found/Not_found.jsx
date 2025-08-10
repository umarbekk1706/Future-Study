import React from 'react'
import styles from "./not_found.module.css"
import { Link } from "react-router-dom";

function Not_found() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.subtitle}>Oops!Page not found</p>
            <Link to="/" className={styles.button}>
                Return to home page
            </Link>
        </div>
    )
}

export default Not_found