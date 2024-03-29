import "./navbar.css";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Navbar() {
  const { user } = useRootContext();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navigation d-flex flex-column align-items-center justify-content-between">
      <div>
        <div className="nav-brand d-flex justify-content-center">
          <Link to="/player/home">
            <img src="/assets/icons/brand-logo.svg" alt="brand-logo" />
          </Link>
        </div>
        <div className="nav-links d-flex flex-column align-items-center">
          <NavLink
            to="/player/home"
            className="nav-link d-flex flex-column justify-content-center align-items-center"
          >
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8851 1.24496C13.5107 0.912503 13.0151 0.727264 12.5 0.727264C11.9848 0.727264 11.4892 0.912503 11.1149 1.24496L1.34876 9.91541C1.04973 10.1812 0.81163 10.5016 0.649038 10.8569C0.486446 11.2122 0.402792 11.595 0.4032 11.9817V22.5309C0.403734 23.2841 0.72259 24.0062 1.28968 24.5385C1.85677 25.0709 2.62568 25.37 3.42739 25.37H6.45159C7.25365 25.37 9.47578 25.3485 9.47578 25.3485C9.47578 25.3485 9.47578 23.2825 9.47578 22.529V17.7942C9.47578 17.543 9.58199 17.3022 9.77104 17.1246C9.96008 16.947 10.2165 16.8472 10.4838 16.8472H14.5161C14.7835 16.8472 15.0399 16.947 15.2289 17.1246C15.418 17.3022 15.5242 17.543 15.5242 17.7942V22.529C15.5242 23.2825 15.5242 25.3485 15.5242 25.3485C15.5242 25.3485 17.7463 25.37 18.5484 25.37H21.5726C22.3746 25.37 23.1438 25.0706 23.711 24.5379C24.2781 24.0051 24.5967 23.2825 24.5967 22.529V11.9798C24.5966 11.5932 24.5125 11.2108 24.3496 10.8558C24.1866 10.5008 23.9483 10.1809 23.6492 9.91541L13.8851 1.24117V1.24496Z"
                fill="#4d5466"
              />
            </svg>
            Home
          </NavLink>
          <NavLink
            to="/player/search"
            className="nav-link d-flex flex-column justify-content-center align-items-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2ZM1.13461e-07 6C-0.00012039 5.0557 0.222642 4.12471 0.650171 3.28274C1.0777 2.44077 1.69792 1.7116 2.4604 1.15453C3.22287 0.597453 4.10606 0.228212 5.03815 0.0768326C5.97023 -0.0745466 6.92488 -0.00378925 7.82446 0.28335C8.72404 0.570489 9.54315 1.0659 10.2152 1.7293C10.8872 2.39269 11.3931 3.20533 11.6919 4.10113C11.9906 4.99693 12.0737 5.95059 11.9343 6.88455C11.795 7.81851 11.4372 8.7064 10.89 9.476L15.707 14.293C15.8892 14.4816 15.99 14.7342 15.9877 14.9964C15.9854 15.2586 15.8802 15.5094 15.6948 15.6948C15.5094 15.8802 15.2586 15.9854 14.9964 15.9877C14.7342 15.99 14.4816 15.8892 14.293 15.707L9.477 10.891C8.57936 11.5293 7.52335 11.9082 6.42468 11.9861C5.326 12.0641 4.22707 11.8381 3.2483 11.333C2.26953 10.8278 1.44869 10.063 0.875723 9.12235C0.30276 8.18167 -0.000214051 7.10143 1.13461e-07 6Z"
                fill="white"
              />
            </svg>
            Search
          </NavLink>
          <NavLink
            to="/player/library"
            className="nav-link d-flex flex-column justify-content-center align-items-center"
          >
            <svg
              width="25"
              height="22"
              viewBox="0 0 25 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0.5C7.60218 0.5 7.22064 0.658035 6.93934 0.93934C6.65804 1.22064 6.5 1.60218 6.5 2C6.5 2.39782 6.65804 2.77936 6.93934 3.06066C7.22064 3.34196 7.60218 3.5 8 3.5H17C17.3978 3.5 17.7794 3.34196 18.0607 3.06066C18.342 2.77936 18.5 2.39782 18.5 2C18.5 1.60218 18.342 1.22064 18.0607 0.93934C17.7794 0.658035 17.3978 0.5 17 0.5H8ZM3.5 6.5C3.5 6.10218 3.65804 5.72064 3.93934 5.43934C4.22064 5.15804 4.60218 5 5 5H20C20.3978 5 20.7794 5.15804 21.0607 5.43934C21.342 5.72064 21.5 6.10218 21.5 6.5C21.5 6.89782 21.342 7.27936 21.0607 7.56066C20.7794 7.84196 20.3978 8 20 8H5C4.60218 8 4.22064 7.84196 3.93934 7.56066C3.65804 7.27936 3.5 6.89782 3.5 6.5ZM0.5 12.5C0.5 11.7044 0.81607 10.9413 1.37868 10.3787C1.94129 9.81607 2.70435 9.5 3.5 9.5H21.5C22.2956 9.5 23.0587 9.81607 23.6213 10.3787C24.1839 10.9413 24.5 11.7044 24.5 12.5V18.5C24.5 19.2956 24.1839 20.0587 23.6213 20.6213C23.0587 21.1839 22.2956 21.5 21.5 21.5H3.5C2.70435 21.5 1.94129 21.1839 1.37868 20.6213C0.81607 20.0587 0.5 19.2956 0.5 18.5V12.5Z"
                fill="#4d5466"
              />
            </svg>
            Library
          </NavLink>
          <NavLink
            to="/player/Likes"
            className="nav-link d-flex flex-column justify-content-center align-items-center"
          >
            <svg
              width="25"
              height="22"
              viewBox="0 0 25 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.258 2.758C3.38317 1.63317 4.90902 1.00128 6.5 1.00128C8.09099 1.00128 9.61683 1.63317 10.742 2.758L12.5 4.5145L14.258 2.758C14.8115 2.18494 15.4735 1.72784 16.2056 1.41339C16.9376 1.09894 17.7249 0.933419 18.5216 0.926496C19.3183 0.919573 20.1083 1.07138 20.8457 1.37307C21.5831 1.67475 22.253 2.12027 22.8164 2.68363C23.3797 3.24698 23.8252 3.9169 24.1269 4.65427C24.4286 5.39165 24.5804 6.18173 24.5735 6.97841C24.5666 7.77508 24.4011 8.5624 24.0866 9.29443C23.7722 10.0264 23.3151 10.6885 22.742 11.242L12.5 21.4855L2.258 11.242C1.13317 10.1168 0.501282 8.59098 0.501282 7C0.501282 5.40901 1.13317 3.88316 2.258 2.758V2.758Z"
                fill="#4d5466"
              />
            </svg>
            Likes
          </NavLink>
        </div>
      </div>
      <div
        className="navbar-profile"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar
          sx={{ bgcolor: "#0c0c0c" }}
          alt={user?.display_name}
          src={
            user?.images.length > 0 ? user?.images[1]?.url : "/broken-image.jpg"
          }
        />
      </div>
      <Menu
        id="profile-menu"
        aria-labelledby="profile-menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(`/player/profile/${user.id}`);
            handleClose();
          }}
        >
          My Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/");
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </nav>
  );
}

export default Navbar;
