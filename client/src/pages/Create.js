import axios from "axios";
import React from "react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getCookieByName } from "../utils/cookie";

function Create() {
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content:'',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = function () {
            if (reader.readyState === 2) {
                const value = reader.result;
                setFormData({...formData, image: value});
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.summary || !formData.content || !formData.image) {
            alert("Vui lòng điền đầy đủ thông tin và chọn ảnh trước khi đăng bài.");
            return;
        }
        try {
            //console.log(formData)
            const response = await axios.post('http://localhost:4000/blogs/create', 
                formData, 
                {
                    headers: {
                        Authorization: `Bearer ${getCookieByName('access_token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.success){
                const blog_id = response.data.blog._id;
                navigate(`/blogs/${blog_id}`);
            }   
        } 
        catch (error) {
            alert("Lỗi");
            console.error('Lỗi', error);  
        }
    };

    return (
        <div className="">
            <h3 className="d-flex justify-content-center mt-4">Đăng bài viết</h3>
            <div>
                <div className="form-group m-3">
                    <label htmlFor="title">Tiêu đề bài viết</label>
                    <textarea 
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}>
                    </textarea>
                </div>
    
                <div className="form-group m-3">
                    <label htmlFor="summary">Tóm tắt</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea" 
                        id="summary"
                        name="summary"
                        defaultValue={formData.summary}
                        onChange={handleChange}>
                    </textarea>
                </div>
    
                <div className="form-group m-3">
                    <label htmlFor="content">Nội dung</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea" 
                        id="content"
                        name="content"
                        defaultValue={formData.content}
                        onChange={handleChange}>
                    </textarea>
                </div>
                <div className="form-group m-3">
                    <label htmlFor="image"></label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>
                
                <button onClick={handleSubmit} className="btn btn-success m-3">Đăng</button>
            </div>
        </div>
    );
}

export default Create;
