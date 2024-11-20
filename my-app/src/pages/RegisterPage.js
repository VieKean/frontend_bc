
import React, { useState } from "react";
import api from '../services/api';
import { message } from "antd";

const Register1 = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        phonenumber: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    // gia trị ban đầu trước khi check
    const defaulValidateInput = {

        isValidFullname: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidCfPass: true
    }

    // chỉnh sửa giá trị khi check không hợp lệ
    const [checkInput, setCheckInput] = useState(defaulValidateInput)


    //tự động thay đổi giá trị khi nhập vào input và cập nhật state
    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };


    // xử lí thông tin đăng ký
    const handleSubmit = async (e) => {
        e.preventDefault();

        setCheckInput(defaulValidateInput)

        // check
        const validateInput = (formData) => {
            if (!formData.fullname) {
                message.error("Chưa nhập họ tên!");
                setCheckInput({ ...defaulValidateInput, isValidFullname: false })
                return false;
            }


            if (!formData.phonenumber) {
                message.error("Chưa nhập số điện thoại!");
                setCheckInput({ ...defaulValidateInput, isValidPhone: false })
                return false;
            }


            if (!formData.email) {
                message.error("Chưa nhập email!");
                setCheckInput({ ...defaulValidateInput, isValidEmail: false })
                return false;
            }


            var re = /\S+@\S+\.\S+/; //check email
            if (!re.test(formData.email)) {
                message.error("Email không hợp lệ!");
                setCheckInput({ ...defaulValidateInput, isValidEmail: false })
                return false;
            }


            if (!formData.username) {
                message.error("Chưa nhập tài khoản!");
                setCheckInput({ ...defaulValidateInput, isValidUsername: false })
                return false;
            }


            if (!formData.password) {
                message.error("Chưa nhập mật khẩu!");
                setCheckInput({ ...defaulValidateInput, isValidPassword: false })
                return false;
            }


            if (!formData.confirmPassword) {
                message.error("Chưa xác nhận mật khẩu!");
                setCheckInput({ ...defaulValidateInput, isValidCfPass: false })
                return false;
            }


            if (formData.password !== formData.confirmPassword) {
                message.error("Xác nhận mật khẩu thất bại!");
                setCheckInput({ ...defaulValidateInput, isValidCfPass: false })
                return false;
            }

            if (formData.password && formData.password.length < 11) {
                message.error("Mật khẩu phải dài hơn 10 ký tự!");
                return false;
            }

            if (formData.phonenumber && formData.phonenumber.length < 9) {
                message.error("Số điện thoại không hợp lên!");
                return false;
            }

            if (formData.phonenumber && formData.phonenumber.length > 11) {
                message.error("Số điện thoại không hợp lên!");
                return false;
            }

            return true

        }

        let check = validateInput(formData)

        console.log("Check:", check)

        if (check == true) {
            try {
                // Gọi API đăng ký
                let getJSON = await api.post("/register", formData);
                let getDataJSON = getJSON.data;
                console.log(formData)
                if (+getDataJSON.err == 1) {
                    let messageJSON = getDataJSON.message
                    message.error(messageJSON);
                }
                else {
                    message.success("Đăng ký thành công! Bạn có thể đăng nhập.");
                }



            } catch (error) {
                console.error("Đăng ký thất bại:", error);
                message.error("Đăng ký thất bại. Vui lòng thử lại.");
            }
        }
    };

    return (




        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Đăng ký</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    className={checkInput.isValidFullname ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"}
                                                    value={formData.fullname}
                                                    onChange={handleChange}
                                                    placeholder="Nhập họ tên"

                                                />
                                                <label
                                                    className={`form-label ${formData.fullname ? "" : "hidden-label"
                                                        }`}
                                                    htmlFor="fullname"
                                                >
                                                    Họ tên
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input
                                                    type="tel"
                                                    id="phonenumber"
                                                    className={checkInput.isValidPhone ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"}
                                                    value={formData.phonenumber}
                                                    onChange={handleChange}
                                                    placeholder="Nhập số điện thoại"

                                                />
                                                <label
                                                    className={`form-label ${formData.phonenumber ? "" : "hidden-label"
                                                        }`}
                                                    htmlFor="phonenumber"
                                                >
                                                    Số điện thoại
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="username"
                                                    className={checkInput.isValidUsername ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"}
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    placeholder="Nhập tài khoản"

                                                />
                                                <label
                                                    className={`form-label ${formData.username ? "" : "hidden-label"
                                                        }`}
                                                    htmlFor="username"
                                                >
                                                    Tài khoản
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    className={checkInput.isValidEmail ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"}
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Nhập email"

                                                />
                                                <label
                                                    className={`form-label ${formData.email ? "" : "hidden-label"
                                                        }`}
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className={checkInput.isValidPassword ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"}
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="Nhập mật khẩu"

                                                />
                                                <label
                                                    className={`form-label ${formData.password ? "" : "hidden-label"
                                                        }`}
                                                    htmlFor="password"
                                                >
                                                    Mật khẩu
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    className={checkInput.isValidCfPass ? "form-control form-control-lg" : "form-control form-control-lg is-invalid"}
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    placeholder="Nhập lại mật khẩu"

                                                />
                                                <label
                                                    className={`form-label ${formData.confirmPassword ? "" : "hidden-label"
                                                        }`}
                                                    htmlFor="confirmPassword"
                                                >
                                                    Xác nhận mật khẩu
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-2">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            Đăng ký
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register1;
