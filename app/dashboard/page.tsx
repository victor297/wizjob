"use client";

import React from "react";
import {
  FiTrendingUp,
  FiCheckCircle,
  FiXCircle,
  FiPercent,
} from "react-icons/fi";

export interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  level: string;
  location: string;
  remote: string;
  posted: string;
}
const jobs: Job[] = [
  {
    id: "1",
    title: "Product Designer",
    company: "Spotify",
    type: "Fulltime",
    level: "Senior Level",
    location: "Stockholm, Sweden",
    remote: "Remote",
    posted: "12 hours ago",
  },
  {
    id: "2",
    title: "UX Researcher",
    company: "Tiktok",
    type: "Fulltime",
    level: "Medium Level",
    location: "China, Shanghai",
    remote: "Remote",
    posted: "19 hours ago",
  },
  {
    id: "3",
    title: "UX Researcher",
    company: "LinkedIn",
    type: "Fulltime",
    level: "Medium Level",
    location: "Jakarta, Indonesia",
    remote: "Remote",
    posted: "20 hours ago",
  },
];

const DashboardHome = () => {
  const stats = [
    {
      title: "All Applications Sent",
      value: "127",
      change: "+10%",
      icon: <FiTrendingUp className="text-green-500" />,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Interviews",
      value: "12",
      change: "+10%",
      icon: <FiTrendingUp className="text-blue-500" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Rejections",
      value: "5",
      change: "+10%",
      icon: <FiXCircle className="text-red-500" />,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      title: "Offers received",
      value: "3",
      change: "+10%",
      icon: <FiCheckCircle className="text-green-500" />,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Success Rate",
      value: "3.0%",
      change: "+10%",
      icon: <FiPercent className="text-purple-500" />,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, Kent!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {`          Here's what's happening with your job search today.
`}{" "}
        </p>
      </div>

      {/* Application Overview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Application Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} p-4 rounded-xl border border-gray-200 dark:border-gray-800`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {stat.title}
                </h3>
                {stat.icon}
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div
                  className={`text-sm font-medium ${stat.color} flex items-center mt-1`}
                >
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Auto-Apply
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Manage your AI job application bots
                </p>
                <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700">
                  Get Started →
                </button>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Create Resume
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Get AI-powered suggestions, or optimize already existing one.
                </p>
                <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700">
                  Create →
                </button>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Interview Prep
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Practice with AI-powered interview simulations
                </p>
                <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700">
                  Practice →
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recommended for you
              </h2>
              <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700">
                See all →
              </button>
            </div>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm rounded-full">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-sm rounded-full">
                        {job.level}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-sm rounded-full">
                        {job.remote}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.posted}</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Watch Demo & Interview Prep */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl text-white">
            <h3 className="font-bold text-xl mb-3">Watch 1 min demo</h3>
            <p className="text-blue-100 mb-4">
              See how wizbot helps you Auto-apply to jobs on your behalf.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>1 Min - non technical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>1 Min - technical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>1 Min - non technical</span>
              </div>
            </div>
            <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Watch Now
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-3">
              Prepare for Interview
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Set up with relevant information such as profile picture, phone
              number etc.
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors">
              Take a Section
            </button>
          </div>

          {/* Account Setup Progress */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
              Complete your profile
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Profile Setup
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimize your resume
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg font-medium">
                  {`                  Let's go
`}{" "}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Create Wizbot
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Auto-apply to matching jobs
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
