



const ProfileCustomerPage = () => {
    return (
        <>




            <div classNameNameName="wrapper-guest">
                <div classNameNameName="nav-guest">
                    <ul classNameName="nav">
                        <li><i classNameName="fa-regular fa-address-card icon-profile"></i> <span classNameName="name-profile"></span></li>

                        <li><a href="/profile_customer"><button classNameName="button-59">Thông tin tài khoản</button></a></li>

                        <li><a href="personal-inf.php?page=./module/update-inf.php"><button classNameName="button-59">Cập nhật thông tin</button></a></li>

                        <li><a href="personal-inf.php?page=./module/update-pass.php"><button classNameName="button-59">Đổi mật khẩu</button></a></li>

                        <li><a href="personal-inf.php?page=./module/order.php"><button classNameName="button-59">Đơn hàng</button></a></li>


                    </ul>

                </div>
            </div>

            <form class="display-inf">
                {/* <div class="img-profile">
                    <img src="../ASSETS/img/IMG-GUEST/user-regular.svg" alt="">
                </div> */}

                <div class="inf1 shadow_box">
                    <h3 class="text">THÔNG TIN ĐĂNG NHẬP</h3>
                    <kbd class="username">Tên đăng nhập: </kbd>
                </div>

                <div class="inf2 shadow_box">
                    <h3 class="text">THÔNG TIN CHUNG</h3>
                    <div class="dsp-flex">
                        <div class="fullname">Họ và tên: </div>
                        <div class="gender"> Giới tính:

                        </div>
                    </div>
                    <div class="dsp-flex">
                        <div class="birthday">Ngày sinh: </div>
                        <div class="numberphone">Số điện thoải: </div>
                    </div>
                    <div class="address">Địa chỉ: </div>
                    <div class="email">Email: </div>
                    <div class="create-date">Ngày tạo: </div>

                </div>
            </form>




        </>


    )
}

export default ProfileCustomerPage