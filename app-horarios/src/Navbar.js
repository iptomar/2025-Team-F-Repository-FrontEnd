import * as React from "react";
import {
  Button,
  IconButton,
  Typography,
  Collapse,
  Navbar,
} from "@material-tailwind/react";
import {
  Calendar,
  Users,
  Building,
  User,
  Menu,
  X,
} from "lucide-react";

const LINKS = [
  { icon: Calendar, title: "Horários", href: "#horarios" },
  { icon: Users, title: "Turmas", href: "#turmas" },
  { icon: Building, title: "Salas", href: "#salas" },
  { icon: User, title: "Professores", href: "#professores" },
];

function NavList() {
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ icon: Icon, title, href }) => (
        <li key={title}>
          <Typography
            as="a"
            href={href}
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 hover:text-blue-600"
          >
            <Icon className="h-4 w-4" />
            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
}

export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    });
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar className="sticky top-0 z-10 w-full max-w-screen-xl mx-auto px-4 py-2 rounded-lg border border-blue-gray-100 bg-white shadow-md">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <Typography
              as="a"
              href="/"
              variant="h6"
              className="mr-4 cursor-pointer py-1.5"
            >
              HClass
            </Typography>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <NavList />
            <Button size="sm" variant="filled" color="blue">
              Entrar
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <Button fullWidth variant="gradient" size="sm" className="mt-2">
            Entrar
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
}
