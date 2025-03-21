import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/urserSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Podaci za login:", formData); // ➡️ Provera šta se zapravo šalje 
        loginMutation.mutate(formData);
    };

    const loginMutation = useMutation({
        mutationFn: (reqData) => login(reqData),
        onSuccess: (res) => {
            const { data } = res;
            console.log("Login successful:", data);
            const { _id, name, phone, email, role } = data.data;
            dispatch(setUser({ _id, name, phone, email, role }));
            navigate("/")


        },
        onError: (error) => {

            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });

            //console.log("Login failed:", error.response?.data || error.message);
        },
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-50 mt-3 mb-2 text-sm font-medium">
                        Employee Email
                    </label>
                    <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter employee email"
                            className="bg-transparent flex-1 text-white focus:outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-50 mb-2 mt-3 text-sm font-medium">
                        Password
                    </label>
                    <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="bg-transparent flex-1 text-white focus:outline-none"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 py-3 text-lg bg-yellow-600 text-black font-bold hover:bg-amber-400"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;
