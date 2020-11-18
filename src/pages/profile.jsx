import { useHistory } from "react-router-dom";
import { Title, Button } from "../components";
import { logout } from "../utils/auth";

const Profile = () => {
  const history = useHistory();

  return (
    <>
      <Title level={2}>Profile</Title>
      <Button
        type="submit"
        onClick={() => {
          logout(() => {
            history.push("/login");
          });
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Profile;
