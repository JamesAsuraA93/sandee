import UserManagement from "@/components/admin/UserManagement";
import Dashboard from "@/components/common/layout/Dashboard";
import Provider from "@/components/common/layout/Provider";
import React from "react";

export default function UserManagementHome() {
  return (
    <Provider>
      <Dashboard topic="User Manangment">
        <UserManagement />
      </Dashboard>
    </Provider>
  );
}
