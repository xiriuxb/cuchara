import Link from "next/link";

export default function SideBar() {
  return (
    <nav className="bg-amber-200 px-4">
      <Link href={"/"}>Cuchara</Link>
      <ul className="text-xl font-bold">
        {NAV_ITEMS.map((item) => {
          return (
            <li key={item.name} className="hover:bg-amber-100 flex  rounded-md">
              <Link href={item.link} className="w-full h-full px-3 py-2">{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type NavItem = {
  name: string;
  link: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    link: "/home",
    icon: "",
  },
  {
    name: "Posts",
    link: "/posts",
    icon: "",
  },
  {
    name: "Search",
    link: "/search",
    icon: "",
  },
  {
    name: "Bookmark",
    link: "/bookmark",
    icon: "",
  },
  {
    name: "Favorites",
    link: "/favorites",
    icon: "",
  },
  {
    name: "Profile",
    link: "/profile",
    icon: "",
  },
];
