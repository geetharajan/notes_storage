import '../styles/header.css';

export default function Header() {
  return (
    <header className="header">
      <span className="header-title">Keep Notes</span>
      <nav className="header-nav">
        <a href="/about">About</a>
        <a href="/notes">Notes</a>
        <a href="/account">Account</a>
        <a href="/login">Logout</a>
      </nav>
    </header>
  );
}