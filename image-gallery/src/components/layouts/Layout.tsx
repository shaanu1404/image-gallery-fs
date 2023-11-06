import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../common/Header";

export const Layout: React.FC<{}> = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50 font-body">
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <Header title="My Lobely Gallery" />
        <Outlet />
      </div>
    </main>
  );
};
