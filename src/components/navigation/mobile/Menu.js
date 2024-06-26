import React from "react";
import styled from "styled-components";
import { Close } from "../../icons/Close";
import { NavigationButton } from "../NavigationButton";
import { SignInButton } from "../SignInButton";
import { Link } from "react-router-dom";
import { CPlanetLogo } from "../../icons/CPlanetLogo";
import { UserDropdown } from "../desktop/UserDropdown";

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  transition: 350ms;
  transform: translateX(-100%);

  &.show {
    transform: translateX(0);
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .left-side {
    flex: 1;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 25px;
    overflow-x: auto;

    .nav-sign-in-btn {
      width: fit-content;
    }

    .profile-link {
      max-width: 100%;
      white-space: nowrap;

      :hover {
        text-decoration: none;
      }
    }

    img {
      border-radius: 50% !important;
    }

    .profile-name {
      color: var(--slate-dark-12);
      font-weight: var(--font-weight-bold);
      margin-top: 10px;
    }

    .profile-username {
      color: var(--slate-dark-11);
    }

    .profile-name,
    .profile-username {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .top-links {
    margin-top: 40px;
    li:last-child {
      display: flex;
      justify-content: center;
      text-align: center;
      margin: 10px auto;
      width: 100%;
      .signin {
        display: flex;
        width: 155px;
        height: 40px;
        padding: 8px 15px 8px 14px;
        justify-content: center;
        align-items: center;
        border-radius: 32px;
        background: #000;
        border: 1px solid #000;
        color: #fff;
        &:hover {
          background: #fff;
          color: #000;
        }
      }
    }
    a {
      display: flex;
      justify-content: center;
      text-align: center;
      width: 100%;
      border-bottom: 1px solid #b0b0b0;
      padding: 2rem 1rem;
      width: 100%;
      color: #b0b0b0;
      text-edge: cap;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      cursor: pointer;
      &:hover,
      &:focus,
      &.active {
        color: #000;
        font-weight: 600;
        background-color: #b0b0b0;
        svg path {
          stroke: #000;
          stroke-width: 2;
        }
      }
    }
  }

  .bottom-links {
    margin-top: auto;
  }

  .close-button {
    background: none;
    border: none;
    position: absolute;
    right: 16px;
    top: 16px;
    padding: 10px;

    svg {
      margin: 0;
    }
  }

  .user-section {
    display: flex;
    align-items: center;

    .profile-name {
      margin-top: 0px;
    }

    .nav-create-btn {
      margin-left: 10px;
    }

    .nav-sign-in-btn {
      margin-left: 10px;
    }
  }
`;

export function Menu(props) {
  return (
    <StyledMenu className={props.showMenu ? "show" : ""}>
      <div className="left-side">
        <div className="top-bar">
          <Link
            to="/"
            className="logo-link"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <CPlanetLogo color="#000" />
          </Link>
          <button className="close-button" onClick={props.onCloseMenu}>
            <Close color="#000" />
          </button>
        </div>
        <ul className="top-links">
          <li>
            <NavigationButton route="/bos.genadrop.near/widget/CPlanet.NFTExplore.Index">
              NFTs
            </NavigationButton>
          </li>
          <li>
            <NavigationButton route="/bos.genadrop.near/widget/CPlanet.DAO.Explore">
              Communities
            </NavigationButton>
          </li>

          <li>
            <NavigationButton route="/bos.genadrop.near/widget/CPlanet.MainPage.Social">
              Feed
            </NavigationButton>
          </li>
          <li>
            <NavigationButton href="https://gov.near.org/t/docs-the-creatives-constellation-charter/32878">
              Funding
            </NavigationButton>
          </li>
          <li>
            <NavigationButton route="/bos.genadrop.near/widget/CPlanet.DropsFund.Index">
              Contests
            </NavigationButton>
          </li>
          <li>
            <div className="user-section">
              {props.signedIn ? (
                <UserDropdown
                  {...props}
                  currentPage={"/nothere"}
                  scrolledYet={false}
                />
              ) : (
                <SignInButton
                  onSignIn={() => {
                    props.onCloseMenu();
                    props.requestSignIn();
                  }}
                  className="signin"
                />
              )}
            </div>
          </li>
        </ul>
        <ul className="bottom-links"></ul>
      </div>
    </StyledMenu>
  );
}
