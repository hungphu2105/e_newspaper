import axios from "axios";
import { Newspaper , Home, PlusCircle, Search, UserCircle2 } from "lucide-react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [user, setUser] = useState();
    const [avatar, setAvatar] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [token, setToken] = useState([]);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const navigate  = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = document.cookie.split(';');
                const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
                if (tokenCookie) {
                    const token = tokenCookie.split('=')[1].trim();
                    setToken(token);

                } else {
                console.error('Access token not found in cookie.');
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
      
        fetchData();
    },[]);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                //console.log(id);
                const response = await axios.get(`http://localhost:4000/me/account/info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });   
                    setUser(response.data.user);
                    console.log(response.data.user)
                    setAvatar(response.data.user.avatar.url)
            } catch (error) {
                console.error(error.response.data.mesage);
            }
            finally{

            }
        };
      
        if (token) {
          fetchBlogData();
        }
    },[token]);

    const deleteAllCookies = () => {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            var cookieName = cookie.split('=')[0];
            var cookieExpires = new Date(0).toUTCString();
            document.cookie = cookieName + '=; expires=' + cookieExpires + '; path=/';
        }
    }

    const handleLogout = async () => {
        try {
            await  axios.post('http://localhost:4000/auth/logout', {}, {withCredentials: true});
            //console.log(response.data)
            deleteAllCookies()
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="sticky-top">
            <div className="">
                <h1 className="text-lg text-info dark:text-white font-weight-bold font-merriweather text-center p-4">
                    BLOGS
                </h1>
            </div>
            <div 
                className="d-flex align-items-center justify-content-center mb-2 text-primary" 
            >
                <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                    <div
                        className="d-flex align-items-center justify-content-center mb-2 btn btn-light text-primary "
                        //role="button"
                        onClick={toggleDropdown}
                        style={{borderRadius: '25px'}}
                    >
                        <div
                            className="me-4"
                            style={{
                                width: '32px',
                                height: '32px',
                                overflow: 'hidden',
                                borderRadius: '50%',
                                marginRight: '8px',
                            }}
                        >
                            <img
                                src={user?.avatar?.url}
                                alt=""
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div style={{ color: '#F044B4' }}>{user?.user_name}</div>
                    </div>
                    <ul 
                        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <li><Link to="/me/info" className="dropdown-item">Thông tin cá nhân</Link></li>
                        <li><Link to="/settings" className="dropdown-item">Đổi mật khẩu</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link to="" className="dropdown-item text-danger" onClick={handleLogout}>Đăng xuất</Link></li>
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-center p-4">
                <div className="d-flex flex-column justify-content-center gap-5 ">
                    <Link 
                        to="/blogs" 
                        className="btn btn-light d-flex align-items-center justify-content-center"
                        style={{ textDecoration: 'none' }}
                    >
                        <Home className="me-4"/> 
                        Home
                    </Link>
                    <Link 
                        to="/blogs" 
                        className="btn btn-light d-flex align-items-center justify-content-center"
                        style={{ textDecoration: 'none' }}
                    >
                        <Search className="me-4"/>
                        Search
                    </Link>
                    <Link 
                        to="/blogs/create" 
                        className="btn btn-light d-flex align-items-center justify-content-center" 
                        style={{ textDecoration: 'none' }}
                    >
                        <PlusCircle className="me-4"/>
                        Create
                    </Link>
                    <Link 
                        to="/me/myblogs" 
                        className="btn btn-light d-flex align-items-center justify-content-center" 
                        style={{ textDecoration: 'none' }}
                    >
                        <Newspaper className="me-4"/>
                        MyBlog
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar