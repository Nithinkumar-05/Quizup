import { useState, useEffect } from "react";
import axios from "axios"; 

const Profile = () => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({ name, userId, role });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData({ name, userId, role });
    }, [name, userId, role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Replace with your API endpoint for updating user profile
            await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Update local storage if necessary
            localStorage.setItem("name", formData.name);
            localStorage.setItem("role", formData.role);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
            setEditable(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-center text-3xl font-extrabold mb-6">Profile</h1>
                <form 
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-lg font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!editable}
                                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-lg font-medium text-gray-700" htmlFor="userId">
                                User ID
                            </label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                disabled
                                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-lg font-medium text-gray-700" htmlFor="role">
                                Role
                            </label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={!editable}
                                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => setEditable(prev => !prev)}
                            className={`w-full py-3 rounded-md text-white transition duration-150 ease-in-out ${editable ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            {editable ? "Cancel" : "Edit"}
                        </button>
                        {editable && (
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-150 ease-in-out"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
