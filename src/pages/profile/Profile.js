import "./profile.css";
import Footer from "../../components/footer/Footer";
import { useRootContext } from "../../context/RootContextProvider";
import { Avatar } from "@mui/material";

function Profile() {
  const { user } = useRootContext();

  return (
    <div className="profile">
      <div className="profile-avatar">
        <Avatar
          className="profile-avatar"
          sx={{ bgcolor: "#0c0c0c" }}
          alt={user?.display_name}
          src={
            user?.images.length > 0 ? user?.images[1]?.url : "/broken-image.jpg"
          }
        />
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
