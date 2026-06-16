'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Role } from './types';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentUser: { name: string; flat: string; role: Role };
}

const ROLE_USERS: Record<Role, { name: string; flat: string; role: Role }> = {
  super_admin: { name: 'Rajesh Kumar (President)', flat: 'A-101', role: 'super_admin' },
  committee_admin: { name: 'Suresh Babu (Secretary)', flat: 'A-202', role: 'committee_admin' },
  resident: { name: 'Priya Sharma', flat: 'A-102', role: 'resident' },
  security_staff: { name: 'Ramaiah (Security Head)', flat: 'Staff', role: 'security_staff' },
};

const RoleContext = createContext<RoleContextType>({
  role: 'resident',
  setRole: () => {},
  currentUser: ROLE_USERS.resident,
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>('resident');

  useEffect(() => {
    const stored = localStorage.getItem('ft_role') as Role | null;
    if (stored && ROLE_USERS[stored]) setRoleState(stored);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    localStorage.setItem('ft_role', r);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, currentUser: ROLE_USERS[role] }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);

export const canManageFinance = (role: Role) => role === 'super_admin' || role === 'committee_admin';
export const canManageMembers = (role: Role) => role === 'super_admin' || role === 'committee_admin';
export const canPublishNotices = (role: Role) => role === 'super_admin' || role === 'committee_admin';
export const canManageEvents = (role: Role) => role === 'super_admin' || role === 'committee_admin';
export const canUpdateComplaintStatus = (role: Role) => role === 'super_admin' || role === 'security_staff' || role === 'committee_admin';
export const canPost = (role: Role) => role !== 'security_staff';
export const isAdmin = (role: Role) => role === 'super_admin' || role === 'committee_admin';
