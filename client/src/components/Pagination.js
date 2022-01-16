import { Link } from 'react-router-dom';
const Pagination = ({ count, parPage, page, pageName }) => {
    let totalPages = Math.ceil(count / parPage);
    const Links = () => {
        const storeLinks = [];
        for (let i = 1; i < totalPages; i++) {
            storeLinks.push(
                <li className="page-item" key={i}><Link className="page-link" to={`/${pageName}/${i}`}>{i}</Link></li>
            )
        }
        return storeLinks;
    }
    const next = () => {
        if (page < totalPages) {
            return (
                <li className="page-item"><Link className="page-link active" to={`/${pageName}/${Number(page) + 1}`}>Next</Link></li>
            )
        }
    }
    const previous = () => {
        if (page > 1) {
            return (
                <li className="page-item"><Link className="page-link" to={`/${pageName}/${Number(page) - 1}`}>Previous</Link></li>
            )
        }
    }
    return totalPages && count > parPage ? (
        <ul className="pagination">
            {previous()}{Links()}{next()}
        </ul>
    ) : ('')
}
export default Pagination;