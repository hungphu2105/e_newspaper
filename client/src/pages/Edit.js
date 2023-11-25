import axios from "axios";
import React from "react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Trash  } from "lucide-react";

function Edit() {
    const [token, setToken] = useState([]);
    const navigate  = useNavigate();
    const { id } = useParams();
    const [newimg, setNewimg] = useState();
    const [img, setImg] = useState();
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
                //console.log(value)
                setFormData({...formData, image: value});
                setNewimg(value);
            }
        };
        if (e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setFormData({ ...formData, image: null });
            setNewimg(null);
        }
    };

    const handleSubmit = async () => {
        try {
            //console.log(formData)
            const response = await axios.put(`http://localhost:4000/blogs/${id}`, 
                formData, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.success){
                alert("Cập nhật thành công")
                navigate(`/blogs/${id}`);
            }   
        } 
        catch (error) {
            alert("Lỗi");
            console.error('Lỗi', error);  
        }
    };

    
    useEffect(() => {
        if (formData.image === null || formData?.image?.url===img) {
            const { image, ...formDataWithoutImage } = formData;
            //console.log(formDataWithoutImage)
            setFormData(formDataWithoutImage);
        }
    }, [formData.image]);

    useEffect(() => {
        const fetch = async () => {
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
      
        fetch();
    }, []);
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                //console.log(id);
                const response = await axios.get(`http://localhost:4000/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                //setFormData(response.data.blog);
                const { title, summary, content } = response.data.blog;
                setFormData({ title, summary, content, image:null });
                setImg(response.data.blog.image.url)
                //console.log(formData);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
      
        if (token) {
          fetchData();
        }
    }, [token]);

    const handleDelete = async () => {
        try {
            //console.log(formData)
            const response = await axios.delete(`http://localhost:4000/me/myblogs/${id}`, 
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
                navigate(`/me/myblogs`);
            }  
            else{
                console.log(response)
            } 
        } 
        // catch (error) {
        //     alert("Lỗi");
        //     console.error('Lỗi', error);  
        // }
        finally{

        }
    };

    return (
        <div className="">
            <h3 className="d-flex justify-content-center mt-4">Chỉnh sửa bài viết</h3>
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
                        value={formData.summary}
                        onChange={handleChange}>
                    </textarea>
                </div>

                <div className="form-group m-3">
                    {newimg ? (
                        <div className="">
                            <img 
                                src={newimg}
                                alt=""
                                style={{
                                    objectFit: 'cover ',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        </div>
                    ) : (
                        img && (
                            <div className="">
                                <img
                                    src={img}
                                    alt=""
                                    style={{
                                        objectFit: 'cover',
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>

                <div className="form-group m-3">
                    <label htmlFor="image" className="btn btn-secondary">
                        Chọn ảnh
                        <input
                            type="file"
                            className="form-control-file visually-hidden"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <div className="form-group m-3">
                    <label htmlFor="content">Nội dung</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea" 
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}>
                        style={{ height: "auto", minHeight: "200px" }}
                    </textarea>
                </div>
                
                <button onClick={handleSubmit} className="btn btn-success m-3">Cập nhật</button>
                <button onClick={handleDelete} className="d-flex btn btn-danger m-3 align-items-center">
                    <Trash className="me-2"/>
                    Xóa
                </button>
            </div>
        </div>
    );
}

export default Edit;
