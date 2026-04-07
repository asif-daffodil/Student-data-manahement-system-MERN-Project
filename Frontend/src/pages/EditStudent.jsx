import useCheckAuth from "../hooks/useCheckAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const EditStudent = () => {
    const { id } = useParams();
    const isAuth = useCheckAuth();
    const navigate = useNavigate();
    const [stdData, setStdData] = useState(null);
    const token = localStorage.getItem("token");

    const normalizeGender = (value) => {
        if (typeof value !== "string") return "";
        const normalized = value.trim().toLowerCase();
        if (normalized === "male") return "Male";
        if (normalized === "female") return "Female";
        if (normalized === "other") return "Other";
        return value;
    };

    useEffect(() => {
        if (isAuth === false) navigate("/login");
    }, [isAuth, navigate]);

    useEffect(() => {
        if (isAuth !== true) return;
        if (!token) return;

        (async function () {
            try {
                const res = await axios.get(`http://localhost:5000/api/students/get-student/${id}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setStdData(res.data);
            } catch (error) {
                toast.error(error.response?.data?.message || error.message || "Failed to load student");
            }
        })();
    }, [id, isAuth, token]);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        const student = stdData?.student;
        if (!student) return;

        setValue("name", student.name ?? "");
        setValue("gender", normalizeGender(student.gender));
    }, [stdData, setValue]);


    const onSubmit = async (data) => {
        const res = await axios.put(`http://localhost:5000/api/students/update-student/${id}`, data, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        if (res.status === 200) {
            toast.success("Student updated successfully");

            reset();
            navigate("/");
        }
    };

    if (stdData === null) {
        return <p>Loading student data...</p>;
    }

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Edit Student {stdData?.student?.name}</h1>
                    <Link to="/" className="border rounded-full text-sm px-2">Back</Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name:</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter student name"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender:</label>
                        <select
                            {...register("gender", { required: "Gender is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6"
                    >
                        Update Student
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditStudent;