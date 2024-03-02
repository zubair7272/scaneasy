'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs({isAdmin}) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
        className={path === '/pages/Profile' ? 'active' : ''}
        href={'/pages/Profile'}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={'/pages/categories'}
            className={path === '/pages/categories' ? 'active' : ''}
          >
            Categories
          </Link>
          <Link
            href={'/pages/menu-items'}
            className={path.includes('/pages/menu-items') ? 'active' : ''}
          >
            Menu Items
          </Link>
          <Link
            className={path.includes('/pages/users') ? 'active' : ''}
            href={'/pages/users'}
          >
            Users
          </Link>
        </>
      )}
      <Link
        className={path === 'pages/orders' ? 'active' : ''}
        href={'/orders'}
      >
        Orders
      </Link>
    </div>
  );
}