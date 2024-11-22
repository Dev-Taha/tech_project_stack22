import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  // Inline CSS styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Roboto', sans-serif",
      color: '#333',
    },
    heading: {
      fontSize: '6rem',
      fontWeight: 'bold',
      color: '#ff6b6b',
      margin: '0',
    },
    subheading: {
      fontSize: '1.5rem',
      margin: '10px 0',
    },
    paragraph: {
      color: '#6c757d',
      fontSize: '1rem',
      margin: '10px 0',
      textAlign: 'center',
    },
    button: {
      marginTop: '20px',
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = styles.button.backgroundColor;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <h2 style={styles.subheading}>Oops! Page Not Found</h2>
      <p style={styles.paragraph}>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        style={styles.button}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
