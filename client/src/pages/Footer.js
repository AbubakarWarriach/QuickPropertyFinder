import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer class="page-footer font-small footerStyle pt-4" style={{marginTop: '278px'}}>
                <div class="container">
                    <ul class="list-unstyled list-inline text-center py-2">
                        <li class="list-inline-item">
                            <h5 class="mb-1">Register for free</h5>
                        </li>
                        <li class="list-inline-item">
                            <Link to="/signup" class="btn btn-outline btn-rounded text-light">Sign up!</Link>
                        </li>
                    </ul>
                </div>
                <div class="text-light text-center py-3">© 2022 Copyright : 
                    <Link to="/" className="text-light"> QuickPropertyFinder.com</Link>
                </div>
            </footer>
        </>
    )
}
export default Footer;