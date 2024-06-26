import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logotype } from "../Logotype";
import { NavigationButton } from "../NavigationButton";
import { SignInButton } from "../SignInButton";
import { UserDropdown } from "./UserDropdown";
import { useLocation } from "react-router-dom";

const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: ${(props) =>
    props?.currentPage?.toLowerCase() === "home" && !props.scrolledYet
      ? "transparent"
      : "white"};
  z-index: 1000;
  padding: 12px 0;
  margin-bottom: ${(props) =>
    props.currentPage === "Home" && !props.scrolledYet ? "-100px" : "0"};
  border-bottom: 1px solid
    ${(props) =>
      props.currentPage === "Home" && !props.scrolledYet ? "#fff" : "#000"};

  .user-section {
    margin-left: auto;
    > button {
      font-size: 14px;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 6px 0;

    .navigation-section {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.7rem;
      a {
        color: ${(props) =>
          props?.currentPage?.toLowerCase() === "home" && !props.scrolledYet
            ? "#fff"
            : "#000"};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      > div {
        > a {
          margin-right: 20px;
        }
      }
    }

    .user-section {
      display: flex;
      align-items: center;

      .nav-create-btn {
        margin-left: 10px;
      }

      .nav-sign-in-btn {
        margin-left: 10px;
      }
    }

    .arrow-up-right {
      margin-left: 4px;
    }
  }
`;

// change the background to white when the user scrolls down

export function DesktopNavigation(props) {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => window.addEventListener("scroll", handleScroll));

  useEffect(() => {
    getCurrentPage();
    console.log("route: ", location.pathname);
  }, [location.pathname]);

  const getCurrentPage = () => {
    switch (location.pathname) {
      case "/":
        return setCurrentPage("Home");
      case `/${props.widgets.profilePage}`:
        return setCurrentPage("Profile");
      case "/edit":
        return setCurrentPage("Create");
      default:
        return setCurrentPage("");
    }
  };
  return (
    <StyledNavigation {...props} currentPage={currentPage} scrolledYet={scroll}>
      <div className="container">
        <Link
          to="/"
          className="logo-link"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logotype
            color={
              currentPage.toLowerCase() === "home" && !scroll ? "#fff" : "#000"
            }
          />
        </Link>
        <div className="navigation-section">
          <NavigationButton route="/bos.genadrop.near/widget/CPlanet.NFTExplore.Index">
            NFTs
          </NavigationButton>
          <NavigationButton route="/bos.genadrop.near/widget/CPlanet.DAO.Explore">
            Communities
          </NavigationButton>
          <NavigationButton route="/bos.genadrop.near/widget/CPlanet.MainPage.Social">
            Feed
          </NavigationButton>
          <NavigationButton href="https://gov.near.org/t/docs-the-creatives-constellation-charter/32878">
            Funding
          </NavigationButton>
          <NavigationButton route="/bos.genadrop.near/widget/CPlanet.DropsFund.Contest.Index">
            Contests
          </NavigationButton>
        </div>
        <div className="user-section">
          {/* <StarButton {...props} />
          <DevActionsDropdown {...props} /> */}
          {!props.signedIn && (
            <SignInButton
              currentPage={currentPage}
              scrolledYet={scroll}
              onSignIn={() => props.requestSignIn()}
            />
          )}
          {props.signedIn && (
            <>
              {/* <NotificationWidget
                notificationButtonSrc={props.widgets.notificationButton}
              /> */}
              <UserDropdown
                {...props}
                currentPage={currentPage}
                scrolledYet={scroll}
              />
            </>
          )}
        </div>
      </div>
    </StyledNavigation>
  );
}
