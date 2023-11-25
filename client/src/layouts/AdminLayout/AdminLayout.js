import AdminSidebar from '../components/Sidebar/AdminSidebar';


function AdminLayout({ children }) {
    return (
        <div className="d-flex flex-row">
            <div className="col-sm-2">
                <AdminSidebar />
            </div>
            <div className="col-sm-10">
                {children}
            </div>
        </div>
    );
}
export default AdminLayout;