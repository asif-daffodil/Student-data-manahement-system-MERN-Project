import axios from "axios";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const DeleteStudent = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [stdData, setStdData] = useState(null);

    useEffect(() => {
        if (!id || !token) {
            navigate("/");
            return;
        } else {
            (async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/students/get-student/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    setStdData(res.data);
                } catch (err) {
                    toast.error(err.response?.data?.message || err.message || "Failed to load student");
                    navigate("/");
                }
            })()
        }
    }, []);
    
    const {register, handleSubmit, formState: { errors }, reset, setValue} = useForm();

    useEffect(() => {
        if (!stdData) return;
        setValue("id", stdData.student._id);
    }, [stdData, setValue]);

    const onSubmit = async (data) => {
        try {
            await axios.delete(`http://localhost:5000/api/students/delete-student/${data.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("Student deleted successfully");
            navigate("/");
        }catch(err) {
            toast.error(err.response?.data?.message || err.message || "Failed to delete student");
        }
    }

    return (
        <div className="text-3xl lg:text-6xl w-lg text-center border p-10 rounded shadow shadow-blue-500">
            <div>
                Do you realy want to delete the student <span className="text-red-600">{stdData?.student?.name}</span>?
            </div>
            <div className="text-xl flex justify-center mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("id", {
                        required: true,
                    })} />
                    {errors.id && <span className="text-red-600 text-sm">ID is required</span>}
                    <button className="border rounded-full px-4 py-2 bg-red-600 text-white mr-4 cursor-pointer" type="submit">Yes</button>
                </form>
                <Link to="/" className="border rounded-full px-4 py-2 bg-green-600 text-white cursor-pointer">No</Link>
            </div>
        </div>
    );
};

export default DeleteStudent;