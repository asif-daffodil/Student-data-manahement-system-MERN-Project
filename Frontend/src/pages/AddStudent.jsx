import axios from "axios";
import useCheckAuth from "../hooks/useCheckAuth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddStudent = () => {
    const isAuth = useCheckAuth();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    useEffect(() => {
        if (isAuth === false) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    const onSubmit = async (data) => {
        const res = await axios.post("http://localhost:5000/api/students/add-student", data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (res.status === 201) {
            toast.success("Student added successfully");
            navigate("/");
        }else{
            toast.error(res.data.message || "Failed to add student");
        }
        reset();
    };


    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full w-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Student</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input 
                            {...register("name", { required: "Name is required" })} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="Enter student name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                        <div className="flex gap-6">
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    {...register("gender", { required: "Gender is required" })} 
                                    value="Male"
                                    className="mr-2"
                                />
                                <span className="text-gray-700">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    {...register("gender", { required: "Gender is required" })} 
                                    value="Female"
                                    className="mr-2"
                                />
                                <span className="text-gray-700">Female</span>
                            </label>
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6"
                    >
                        Add Student
                    </button>
                </form>
                <Link to="/" className="block text-center text-sm text-gray-600 mt-4 hover:text-gray-800">
                    Back to Student List
                </Link>
            </div>
        </div>
    );
}

export default AddStudent;