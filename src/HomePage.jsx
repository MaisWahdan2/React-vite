import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import { AuthContext } from './AuthContext'; // يحتوي على معلومات المستخدم المسجل للدخول.

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('id');
  const [selectedOccupation, setSelectedOccupation] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // يمكنك تعديل عدد العناصر في كل صفحة

  const { user } = useContext(AuthContext); // جلب اسم المستخدم المسجل الدخول

  // تقسيم البريد الإلكتروني عند علامة @ وأخذ الجزء الأول فقط
  const usernameBeforeAt = user?.username ? user.username.split('@')[0] : 'User';

  const occupations = [
    'All',
    'Teacher',
    'Marketing Specialist',
    'Graphic Designer',
    'Marketing Manager',
    'Financial Analyst',
    'Data Analyst',
    'Doctor',
    'Software Engineer',
    'Software Developer',
    'Accountant',
    'Architect',
    'Student'
  ];

  useEffect(() => {
    setLoading(true);
    axios.get('https://freetestapi.com/api/v1/users')
      .then(response => {
        let filteredUsers = response.data;

        // Filter based on selected occupation
        if (selectedOccupation && selectedOccupation !== 'All') {
          filteredUsers = filteredUsers.filter(user => user.occupation === selectedOccupation);
        }

        // Sort based on the sortBy and sortOrder states
        filteredUsers.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        });

        setUsers(filteredUsers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.');
        setLoading(false);
      });
  }, [sortOrder, sortBy, selectedOccupation]);

  // Get current users (for the current page)
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <div className="user-directory">
        {/* تعديل العنوان ليظهر الجزء الأول من اسم المستخدم قبل @ */}
        <h2 className="text-center mb-4">Welcome, {usernameBeforeAt}</h2>

        <div className="filter-sort-bar d-flex justify-content-between mb-3">
          {/* Occupation Filter */}
          <select
            className="form-control w-25"
            value={selectedOccupation}
            onChange={(e) => setSelectedOccupation(e.target.value)}
          >
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>

          {/* Sort Button */}
          <button
            className="btn btn-secondary"
            style={{ marginLeft: '10px' }} 
            onClick={() => {
              setSortBy('name');
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            }}
          >
            Sort by Name
            {sortOrder === 'asc' ? (
              <i className="fas fa-arrow-up ms-2"></i>
            ) : (
              <i className="fas fa-arrow-down ms-2"></i>
            )}
          </button>
        </div>

        {/* Handling loading and error states */}
        {loading ? (
          <p>جاري التحميل...</p>
        ) : error ? (
          <p>{error}</p>
        ) : users.length === 0 ? (
          <p>لا يوجد مستخدمين لعرضهم.</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover table-bordered user-table">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Occupation</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.occupation}</td>
                      <td>
                        <Link to={`/users/${user.id}`} className="btn btn-outline-primary">View Profile</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Component */}
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={users.length}
              paginate={paginate}
              currentPage={currentPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, nextPage, prevPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className="page-item">
          <a onClick={prevPage} href="#!" className="page-link">Previous</a>
        </li>

        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}

        {/* Next Button */}
        <li className="page-item">
          <a onClick={nextPage} href="#!" className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default HomePage;
