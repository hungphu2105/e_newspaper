import axios from "axios";
import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({
        phone_number: '',
        pass_word: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/auth/login', formData, {withCredentials: true});
            if(response.data.success){
                //alert('Đăng nhập thành công');
                document.cookie = `access_token=${response.data.data.token}`;
                document.cookie = `user_name=${response.data.data.username}`;
                document.cookie = `role=${response.data.data.role}`;
                document.cookie = `avatarUrl=${response.data.data.avatar}`;
                if(response.data.data.role===0){
                    navigate('/blogs/admin')
                } else{
                    navigate('/blogs')
                }
                
                //console.log(response.data.data);
            }   
        } catch (error) {
            alert(error.response.data.message);
            console.error(error.response.data.message);  
        }
    };

    return (
        <div className="login-page-1">
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="w-400 p-4 bg-white">
                        <h1 className="text-medium">Đăng nhập</h1>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone_number"
                                placeholder="Nhập số điện thoại"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="pass_word" className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            id="pass_word"
                            placeholder="Nhập mật khẩu"
                            name="pass_word"
                            value={formData.pass_word}
                            onChange={handleChange}
                        />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-primary text-white px-5 my-2 w-100">
                            Đăng nhập
                        </button>
                        <Link to="/register" className="text-mini text-black d-block">
                            Chưa đăng ký, nhấn vào đây để đăng ký
                        </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
