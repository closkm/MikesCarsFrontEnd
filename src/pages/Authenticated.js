import React from 'react';
import { signOut } from '../utils/auth';

export default function Authenticated({ user }) {
  return (
    <div className="text-center mt-5">
      <h1>Welcome, {user.displayName}!</h1>
      <div className="mt-2">
      
      </div>
    </div>
  );
}
