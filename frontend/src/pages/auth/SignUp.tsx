import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Link } from 'react-router-dom'
import { AuthFormData } from '../../types';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../reducers/auth/authReducer';
import { AppDispatch } from '../../reducers/store';

const SignUp : React.FC = () => {
    const [formData, setFormData] = useState<AuthFormData >({
        email: "",
        password: "",
    });
    const dispatch = useDispatch<AppDispatch>();

    const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
        [name]: value,
        }));
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData.email, formData.password);
        dispatch(signUpUser(formData));
    }

  return (
     <Layout>
        <div className="flex items-center justify-center p-4 w-full">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Join Us Today
                </h1>
                <form className="space-y-7" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input 
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={formData.email}
                        onChange={handleData}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input 
                        type="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                        value={formData.password}
                        onChange={handleData}
                        />
                    </div>
                    <button type="submit"
                    className={`w-full py-3 px-4 bg-green-500 text-white font-bold rounded-md shadow-md transition-duration-300 disabled:bg-green-300 disabled:cursor-not-allowed-not-allowed flex items-center justify-center`}
                    >
                        Sign Up
                    </button>

                </form>
                <Link to={"/sign-in"} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-300">
                Login If You have an account
                </Link>
            </div>
        </div>
        {/* Add your children components here */}
     </Layout>
  )
}

export default SignUp