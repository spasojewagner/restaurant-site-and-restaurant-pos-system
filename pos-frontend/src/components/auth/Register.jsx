import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { register } from "../../https/index";
import { useSnackbar } from 'notistack';
import { enqueueSnackbar } from 'notistack';
function Register({setRegister}) {
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        registerMutation.mutate(formData);
    }

    const handleRoleSelected = (selectedRole) => {
        setFormData({ ...formData, role: selectedRole })
    }

    const registerMutation = useMutation({
        mutationFn: (reqData) => register(reqData),
        onSuccess: (res) => {
            const { data } = res;
            enqueueSnackbar(data.message, { variant: "success" });
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                role: "",
            });
            setTimeout(() => {
                setRegister(false);
            }, 1500);
        },
        onError: (error) => {

            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });

            //console.log("Login failed:", error.response?.data || error.message);
        },
    });
    return (
        <div>
            <form onSubmit={handleSumbit} action="" >
                <div>
                    <label htmlFor="" className='block text-gray-50 mt-3  mb-2 text-sm font-medium '>Employee Name</label>

                    <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                        <input type="text"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter employee name'
                            className='bg-transparent flex-1 text-white focus:outline-none'
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="" className='block text-gray-50 mt-3  mb-2 text-sm font-medium '>Employee Email</label>

                    <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                        <input type="text"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter employee email'
                            className='bg-transparent flex-1 text-white focus:outline-none'
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="" className='block text-gray-50 mb-2 mt-3 text-sm font-medium '>Employer Phone</label>

                    <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                        <input type="number"
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder='Enter employee phone'
                            className='bg-transparent flex-1 text-white focus:outline-none'
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="" className='block text-gray-50 mb-2 mt-3 text-sm font-medium '>Password</label>

                    <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                        <input type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter password'
                            className='bg-transparent flex-1 text-white focus:outline-none'
                            required
                        />
                    </div>
                </div>
                <label htmlFor="" className='block text-gray-50 mb-2 mt-3 text-sm font-medium '>
                    Choose your role
                </label>

                <div className='flex items-center gap-3 mt-4'>
                    {["Waiter", "Cashier", "Admin"].map((role) => {
                        return (
                            <button
                                key={role}
                                type='button'
                                onClick={() => handleRoleSelected(role)}
                                className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-gray-100 hover:bg-[#292929]
                                 ${formData.role === role ? " bg-indigo-600" : ""}`}>
                                {role}</button>
                        );
                    })}

                </div>
                <button type="submit" className="w-full mt-6 py-3 text-lg bg-yellow-600 text-black font-bold hover:bg-amber-400 cursor-pointer">
                    Sign Up
                </button>

            </form>
        </div>
    )
}

export default Register