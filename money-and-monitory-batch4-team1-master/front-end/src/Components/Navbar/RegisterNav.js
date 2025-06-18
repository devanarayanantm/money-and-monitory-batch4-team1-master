import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../script.css'
import { Link } from "react-router-dom";

const RegisterNav = () => {
    return ( 

            <nav class="navbar navbar-expand-lg  nav background">
            <div class="collapse navbar-collapse container" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <Link className="nav-link"></Link>
                </li>
                <li class="nav-item">
                    <Link to={'/register'} class="nav-link padding">Register</Link>
                </li>
                <li class="nav-item">
                    <Link to={'/login'} class="nav-link padding">Login</Link>
                </li>
                </ul>
            </div>
            </nav>
     );
}
 
export default RegisterNav;