import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies
 from "universal-cookie";
export default function Subscription(){
  const navigate = useNavigate()
  useEffect(() => {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const isAuth = !!accessToken
    if(!isAuth){
      navigate("/login")
    }

  }, [navigate])

  return (
    <div>
      SUBSCRIPTION
    </div>
  )
}
