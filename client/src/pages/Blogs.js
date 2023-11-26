import axios from "axios";
import React from "react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { Eye } from 'lucide-react';
import { getCookieByName } from "../utils/cookie";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate  = useNavigate();
      useEffect(() => {
        const fetchData = async () => {
            try {
                //console.log(id);
                const response = await axios.get('http://localhost:4000/blogs', {
                    headers: {
                        Authorization: `Bearer ${getCookieByName('access_token')}`,
                    },
                });
                if(response.data.success){
                    setBlogs(response.data.blogs);
                } else{
                    alert(response.data.message)
                    navigate('/')
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
                alert(error.response.data.message)
                navigate('/')
            }
            finally{

            }
        };
      
          fetchData();
    }, []);

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
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>{moment(blog.public_date).format('HH:mm DD-MM-YYYY')}</div>
                                        <div className="d-flex align-items-center m-2">
                                            <Eye className="me-2" />
                                            {blog.views}
                                        </div>
                                    </div>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blogs;
