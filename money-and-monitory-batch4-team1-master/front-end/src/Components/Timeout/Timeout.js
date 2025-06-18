import { useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
function HandleTimeout() {

    const idleTimeRef = useRef(null);
    let navigate = useNavigate();
    const onIdle = () => {
      alert("Session Timeout");
      navigate("/")
    };
      const idleTimer = useIdleTimer({
      crossTab: true,
      ref: idleTimeRef,
      timeout: 60 * 0.5 * 1000,
      onIdle: onIdle})
      return (
        <div idleTimer={idleTimer}></div>
      )
}
export default HandleTimeout;
