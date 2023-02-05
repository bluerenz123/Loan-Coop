import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/account";

function Logout() {
  const { setAccount } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    setAccount(null);
    navigate("/member/login");
  }, []);

  return <>logout</>;
}

export default Logout;
