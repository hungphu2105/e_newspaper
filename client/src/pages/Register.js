import axios from "axios";
import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate  = useNavigate();
    const [passwordMismatch, setPasswordMismatch] = useState('');
    const [formData, setFormData] = useState({
        phone_number: '',
        user_name: '',
        pass_word: '',
        confirm_password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.pass_word !== formData.confirm_password) {
            setPasswordMismatch('Nhập lại mật khẩu không chính xác');
            return;
        }
        else{
            setPasswordMismatch('')
        }
        try {
            await axios.post('http://localhost:4000/auth/register', formData);
            //console.log('Đăng ký thành công', response.data);
            alert("Đăng ký thành công");
            navigate('/');
        } catch (error) {
            alert("Đăng ký thất bại");
            console.error('Đăng ký thất bại', error);
        }
    };

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="w-400 p-4 bg-white">
                    <h1 className="text-medium">Đăng ký</h1>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="phone_number" className="form-label">
                            Số điện thoại
                        </label>
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
                        <label htmlFor="user_name" className="form-label">
                            Tên người dùng
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="user_name"
                            placeholder="Nhập tên người dùng"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pass_word" className="form-label">
                            Mật khẩu
                        </label>
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

                    <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">
                            Nhập lại mật khẩu
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirm_password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        {passwordMismatch ? (
                            <div className="requireData">{passwordMismatch}</div>
                        ) : (
                            <p></p>
                        )}
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary text-white px-5 my-2 w-100">
                        Đăng ký
                    </button>
                    <Link to="/" className="text-mini">
                        Đã đăng ký , nhấn vào đây để đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
