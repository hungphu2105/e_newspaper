import axios from "axios";
import React from "react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getCookieByName } from "../utils/cookie";

function Profile() {
    const [token, setToken] = useState([]);
    const [newavatar, setNewavatar] = useState();
    const [avatar, setAvatar] = useState();
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        phone_number: '',
        avatar: null,
    });
    useEffect(() => {
        if (formData.avatar === null || formData?.avatar?.url===avatar) {
            const { avatar, ...formDataWithoutAvatar } = formData;
            setFormData(formDataWithoutAvatar);
        }
    }, [formData.avatar]);
      
    useEffect(() => {
          fetchData();
        // }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/me/account/info`, {
            headers: {
                Authorization: `Bearer ${getCookieByName('access_token')}`,
            },
            });
            const { phone_number, user_name } = response.data.user;
            setFormData({ phone_number, user_name, avatar:null });
            setAvatar(response.data.user.avatar.url)
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            console.log(formData)
            const response = await axios.put(`http://localhost:4000/me/account/info`, 
                formData, 
                {
                    headers: {
                        Authorization: `Bearer ${getCookieByName('access_token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.success){
                alert(response.data.message)
                window.location.reload();
                //fetchData()
                //navigate(`/me/info`);
            }   
        } 
        catch (error) {
            alert(error.data);
            console.error('Lỗi', error);  
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
    
        reader.onload = function () {
            if (reader.readyState === 2) {
                const img = new Image();
                img.src = reader.result;
    
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const size = Math.min(img.width, img.height);
    
                    canvas.width = size;
                    canvas.height = size;
    
                    const ctx = canvas.getContext('2d');
    
                    const offsetX = (img.width - size) / 2;
                    const offsetY = (img.height - size) / 2;
                    ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);
    
                    const squaredImage = canvas.toDataURL('image/jpeg');
                    setFormData({ ...formData, avatar: squaredImage });
                    setNewavatar(squaredImage);
                };
            }
        };
    
        if (e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setFormData({ ...formData, avatar: null });
            setNewavatar(null);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="card mt-4" style={{ width: '55rem' }}>
                <div className="card-body">
                    <h3 className="card-title p-2">Thông tin cá nhân</h3>
                    <div className="d-flex flex-row p-2">
                        <div className="d-flex col-sm-2">Tên người dùng</div>
                        <textarea 
                            type="text"
                            className="form-control"
                            id="user_name"
                            name="user_name"
                            value={formData.user_name}
                            rows={1}
                            style={{ color: '#87CEEB',  width: '250px'}}
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className="d-flex flex-row p-2">
                        <div className="d-flex col-sm-2">Số điện thoại</div>
                        <textarea 
                            type="text"
                            className="form-control"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            rows={1}
                            style={{ color: '#87CEEB',  width: '250px' }}
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <div className="d-flex col-sm-2 mb-2">Ảnh đại diện</div>
                        <div className="d-flex align-items-center">
                            <div  
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    overflow: 'hidden',
                                    borderRadius: '50%',
                                    marginRight: '8px',
                                }}
                            >
                                {newavatar ? (
                                    <div className="">
                                        <img 
                                            src={newavatar}
                                            alt=""
                                            style={{
                                                objectFit: 'cover ',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                            }}
                                        />
                                    </div>
                                ) : (
                                    avatar && (
                                        <div className="">
                                            <img
                                                src={avatar}
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
                            <label htmlFor="image" className="btn btn-secondary btn-sm m-3">
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
                    </div>
                    <div className="d-flex flex-row p-2 mt-3">
                        <button onClick={handleSubmit} className="btn btn-success">Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
