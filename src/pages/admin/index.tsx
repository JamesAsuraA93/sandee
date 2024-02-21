import Overview from "@/components/admin/Overview";
import Dashboard from "@/components/common/layout/Dashboard";
import Provider from "@/components/common/layout/Provider";
import React from "react";

export default function AdminHome() {
  return (
    <Provider>
      <Dashboard topic="Overview">
        <Overview />
      </Dashboard>
    </Provider>
  );
}
