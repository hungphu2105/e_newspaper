import axios from "axios";
import React from "react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { Ban , CheckCircle2  } from 'lucide-react';

function AdminAccounts() {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState([]);

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
      }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(token)
                const response = await axios.get('http://localhost:4000/users/admin', {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });

                setUsers(response.data.users);
                //console.log(response.data.users)
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
      
        if (token) {
          fetchData();
        }
    }, [token]);

    const handleDisable = async (userId) => {
        try {
            console.log(token)
            const response = await axios.post(`http://localhost:4000/users/admin/${userId}`, 
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.success){
                //console.log(response.data.message)
                //alert(response.data.message)
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
        <div className="d-flex flex-column align-items-center">
            <div className="card mt-4" style={{ width: '55rem' }}>
                <div className="card-body">
                    <h1 className="card-title mb-3">Quản lí tài khoản</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="col-1" >#</th>
                                <th scope="col" className="col-3" >Tên người dùng</th>
                                <th scope="col" className="col-2" >Trạng thái</th>
                                <th scope="col" className="col-1" ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr>
                                    <th scope="row" className="align-middle">{index + 1}</th>
                                    <td className="align-middle">{user.user_name}</td>
                                    <td className={`align-middle ${user.is_active ? 'text-success' : 'text-danger'}`}>
                                        {user.is_active ? 'Hoạt động' : 'Vô hiệu'}
                                    </td>
                                    <td >
                                        <button onClick={() => handleDisable(user._id)} className="btn btn-warning">
                                            <Ban className="text-danger"/>
                                            |
                                            <CheckCircle2 className="text-success"/>
                                        </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminAccounts;
