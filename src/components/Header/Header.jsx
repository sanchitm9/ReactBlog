import React from "react";
import { Container, Logo, UserMenu } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "../ThemeToggle";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="header">
      <Container>
        <nav className="header-nav">
          {/* Logo */}
          <div className="header-logo-section">
            <Link to="/">
              <Logo width="70px" />
            </Link>
            <ThemeToggle />
          </div>

          {/* Navigation Items */}
          <ul className="nav-list">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="nav-button"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <UserMenu />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
