import axios from "axios";
import React from "react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { useParams } from 'react-router-dom';
import moment from 'moment';

function MyBlog() {
    const [blogs, setBlogs] = useState([]);
    const [token, setToken] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        const fetch = async () => {
          try {
            const cookies = document.cookie.split(';');
            const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
            const token = tokenCookie.split('=')[1].trim();
            setToken(token);            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetch();
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/me/myblogs', {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
                setBlogs(response.data.blogs);
                //console.log(response.data.comments)
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
      
        if (token) {
          fetchData();
        }
    }, [token]);

    const handleDelete = async (blogId) => {
        try {
            //console.log(formData)
            const response = await axios.delete(`http://localhost:4000/me/myblogs/${blogId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.success){
                //console.log(response.data.message)
                alert(response.data.message)
                window.location.reload();
                //navigate(`/me/myblogs`);
            }  
            // else{
            //     console.log(response.data.message)
            // } 
        } 
        catch (error) {
            alert("Lỗi", error.response.data.message);
            console.error('Lỗi', error);  
        }
        finally{

        }
    };

    return (
        <div className="d-flex flex-row justify-content-center">
            <div className="">
                {blogs.map(blog => (
                    <div key={blog._id} className="card m-4" style={{ width: '55rem' }}>
                        <div className="card-body">
                            <div>{blog.user_id.user_name}</div>
                            <div className="d-flex flex-row">
                                <div className="col-sm-9">
                                    <Link to={`/blogs/${blog._id}`} className="text-dark">
                                        <h3 className="card-title">{blog.title}</h3>
                                    </Link>
                                    <div className="card-text text-muted">{blog.summary}</div>
                                    <div>{moment(blog.public_date).format('HH:mm DD-MM-YYYY')}</div>
                                </div>
                                <div className="col-sm-3" style={{ position: 'relative' }}>
                                    {blog?.image?.url && 
                                        <img src={blog.image.url}
                                            alt="Authentication &amp; Authorization trong ReactJS"
                                            style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%',
                                                maxHeight: '100%',
                                                position: 'absolute',
                                                top: 0,
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                            }}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-end m-1 mb-3">
                            <div className="col-auto">
                                <Link to={`/blogs/edit/${blog._id}`} className="btn btn-light d-flex align-items-center">
                                    <Pencil className="me-3 text-info"/>
                                    Sửa
                                </Link>
                            </div>
                            <div className="col-auto">
                                <button onClick={() => handleDelete(blog._id)} className="d-flex btn btn-light align-items-center">
                                    <Trash className="me-2 text-danger"/>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBlog;
