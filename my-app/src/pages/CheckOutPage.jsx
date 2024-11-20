import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout = () => {
  const [isLoading, setIsLoading] = useState({
    provinces: false,
    districts: false,
    wards: false
  });

  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    note: '',
    province: '',
    district: '',
    ward: ''
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: 'Mechanical Keyboard', price: 500000 },
    { id: 2, name: 'Keycaps Set', price: 150000 }
  ]);

  const [error, setError] = useState({
    provinces: '',
    districts: '',
    wards: ''
  });

  const fetchProvinces = async () => {
    setIsLoading(prev => ({ ...prev, provinces: true }));
    setError(prev => ({ ...prev, provinces: '' }));
    try {
      const response = await axios.get('https://provinces.open-api.vn/api/p/');
      setProvinces(response.data || []);
    } catch (err) {
      console.error("Error fetching provinces:", err);
      setError(prev => ({ ...prev, provinces: 'Không thể tải danh sách tỉnh thành. Vui lòng thử lại sau.' }));
    } finally {
      setIsLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const fetchDistricts = async (provinceCode) => {
    if (!provinceCode) return;
    setIsLoading(prev => ({ ...prev, districts: true }));
    setError(prev => ({ ...prev, districts: '' }));
    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      setDistricts(response.data.districts || []);
    } catch (err) {
      console.error("Error fetching districts:", err);
      setError(prev => ({ ...prev, districts: 'Không thể tải danh sách quận huyện. Vui lòng thử lại sau.' }));
    } finally {
      setIsLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const fetchWards = async (districtCode) => {
    if (!districtCode) return;
    setIsLoading(prev => ({ ...prev, wards: true }));
    setError(prev => ({ ...prev, wards: '' }));
    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      setWards(response.data.wards || []);
    } catch (err) {
      console.error("Error fetching wards:", err);
      setError(prev => ({ ...prev, wards: 'Không thể tải danh sách phường xã. Vui lòng thử lại sau.' }));
    } finally {
      setIsLoading(prev => ({ ...prev, wards: false }));
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setUserInfo({ ...userInfo, province: provinceCode, district: '', ward: '' });
    setDistricts([]);
    setWards([]);
    if (provinceCode) {
      fetchDistricts(provinceCode);
    }
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setUserInfo({ ...userInfo, district: districtCode, ward: '' });
    setWards([]);
    if (districtCode) {
      fetchWards(districtCode);
    }
  };

  const handleWardChange = (e) => {
    const wardCode = e.target.value;
    setUserInfo({ ...userInfo, ward: wardCode });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      if (!userInfo.province || !userInfo.district || !userInfo.ward) {
        alert('Vui lòng chọn đầy đủ địa chỉ');
        return;
      }

      const shippingAddress = `${userInfo.address}, ${userInfo.ward}, ${userInfo.district}, ${userInfo.province}`;

      // Prepare order data
      const orderData = {
        customer_id: localStorage.getItem('customerId'),
        order_date: new Date(),
        total_price: calculateTotal(),
        payment_method: paymentMethod,
        status: 'pending',
        total_products: orderItems.reduce((sum, item) => sum + item.quantity, 0),
        orderDetails: orderItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          shipping_address: shippingAddress,
          order_notes: userInfo.note || ''
        }))
      };
      console.log(orderData);

      // Send order data to backend
      const response = await api.post('order/create', orderData);

      if (response.data.success) {
        // Create initial order status history
        await api.post('/api/v1/orderstatushistory/create', {
          order_id: response.data.orderId,
          old_status: null,
          new_status: 'pending',
          updated_by: 'customer',
          change_reason: 'Order placed'
        });

        // Clear cart after successful order
        await api.delete(`/api/v1/cart/clear/${localStorage.getItem('customerId')}`);

        alert('Đặt hàng thành công!');
        // Redirect to order confirmation page
        window.location.href = `/order-confirmation/${response.data.orderId}`;
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Thông tin nhận hàng */}
        <div className="col-lg-8 col-md-7 mb-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Thông tin nhận hàng</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    title="Vui lòng nhập số điện thoại hợp lệ (10 số)"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Số nhà, tên đường"
                  />
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Tỉnh/Thành phố</label>
                    <select
                      className="form-select"
                      value={userInfo.province}
                      onChange={handleProvinceChange}
                      name="province"
                      required
                      disabled={isLoading.provinces}
                    >
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {provinces.map(province => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Quận/Huyện</label>
                    <select
                      className="form-select"
                      value={userInfo.district}
                      onChange={handleDistrictChange}
                      name="district"
                      required
                      disabled={!userInfo.province || isLoading.districts}
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map(district => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Phường/Xã</label>
                    <select
                      className="form-select"
                      value={userInfo.ward}
                      onChange={handleWardChange}
                      name="ward"
                      required
                      disabled={!userInfo.district || isLoading.wards}
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {wards.map(ward => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Ghi chú</label>
                  <textarea
                    name="note"
                    className="form-control"
                    value={userInfo.note}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Ghi chú về đơn hàng"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading.provinces || isLoading.districts || isLoading.wards}
                >
                  ĐẶT HÀNG
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="col-lg-4 col-md-5">
          <div className="card shadow">
            <div className="card-header bg-secondary text-white">
              <h4 className="mb-0">Đơn hàng</h4>
            </div>
            <div className="card-body">
              {orderItems.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.name}</span>
                  <span>{formatPrice(item.price)}</span>
                </div>
              ))}
              <hr />
              <div className="mb-3">
                <label className="form-label">Phương thức thanh toán</label>
                <div className="form-check">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    className="form-check-input"
                    checked={paymentMethod === 'bank'}
                    onChange={handlePaymentChange}
                    id="bank"
                  />
                  <label className="form-check-label" htmlFor="bank">
                    Thanh toán chuyển khoản
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    className="form-check-input"
                    checked={paymentMethod === 'cash'}
                    onChange={handlePaymentChange}
                    id="cash"
                  />
                  <label className="form-check-label" htmlFor="cash">
                    Thanh toán khi nhận hàng
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <strong>Tổng tiền:</strong>
                <strong>{formatPrice(calculateTotal())}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Checkout;