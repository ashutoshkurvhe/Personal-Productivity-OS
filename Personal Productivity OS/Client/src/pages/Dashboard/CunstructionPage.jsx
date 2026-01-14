import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import {
  Rocket,
  Sparkles,
  ArrowLeft,
  Wrench,
  HardHat,
  Hammer,
  Home,
  Zap,
  Code2,
  Cpu,
  ArrowRight,
  Sprout,
  Sun,
  Droplets,
  ChevronLeft,
  Orbit,
  Star,
  Telescope,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const CunstructionPage = () => {
  return (
    <DashboardLayout activeMenu="/project">
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-3xl w-full relative z-10">
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center">
              <Orbit
                className="w-48 h-48 text-purple-400 animate-spin"
                style={{ animationDuration: "20s" }}
                strokeWidth={1}
              />
              <div className="absolute">
                <Telescope
                  className="w-24 h-24 text-blue-300"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" />
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                Launching Soon
              </h1>
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" />
            </div>

            <p className="text-2xl text-purple-200 text-center mb-8">
              Our mission is in preparation phase
            </p>

            <div className="bg-black/30 rounded-2xl p-6 mb-8 border border-purple-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Design Phase
                    </h3>
                    <p className="text-purple-200 text-sm">
                      Creating stellar experiences
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Orbit className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Development
                    </h3>
                    <p className="text-purple-200 text-sm">Building in orbit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                    <Telescope className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Testing</h3>
                    <p className="text-purple-200 text-sm">
                      Exploring all possibilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Launch Prep
                    </h3>
                    <p className="text-purple-200 text-sm">Final countdown</p>
                  </div>
                </div>
              </div>

              <p className="text-purple-100 text-center leading-relaxed">
                We're exploring new frontiers and building something out of this
                world. This page is currently under construction as we prepare
                for an amazing launch. Stay tuned for liftoff!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink
                to="/ "
                className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Return to Base
              </NavLink>
              <button className="flex-1 border-2 border-purple-400 text-purple-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-500/20 transition-all duration-300">
                Get Notified
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-purple-300 text-sm font-mono animate-pulse">
              ✨ MISSION STATUS: IN PROGRESS ✨
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CunstructionPage;
