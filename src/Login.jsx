import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // للاستفادة من Yup للتحقق من صحة المدخلات
import './Login.scss';

const Login = () => {
  const { login } = useContext(AuthContext); // استخدام useContext للوصول إلى دالة login
  const navigate = useNavigate();

  // استخدام Formik لإدارة الحقول والتحقق من صحة المدخلات
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(3, 'Must be 3 characters or more').required('Required'),
    }),
    onSubmit: (values) => {
      if (login(values.username, values.password)) {
        navigate('/home');
      } else {
        formik.setFieldError('general', 'Invalid username or password');
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error-message">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={formik.handleChange}s
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>
          {formik.errors.general && <p className="error-message">{formik.errors.general}</p>}
          <button type="submit" className="btn-submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;