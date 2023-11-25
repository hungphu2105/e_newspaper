import Sidebar from '../components/Sidebar/Sidebar';


function DefaultLayout({ children }) {
    return (
        <div className="d-flex flex-row">
            <div className="col-sm-2">
                <Sidebar />
            </div>
            <div className="col-sm-10">
                {children}
            </div>
        </div>
    );
}
export default DefaultLayout;