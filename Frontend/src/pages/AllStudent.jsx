import { useEffect, useState } from "react";
import useCheckAuth from "../hooks/useCheckAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import DataTableModule from "react-data-table-component";

const DataTable = DataTableModule?.default ?? DataTableModule;


const AllStudent = () => {
    const isAuth = useCheckAuth();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (isAuth === false) {
            navigate("/login");
            return;
        }

        if (isAuth !== true) return;

        const fetchStudents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/students/get-students");
                setStudents(res.data.students);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, [isAuth, navigate]);

    if (isAuth === null) {
        return <p>Checking auth...</p>;
    }

    const columns = [
        {
            name: "ID",
            selector: row => row._id,
        },
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Gender",
            selector: row => row.gender,
        },
        {
            name: "Actions",
            cell: row => (
                <>
                    <button
                        onClick={() => navigate(`/edit-student/${row._id}`)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => navigate(`/delete-student/${row._id}`)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 ml-2"
                    >
                        Delete
                    </button>
                </>
            )

        }
    ]

    return (
        <div className="w-full max-w-6xl p-4">
            <div className="mb-4">
                <button
                    onClick={() => navigate("/add-student")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Student
                </button>
            </div>
            {students && students.length > 0 ? (
                <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
                    <DataTable
                        columns={columns}
                        data={students}
                        pagination
                        striped
                        highlightOnHover
                        responsive
                    />
                </div>
            ) : (
                <p className="text-slate-600">No students found.</p>
            )}
        </div>
    );
};

export default AllStudent;