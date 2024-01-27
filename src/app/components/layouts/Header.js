import Link  from "next/link";
export default function Header() {
    return(
        <header className=" flex items-center justify-between">
        <Link className="text-red-500 font-semibold text-2xl" href="">Scan Easy</Link>
        <nav className="flex  items-center gap-8 text-gray-400 font-semibold">
          <Link href="">Home</Link>
          <Link href="">Menu</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
          <Link href="" className="bg-red-500 rounded-full text-white px-6 py-2">Login</Link>
        </nav>
        </header>
    );
}