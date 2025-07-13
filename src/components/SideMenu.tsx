import React from 'react';
import Link from 'next/link';

const SideMenu = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 text-white">
      <div className="px-2 py-4">
        <h2 className="text-xl font-semibold">メニュー</h2>
      </div>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/reservations" className="block rounded p-2 hover:bg-gray-700">
              予約管理
            </Link>
          </li>
          <li className="mb-2">
            <a href="#" className="block rounded p-2 hover:bg-gray-700">
              ダミーメニュー1
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block rounded p-2 hover:bg-gray-700">
              ダミーメニュー2
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
