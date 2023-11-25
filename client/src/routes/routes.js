import config from '../config';

//Layouts
import { AdminLayout } from '../layouts';

//Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Blogs from '../pages/Blogs';
import Create from '../pages/Create';
import Edit from '../pages/Edit';
import Blog from '../pages/Blog';
import MyBlog from '../pages/MyBlog';
import Profile from '../pages/Profile';
import AdminBlogs from '../pages/AdminBlogs';
import AdminBlog from '../pages/AdminBlog';
import AdminAccounts from '../pages/AdminAccounts';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null},
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.blogs, component: Blogs },
    { path: config.routes.create, component: Create },
    { path: config.routes.edit, component: Edit },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.myblogs, component: MyBlog },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.admin_blogs, component: AdminBlogs, layout: AdminLayout },
    { path: config.routes.admin_blog, component: AdminBlog, layout: AdminLayout },
    { path: config.routes.admin_accounts, component: AdminAccounts, layout: AdminLayout },
    { path: config.routes.admin_profile, component: Profile, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
