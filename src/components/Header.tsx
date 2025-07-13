import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">予約システム</h1>
        <div>
          {/* User profile, notifications, etc. can go here */}
          <span className="text-gray-600">ユーザー名</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
