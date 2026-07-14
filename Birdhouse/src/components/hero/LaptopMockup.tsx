import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Activity,
  Settings,
  Bell,
  Search } from
'lucide-react';
export function LaptopMockup() {
  return (
    <motion.div
      className="relative w-full max-w-[800px] mx-auto z-10"
      initial={{
        opacity: 0,
        y: 50
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }}>
      
      {/* Floating Glass Panels */}
      <motion.div
        className="absolute -left-12 top-20 glass-panel rounded-xl p-4 z-20 flex items-center gap-3"
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}>
        
        <div className="w-10 h-10 rounded-full bg-brand-greenLight flex items-center justify-center">
          <Activity className="w-5 h-5 text-brand-green" />
        </div>
        <div>
          <div className="text-xs text-text-secondary">Conversion</div>
          <div className="font-bold text-text-primary">+24.8%</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-8 bottom-32 glass-panel rounded-xl p-4 z-20"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-brand-green" />
          <span className="text-xs font-medium">System Status</span>
        </div>
        <div className="text-sm text-text-secondary">
          All services operational
        </div>
      </motion.div>

      {/* Laptop Frame */}
      <div className="relative rounded-t-3xl bg-gray-800 p-2 shadow-2xl border-b-4 border-gray-900">
        {/* Screen */}
        <div className="relative rounded-t-2xl overflow-hidden bg-surface-primary aspect-[16/10] border border-gray-700">
          {/* Bespoke UI Inside */}
          <div className="absolute inset-0 flex flex-col bg-surface-secondary">
            {/* Top Bar */}
            <div className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex items-center gap-4 text-text-tertiary">
                <Search className="w-4 h-4" />
                <Bell className="w-4 h-4" />
                <div className="w-6 h-6 rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-48 bg-white border-r border-gray-100 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-brand-greenLight text-brand-greenDark font-medium text-sm">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg text-text-secondary hover:bg-surface-secondary text-sm">
                  <Users className="w-4 h-4" /> Users
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg text-text-secondary hover:bg-surface-secondary text-sm">
                  <Activity className="w-4 h-4" /> Analytics
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg text-text-secondary hover:bg-surface-secondary text-sm mt-auto">
                  <Settings className="w-4 h-4" /> Settings
                </div>
              </div>

              {/* Dashboard Area */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 h-24 flex flex-col justify-between">
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 h-24 flex flex-col justify-between">
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 h-24 flex flex-col justify-between">
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex-1 h-48">
                  <div className="h-full w-full bg-surface-secondary rounded-lg flex items-end p-4 gap-2">
                    {[40, 70, 45, 90, 65, 80, 50, 100, 75].map((h, i) =>
                    <div
                      key={i}
                      className="flex-1 bg-brand-greenLight rounded-t-sm"
                      style={{
                        height: `${h}%`
                      }} />

                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glass Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
        </div>
      </div>

      {/* Laptop Base */}
      <div className="relative h-4 bg-gray-300 rounded-b-xl mx-[-10px] shadow-xl flex justify-center">
        <div className="w-32 h-2 bg-gray-400 rounded-b-md" />
      </div>
    </motion.div>);

}