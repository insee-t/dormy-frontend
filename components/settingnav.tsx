import { useState } from "react"; //  Added useState for mobile menu
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DormyIcon from "../../public/assets/DormyLogo-white.png";
import UserImg from "../../public/assets/userImg.png";
// import Bars from '../../public/assets/bars.png';
import { Menu as MenuIcon } from "lucide-react"; // Alias Menu icon as MenuIcon

const navigation = [
  { name: "ข้อมูลหอพัก", href: "buildingdatasetting" },
  { name: "บิล", href: "form" },
  { name: "ค่าน้ำ - ค่าไฟ", href: "billing" },
  { name: "ค่าเช่าห้อง", href: "rent" },
  { name: "ค่าบริการ", href: "services" },
  { name: "ค่าปรับ", href: "#" },
  { name: "บัญชีธนาคาร", href: "bank" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingNav() {
  const [isOpen, setIsOpen] = useState(false); //  Added mobile menu state

  return (
      <div className="flex flex-wrap lg:flex-row ">
        {navigation.map((item) => (
          <div className="bg-custom-what mr-1 mb-3 -mt-2 sm:mr-2 rounded-md text-nowrap  active:bg-custom-is hover:bg-custom-is shadow-sm ">
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-base font-medium text-white-500 "
            >
              {item.name}
            </a>
          </div>
        ))}
    </div>
  );
}