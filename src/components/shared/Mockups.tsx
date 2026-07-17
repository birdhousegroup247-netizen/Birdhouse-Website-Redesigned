import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  PieChart,
  Users,
  ArrowUpRight,
  CreditCard,
  LayoutDashboard,
  Settings,
  Bell,
  Search } from
'lucide-react';
export const DesktopMockup = ({
  className = '',
  children,
  type = 'dashboard'




}: {className?: string;children?: React.ReactNode;type?: 'dashboard' | 'marketing';}) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-white shadow-soft border border-surface-200 flex flex-col ${className}`}>
      
      {/* macOS Window Header */}
      <div className="h-10 bg-surface-50 border-b border-surface-200 flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        <div className="mx-auto h-5 w-48 bg-white rounded-md border border-surface-200 flex items-center px-2">
          <Search className="w-3 h-3 text-surface-300" />
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 flex overflow-hidden bg-surface-50">
        {type === 'dashboard' ?
        <>
            {/* Sidebar */}
            <div className="w-48 bg-white border-r border-surface-200 p-4 flex flex-col gap-4 shrink-0">
              <div className="h-6 w-24 bg-surface-200 rounded mb-4"></div>
              {[LayoutDashboard, Users, CreditCard, Activity, Settings].map(
              (Icon, i) =>
              <div
                key={i}
                className={`flex items-center gap-3 p-2 rounded-lg ${i === 0 ? 'bg-emerald-50 text-emerald-600' : 'text-surface-400'}`}>
                
                    <Icon className="w-4 h-4" />
                    <div
                  className={`h-2.5 rounded w-16 ${i === 0 ? 'bg-emerald-200' : 'bg-surface-200'}`}>
                </div>
                  </div>

            )}
            </div>
            {/* Main Content */}
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
              <div className="flex justify-between items-end">
                <div>
                  <div className="h-4 w-32 bg-surface-200 rounded mb-2"></div>
                  <div className="h-8 w-48 bg-surface-800 rounded"></div>
                </div>
                <div className="h-8 w-24 bg-emerald-500 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) =>
              <div
                key={i}
                className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                
                    <div className="h-3 w-20 bg-surface-200 rounded mb-3"></div>
                    <div className="h-6 w-24 bg-surface-800 rounded mb-2"></div>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                      <div className="h-2 w-12 bg-emerald-100 rounded"></div>
                    </div>
                  </div>
              )}
              </div>
              <div className="flex-1 bg-white rounded-xl border border-surface-200 shadow-sm p-4 flex flex-col">
                <div className="h-4 w-32 bg-surface-200 rounded mb-6"></div>
                <div className="flex-1 flex items-end gap-2">
                  {[40, 70, 45, 90, 65, 85, 55, 100, 75, 60].map((h, i) =>
                <div
                  key={i}
                  className="flex-1 bg-emerald-100 rounded-t-sm"
                  style={{
                    height: `${h}%`
                  }}>
                  
                      <div
                    className="w-full bg-emerald-500 rounded-t-sm"
                    style={{
                      height: `${h * 0.6}%`
                    }}>
                  </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          </> :

        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            {/* Marketing Site Mockup */}
            <div className="h-14 border-b border-surface-100 flex items-center justify-between px-8">
              <div className="h-5 w-24 bg-surface-800 rounded"></div>
              <div className="flex gap-6">
                {[1, 2, 3, 4].map((i) =>
              <div
                key={i}
                className="h-3 w-16 bg-surface-200 rounded">
              </div>
              )}
              </div>
              <div className="h-8 w-24 bg-surface-900 rounded-full"></div>
            </div>
            <div className="flex-1 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-50"></div>
              <div className="h-4 w-32 bg-emerald-100 rounded-full mb-6"></div>
              <div className="h-12 w-[400px] bg-surface-900 rounded-lg mb-4"></div>
              <div className="h-12 w-[300px] bg-surface-900 rounded-lg mb-6"></div>
              <div className="h-4 w-[500px] bg-surface-300 rounded mb-2"></div>
              <div className="h-4 w-[400px] bg-surface-300 rounded mb-8"></div>
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-emerald-500 rounded-full"></div>
                <div className="h-12 w-32 bg-white border border-surface-200 rounded-full"></div>
              </div>
            </div>
          </div>
        }
        {children}
      </div>
    </div>);

};
export const MobileMockup = ({
  className = '',
  type = 'app'



}: {className?: string;type?: 'app' | 'marketing';}) => {
  return (
    <div
      className={`relative rounded-[2.5rem] overflow-hidden bg-white shadow-soft border-[6px] border-surface-900 flex flex-col ${className}`}>
      
      {/* Dynamic Island / Notch area */}
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
        <div className="w-24 h-5 bg-surface-900 rounded-b-xl"></div>
      </div>

      <div className="flex-1 bg-surface-50 pt-10 flex flex-col overflow-hidden">
        {type === 'app' ?
        <>
            <div className="px-5 pb-4 flex justify-between items-center bg-white border-b border-surface-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-200"></div>
                <div>
                  <div className="h-2 w-12 bg-surface-300 rounded mb-1.5"></div>
                  <div className="h-3 w-20 bg-surface-800 rounded"></div>
                </div>
              </div>
              <Bell className="w-5 h-5 text-surface-400" />
            </div>
            <div className="p-5 flex flex-col gap-4 overflow-hidden">
              <div className="bg-emerald-500 rounded-2xl p-5 text-white shadow-md">
                <div className="h-2 w-16 bg-emerald-300/50 rounded mb-2"></div>
                <div className="h-6 w-32 bg-white rounded mb-6"></div>
                <div className="flex justify-between items-end">
                  <div className="h-3 w-24 bg-emerald-300/50 rounded"></div>
                  <div className="w-8 h-5 bg-white/20 rounded"></div>
                </div>
              </div>
              <div className="flex gap-3">
                {[1, 2].map((i) =>
              <div
                key={i}
                className="flex-1 bg-white p-4 rounded-xl border border-surface-200">
                
                    <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                      {i === 1 ?
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" /> :

                  <Activity className="w-4 h-4 text-emerald-500" />
                  }
                    </div>
                    <div className="h-2 w-12 bg-surface-300 rounded mb-1.5"></div>
                    <div className="h-4 w-16 bg-surface-800 rounded"></div>
                  </div>
              )}
              </div>
              <div className="bg-white rounded-xl border border-surface-200 p-4 flex-1">
                <div className="h-3 w-24 bg-surface-800 rounded mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) =>
                <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-100"></div>
                        <div>
                          <div className="h-2.5 w-20 bg-surface-800 rounded mb-1"></div>
                          <div className="h-2 w-12 bg-surface-300 rounded"></div>
                        </div>
                      </div>
                      <div className="h-2.5 w-12 bg-surface-800 rounded"></div>
                    </div>
                )}
                </div>
              </div>
            </div>
            {/* Bottom Nav */}
            <div className="h-16 bg-white border-t border-surface-200 flex justify-around items-center px-4 pb-2">
              {[LayoutDashboard, PieChart, CreditCard, Settings].map(
              (Icon, i) =>
              <Icon
                key={i}
                className={`w-5 h-5 ${i === 0 ? 'text-emerald-500' : 'text-surface-300'}`} />


            )}
            </div>
          </> :

        <div className="flex-1 bg-white flex flex-col">
            <div className="h-12 border-b border-surface-100 flex items-center justify-between px-5">
              <div className="h-4 w-20 bg-surface-800 rounded"></div>
              <div className="w-6 h-4 flex flex-col justify-between">
                <div className="w-full h-0.5 bg-surface-800 rounded"></div>
                <div className="w-full h-0.5 bg-surface-800 rounded"></div>
                <div className="w-2/3 h-0.5 bg-surface-800 rounded"></div>
              </div>
            </div>
            <div className="p-6 flex flex-col items-center text-center mt-4">
              <div className="h-3 w-20 bg-emerald-100 rounded-full mb-4"></div>
              <div className="h-6 w-48 bg-surface-900 rounded-lg mb-3"></div>
              <div className="h-6 w-32 bg-surface-900 rounded-lg mb-4"></div>
              <div className="h-2 w-full bg-surface-300 rounded mb-2"></div>
              <div className="h-2 w-4/5 bg-surface-300 rounded mb-6"></div>
              <div className="h-10 w-full bg-emerald-500 rounded-full mb-8"></div>

              <div className="w-full aspect-square bg-surface-50 rounded-2xl border border-surface-100 p-4">
                <div className="w-full h-full bg-surface-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

};
export const TabletMockup = ({
  className = '',
  type = 'dashboard'



}: {className?: string;type?: 'dashboard' | 'marketing';}) => {
  return (
    <div
      className={`relative rounded-[2rem] overflow-hidden bg-white shadow-soft border-[8px] border-surface-900 flex flex-col ${className}`}>
      
      <div className="flex-1 bg-surface-50 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-16 bg-white border-r border-surface-200 py-6 flex flex-col items-center gap-6 shrink-0">
          <div className="w-8 h-8 bg-surface-800 rounded-lg mb-4"></div>
          {[LayoutDashboard, Users, CreditCard, Activity, Settings].map(
            (Icon, i) =>
            <div
              key={i}
              className={`p-2 rounded-lg ${i === 0 ? 'bg-emerald-50 text-emerald-600' : 'text-surface-400'}`}>
              
                <Icon className="w-5 h-5" />
              </div>

          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-surface-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-100"></div>
              <div>
                <div className="h-3 w-32 bg-surface-800 rounded mb-1.5"></div>
                <div className="h-2 w-20 bg-surface-400 rounded"></div>
              </div>
            </div>
            <div className="h-8 w-24 bg-emerald-500 rounded-lg"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-surface-200 h-40 flex flex-col justify-between">
              <div className="h-3 w-24 bg-surface-300 rounded"></div>
              <div>
                <div className="h-8 w-32 bg-surface-800 rounded mb-2"></div>
                <div className="h-2 w-16 bg-emerald-200 rounded"></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-surface-200 h-40 flex flex-col justify-between">
              <div className="h-3 w-24 bg-surface-300 rounded"></div>
              <div className="flex items-end gap-2 h-16">
                {[30, 50, 40, 70, 60, 90, 80].map((h, i) =>
                <div
                  key={i}
                  className="flex-1 bg-emerald-500 rounded-t-sm"
                  style={{
                    height: `${h}%`
                  }}>
                </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-xl border border-surface-200 p-5">
            <div className="h-3 w-32 bg-surface-800 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) =>
              <div
                key={i}
                className="flex items-center justify-between border-b border-surface-100 pb-4 last:border-0 last:pb-0">
                
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-100"></div>
                    <div>
                      <div className="h-2.5 w-32 bg-surface-800 rounded mb-1.5"></div>
                      <div className="h-2 w-20 bg-surface-400 rounded"></div>
                    </div>
                  </div>
                  <div className="h-2.5 w-16 bg-surface-800 rounded"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

};