import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.scss'; // ملف CSS أو SCSS الخاص بالتنسيق

const UserProfile = () => {
  const { id } = useParams();  // الحصول على معرف المستخدم من المسار
  const [user, setUser] = useState(null);  // حالة لتخزين بيانات المستخدم
  const [loading, setLoading] = useState(true);  // حالة للتحكم بعرض رسالة "Loading"
  const [error, setError] = useState(null);  // حالة للتعامل مع الأخطاء

  // جلب بيانات المستخدم باستخدام Axios بناءً على المعرف (id)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://freetestapi.com/api/v1/users/${id}`);
        setUser(response.data);  // تحديث حالة المستخدم بالبيانات المستلمة
        setLoading(false);  // إيقاف عرض رسالة "Loading"
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data.');  // عرض رسالة خطأ في حال الفشل
        setLoading(false);  // إيقاف عرض رسالة "Loading" حتى في حالة الخطأ
      }
    };

    fetchUserData();  // استدعاء الدالة لجلب البيانات
  }, [id]);

  // عرض رسالة "Loading" إذا كانت البيانات قيد التحميل
  if (loading) {
    return <p>Loading user data...</p>;
  }

  // عرض رسالة خطأ في حال الفشل
  if (error) {
    return <p>{error}</p>;
  }

  // تأكد من أن البيانات موجودة قبل عرضها لتجنب الأخطاء
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile">
        <div className="profile-header">
          {/* إدراج الأيقونة كـ SVG بدلاً من الصورة */}
          <svg
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="profile-image"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.0724 4.02447C15.1063 3.04182 13.7429 2.5 12.152 2.5C10.5611 2.5 9.19773 3.04182 8.23167 4.02447C7.26636 5.00636 6.73644 6.38891 6.73644 8C6.73644 10.169 7.68081 11.567 8.8496 12.4062C9.07675 12.5692 9.3115 12.7107 9.54832 12.8327C8.24215 13.1916 7.18158 13.8173 6.31809 14.5934C4.95272 15.8205 4.10647 17.3993 3.53633 18.813C3.43305 19.0691 3.55693 19.3604 3.81304 19.4637C4.06914 19.567 4.36047 19.4431 4.46375 19.187C5.00642 17.8414 5.78146 16.4202 6.98653 15.3371C8.1795 14.265 9.82009 13.5 12.152 13.5C14.332 13.5 15.9058 14.1685 17.074 15.1279C18.252 16.0953 19.0453 17.3816 19.6137 18.6532C19.9929 19.5016 19.3274 20.5 18.2827 20.5H6.74488C6.46874 20.5 6.24488 20.7239 6.24488 21C6.24488 21.2761 6.46874 21.5 6.74488 21.5H18.2827C19.9348 21.5 21.2479 19.8588 20.5267 18.2452C19.9232 16.8952 19.0504 15.4569 17.7087 14.3551C16.9123 13.7011 15.9603 13.1737 14.8203 12.8507C15.43 12.5136 15.9312 12.0662 16.33 11.5591C17.1929 10.462 17.5676 9.10016 17.5676 8C17.5676 6.38891 17.0377 5.00636 16.0724 4.02447ZM15.3593 4.72553C16.1144 5.49364 16.5676 6.61109 16.5676 8C16.5676 8.89984 16.2541 10.038 15.544 10.9409C14.8475 11.8265 13.7607 12.5 12.152 12.5C11.5014 12.5 10.3789 12.2731 9.43284 11.5938C8.51251 10.933 7.73644 9.83102 7.73644 8C7.73644 6.61109 8.18963 5.49364 8.94477 4.72553C9.69916 3.95818 10.7935 3.5 12.152 3.5C13.5105 3.5 14.6049 3.95818 15.3593 4.72553Z"
              fill="#000000"
            />
          </svg>

          <h1>{user?.name || 'No Name Available'}</h1>
        </div>
        
        {/* إضافة الخط المقطع تحت الرأس */}
        <hr className="profile-divider" />
  
        <div className="profile-details">
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${user?.email || ''}`}>{user?.email || 'No Email Available'}</a>
          </p>
          <p>
            <strong>Website: </strong>
            <a href={user?.website ? `https://${user.website}` : '#'} target="_blank" rel="noopener noreferrer">{user?.website || 'No Website Available'}</a>
          </p>
          <p><strong>Phone: </strong>{user?.phone || 'No Phone Available'}</p>
          <p><strong>Address: </strong>{user?.address?.street || 'No Street Available'}, {user?.address?.city || 'No City Available'}</p>
          
          {/* عرض الهوايات إذا كانت موجودة */}
          <p><strong>Hobbies: </strong></p>
          {user?.hobbies && user.hobbies.length > 0 ? (
            <ul>
              {user.hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          ) : (
            <p>No Hobbies Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
