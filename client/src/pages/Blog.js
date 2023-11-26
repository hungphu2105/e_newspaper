import axios from "axios";
import React from "react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getCookieByName } from "../utils/cookie";

function Blog() {
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({
        comment: '',
    });
    const navigate  = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState([]);
      
    useEffect(() => {
          fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/blogs/${id}`, {
            headers: {
                Authorization: `Bearer ${getCookieByName('access_token')}`,
            },
            });
            setBlog(response.data.blog);
            setComments(response.data.comments)
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };

    const handleComment = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/comments/create/${id}`, 
                formData, 
                {
                    headers: {
                        Authorization: `Bearer ${getCookieByName('access_token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.success){
                setFormData({comment: ''})
                fetchData()
            }   
        } 
        catch (error) {
            alert("Lỗi");
            console.error('Lỗi', error);  
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="card mt-4" style={{ width: '55rem' }}>
                <div className="card-body">
                    <h3 className="card-title">{blog.title}</h3>
                    <div style={{ color: '#87CEEB' }}>{blog?.user_id?.user_name}</div>
                    <div className="mb-2">{moment(blog.public_date).format('HH:mm DD-MM-YYYY')}</div>
                    <div >
                        {blog?.image?.url && 
                            <img 
                                src={blog.image.url}
                                alt=""
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        }
                    </div>
                    {/* <div className="">{blog.content}</div> */}
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} className="mt-3"/>
                </div>
            </div>
            <div className="card mt-4 mb-4" style={{ width: '55rem' }}>
                <div className="card-body">
                    <h4 className="card-title">Bình Luận</h4>
                    <div className="mb-3">
                        <label htmlFor="commentInput" className="form-label">Nhập bình luận</label>
                        <textarea 
                            type="text"
                            className="form-control" 
                            id="comment"
                            name="comment"
                            rows="3"
                            value={formData.comment}
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    <button onClick={handleComment} className="btn btn-primary">Đăng bình luận</button>
                    <div className="mt-3">
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-2">
                                <strong>{comment.user_id.user_name} :</strong> {comment.comment}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;
