import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, deleteStudent, addTeacher, deleteTeacher } from '../redux/dataSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement'; 

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { students, teachers } = useSelector((state) => state.data); 
    const [studentName, setStudentName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('students');
    const [loading, setLoading] = useState(false); 

    const handleAddStudent = () => {
        if (studentName) {
            setLoading(true); 
            dispatch(addStudent(studentName));
            toast.success('Student added');
            setStudentName('');
            setLoading(false); 
            toast.error('Please enter a student name');
        }
    };

    const handleAddTeacher = () => {
        if (teacherName) {
            setLoading(true); 
            dispatch(addTeacher(teacherName));
            toast.success('Teacher added');
            setTeacherName('');
            setLoading(false); 
        } else {
            toast.error('Please enter a teacher name');
        }
    };

    const handleLogout = () => {
        toast.success('Logged out');
        navigate('/login');
    };

    const filterList = (list) => {
        const filtered = list.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase())
        );
        return filtered;
    };

    return (
        <div className="min-h-screen bg-violet-50 text-violet-900">
            {/* Navigation Bar */}
            <nav className="bg-violet-600 text-white p-4 shadow-lg flex justify-between items-center">
                <h2 className="text-2xl font-bold">CRES</h2>

                <button
                    onClick={handleLogout}
                    className="bg-violet-700 hover:bg-violet-800 text-white py-2 px-4 rounded-md transition duration-300 flex items-center"
                >
                    <FaSignOutAlt className="mr-2" /> Logout
                </button>
            </nav>

            <div className="container mx-auto p-4 ">
                <div className="flex justify-center flex-1 space-x-8 py-5 bg-violet-400 rounded-full mb-5 text-white">
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`${activeTab === 'students' ? 'bg-gradient-to-r from-violet-600 to-violet-800 shadow-lg' : 'hover:bg-violet-600'} 
                    px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold`}
                    >
                        Students
                    </button>
                    <button
                        onClick={() => setActiveTab('teachers')}
                        className={`${activeTab === 'teachers' ? 'bg-gradient-to-r from-violet-600 to-violet-800 shadow-lg' : 'hover:bg-violet-600'} 
                    px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold`}
                    >
                        Teachers
                    </button>
                </div>

                <input
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 mb-6 border border-violet-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                {/* Add Student or Teacher */}
                <UserManagement
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    name={activeTab === 'students' ? studentName : teacherName}
                    setName={activeTab === 'students' ? setStudentName : setTeacherName}
                    handleAddUser={activeTab === 'students' ? handleAddStudent : handleAddTeacher}
                    filterList={filterList}
                    userList={activeTab === 'students' ? students : teachers}
                    deleteUser={activeTab === 'students' ? (i) => dispatch(deleteStudent(i)) : (i) => dispatch(deleteTeacher(i))}
                    userType={activeTab === 'students' ? 'Student' : 'Teacher'}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Dashboard;
