import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import {  Mail, Bell } from "lucide-react";

const DashboardLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen gap-8 bg-white">
      <Sidebar onLogout={logout} className=' w-[80px]'/>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col   ">
      {/* <div className="flex flex-row justify-end items-center overflow-hidden h-[70px] bg-gray-100  p-6 border-b mb-1 mt-3 border-2 border-gray-100 rounded-xl w-[94%]">
        <div className="flex  ">
          <div className="bg-[#14919B] text-white rounded-full  w-10 h-10 flex items-center justify-center mr-4">
            <span className="text-xs font-bold">TM</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Totok Michael</h2>
            <p className="text-sm text-gray-500 flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              tmichae!20@mailcom
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Bell className="w-5 h-5" />
          </button>
          <div className="text-sm bg-[#ECF87E] px-3 py-1 rounded-full font-medium">
            3F
          </div>
        </div>
      </div> */}

        <main className="flex-1 bg-gray-100   p-6  border-1 rounded-xl mt-3 mb-1 w-[75%]  ml-[300px] ">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;