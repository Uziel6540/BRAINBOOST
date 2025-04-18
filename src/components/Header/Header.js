import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  // SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  return (
    <div
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" className="title">
        BRAINBOOST
      </Link>
      <hr className="divider" />

      <SignedOut>
        <button
          style={{
            color: "white",
            backgroundColor: "blue",
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer",
          }}
          onClick={() => setShowSignIn(true)}
        >
          Login
        </button>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: "50px", // equivalent to w-10
                height: "50px", // equivalent to h-10
              },
            },
          }}
        />
      </SignedIn>

      {showSignIn && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000, // optional, in case you need to make sure it's on top
          }}
          onClick={handleOverlayClick}
        >
          <SignIn signUpForceRedirectUrl="/" fallbackRedirectUrl="/" />
        </div>
      )}
    </div>
  );
};

export default Header;
