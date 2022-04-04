import { SITE_TITLE } from "constants/constants";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center bg-blue-600 text-white py-4 px-4">
      <h2 className="text-lg">
        <Link href="/">
          <a>{SITE_TITLE}</a>
        </Link>
      </h2>
      <nav>
        <ul className="flex">
          <NavLink href="/">Login</NavLink>
          <NavLink href="/">Signup</NavLink>
        </ul>
      </nav>
    </header>
  );
};

const NavLink: React.FC<{ href: string; children: string }> = ({
  href,
  children,
}) => (
  <li className="ml-8">
    <Link href={href}>
      <a>{children}</a>
    </Link>
  </li>
);

export default Navbar;
