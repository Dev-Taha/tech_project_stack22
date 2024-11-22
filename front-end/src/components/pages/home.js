import "../../css/home.css"
import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); 

    const handleLoginClick = () => {
        // Redirect to login page
        navigate("/auth/login");
    };

    const handleSignUpClick = () => {
        // Redirect to login page
        navigate("/signUp");
    };

    return (
        <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Spring Application</h1>
        <div style={styles.headerButtons}>
          <button style={styles.headerButton} onClick={handleLoginClick}>
            Login
          </button>
          <button style={styles.headerButton} onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Experience the Power of Our Spring App</h2>
          <p style={styles.heroSubtitle}>
            Bringing you innovative solutions, <span style={styles.seamless}>seamless integration</span>, and robust
            <span style={styles.seamless}> performance to elevate your business</span>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <main style={styles.main}>
        <section style={styles.features}>
          <h2 style={styles.featuresTitle}>Why Choose Our Platform?</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureItem}>
              <img
                src="https://pbs.twimg.com/profile_images/1235983944463585281/AWCKLiJh_400x400.png"
                alt="Feature 1"
                style={styles.featureImage}
              />
              <h3 style={styles.featureTitle}>High Performance</h3>
              <p style={styles.featureText}>
                Our platform is designed to handle high workloads with speed and
                efficiency.
              </p>
            </div>

            <div style={styles.featureItem}>
              <img
                src="https://i0.wp.com/technicalsand.com/wp-content/uploads/2020/09/Spring-security.png?fit=1366%2C768&ssl=1"
                alt="Feature 2"
                style={styles.featureImage}
              />
              <h3 style={styles.featureTitle}>Seamless Integration</h3>
              <p style={styles.featureText}>
                Easily integrate with your existing systems and scale your
                business.
              </p>
            </div>

            <div style={styles.featureItem}>
              <img
                src="https://i0.wp.com/blog.ycrash.io/wp-content/uploads/2024/01/Thumbnail-20.png?fit=1280%2C720&ssl=1"
                alt="Feature 3"
                style={styles.featureImage}
              />
              <h3 style={styles.featureTitle}>Cutting-Edge Technology</h3>
              <p style={styles.featureText}>
                Leverage the latest technologies to stay ahead in a competitive
                market.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 Our Platform. All rights reserved.</p>
      </footer>
    </div>
      );
};

// Inline styles for simplicity
const styles = {
    container: {
      textAlign: "center",
      fontFamily: "'Arial', sans-serif",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "space-between",
    },
    seamless:{
      color:'rgb(40, 44, 52)'
    },
    header: {
      padding: "20px",
      backgroundColor: "rgb(40, 44, 52)",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed", // Make the header sticky
      top: 0, // Stick it to the top
      left: 0,
      width: "100%", // Ensure the header spans the entire width
      zIndex: 1000, // Ensure it stays above other content
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional: Add shadow for better visibility
    },
    title: {
      fontSize: "36px",
      margin: "0",
    },
    headerButtons: {
      display: "flex",
    },
    headerButton: {
      marginLeft: '10px',
      padding: '8px 12px',
      color: 'white',
      backgroundColor: 'rgb(66, 150, 150)',
      border: 'none',
      cursor: 'pointer',
      borderRadius: "3px"
    },
    // Hero Section
    heroSection: {
      backgroundColor: "#f4f4f4",
      padding: "286px 20px",
      backgroundImage:
        "url('https://wallpapertag.com/wallpaper/full/f/2/d/129117-white-abstract-background-2880x1800-for-tablet.jpg')", // Add a URL to your background image
      height: "800px",
      width: "100%",
        backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      textAlign: "center",
    },
    heroContent: {
      // backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black overlay
      padding: "50px",
      color:'rgb(66, 150, 150)',
      borderRadius: "10px",
      display: "inline-block",
    },
    heroTitle: {
      fontSize: "48px",
      margin: "0 0 20px 0",
    },
    heroSubtitle: {
      fontSize: "24px",
      margin: "0",
    },
    // Features Section
    main: {
      padding: "50px 20px",
      marginTop: "100px", // Offset the main content to prevent it being covered by the fixed header
    },
    features: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    featuresTitle: {
      fontSize: "32px",
      marginBottom: "40px",
      color: "black",
    },
    featuresGrid: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
    },
    featureItem: {
      width: "30%",
      textAlign: "center",
      marginBottom: "40px",
    },
    featureImage: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
    },
    featureTitle: {
      fontSize: "24px",
      margin: "20px 0 10px 0",
    },
    featureText: {
      fontSize: "16px",
      color: "#666",
    },
    footer: {
      backgroundColor: "#f8f8f8",
      padding: "20px",
    },
    footerText: {
      fontSize: "14px",
      color: "#999",
    },
  };
  
export default Home;
