import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/">
          <span style={styles.logo}>🐱 CAT PURRE</span>
        </Link>
        
        <div style={styles.menu}>
          <Link href="/cats">Koty</Link>
          <Link href="/breeds">Rasy</Link>
          <Link href="/breeders">Hodowcy</Link>
          <Link href="/ai-assistant">AI Asystent</Link>
          {user?.userType === 'breeder' && (
            <Link href="/pricing">💎 Premium</Link>
          )}
        </div>
        
        <div style={styles.actions}>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <button className="btn btn-outline">
                  👤 {user.firstName || 'Profil'}
                </button>
              </Link>
              <button onClick={logout} className="btn btn-outline">
                Wyloguj
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="btn btn-outline">Zaloguj się</button>
              </Link>
              <Link href="/register">
                <button className="btn btn-primary">Zarejestruj się</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        nav {
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
      `}</style>
    </nav>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  menu: {
    display: 'flex',
    gap: '24px'
  },
  actions: {
    display: 'flex',
    gap: '12px'
  }
};

// Add to menu:
<Link href="/daily-cat">Daily Cat</Link>
<Link href="/cat-swipe">Cat Swipe</Link>
<Link href="/invite">Zaproś 🎁</Link>
<Link href="/meme-generator">Memy</Link>
