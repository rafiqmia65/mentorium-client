import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaBookOpen, FaGraduationCap } from 'react-icons/fa'; 
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loader from '../../Loader/Loader';

const StatsSection = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch website statistics
    const {
        data: stats = {},
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['websiteStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stats');
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
        cacheTime: 1000 * 60 * 10, // Data stays in cache for 10 minutes
    });

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-8">
                Error loading statistics: {error.message}
            </div>
        );
    }

    const { totalUsers = 0, totalClasses = 0, totalEnrollments = 0 } = stats;

    return (
        <section className="py-12 bg-base-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-center text-primary mb-10">
                    Our Achievements in Numbers
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left Side: Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Users Card */}
                        <div className="card bg-purple-100 text-purple-800 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105">
                            <FaUsers className="text-5xl mb-3" />
                            <p className="text-4xl font-bold">{totalUsers}</p>
                            <p className="text-lg">Total Users</p>
                        </div>

                        {/* Total Classes Card */}
                        <div className="card bg-teal-100 text-teal-800 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105">
                            <FaBookOpen className="text-5xl mb-3" />
                            <p className="text-4xl font-bold">{totalClasses}</p>
                            <p className="text-lg">Total Classes</p>
                        </div>

                        {/* Total Enrollment Card */}
                        <div className="card bg-orange-100 text-orange-800 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105">
                            <FaGraduationCap className="text-5xl mb-3" />
                            <p className="text-4xl font-bold">{totalEnrollments}</p>
                            <p className="text-lg">Total Enrollments</p>
                        </div>
                    </div>

                    {/* Right Side: Relevant Image */}
                    <div className="hidden lg:flex justify-center items-center">
                        <img
                            src="https://i.ibb.co/jZw68fGN/library-1400313-1280.jpg" // Placeholder image
                            alt="Learning Platform Statistics"
                            className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;