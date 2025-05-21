"use client";

import React from "react";
import { Avatar, Button, ScrollShadow, Spacer, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { AcmeIcon } from "./acme";
import { sectionItemsWithTeams } from "./sidebar-items";
import Sidebar from "./sidebar";

export default function Component({ children, title = "Overview" }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isCompact = isCollapsed || isMobile;
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const userName = session?.user?.name || "Unknown User";
  const userImage = session?.user?.image;

  return (
    <div className="flex w-full h-screen">
      <div
        className={cn(
          "fixed left-0 top-0 h-screen flex-col !border-r-small border-divider p-6 transition-width bg-white-500",
          {
            "w-72": !isCompact,
            "w-16 items-center px-2 py-6": isCompact,
          },
        )}
      >
        <div
          className={cn("flex items-center justify-center px-3 ", {
            "px-2": isCompact,
          })}
        >
          <img
            src="../../assets/Logo.png"
            alt="Dormy"
            className={cn("h-18 w-auto transition-all duration-200", {
              "w-8 h-8 object-contain": isCompact,
            })}
          />
        </div>

        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar
            defaultSelectedKey="home"
            isCompact={isCompact}
            items={sectionItemsWithTeams}
          />
        </ScrollShadow>

        <Spacer y={2} />

        <div
          className={cn("mt-auto flex flex-col ", {
            "items-center": isCompact,
          })}
        >
          <Tooltip
            content="Help & Feedback"
            isDisabled={!isCompact}
            placement="right"
          >
            <Button
              fullWidth
              className={cn(
                "justify-start truncate text-default-500 data-[hover=true]:text-foreground ",
                {
                  "justify-center": isCompact,
                },
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="flex-none text-default-500 bg"
                    icon="solar:info-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCompact ? (
                <Icon
                  className="text-default-500"
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              ) : (
                "Help & Information"
              )}
            </Button>
          </Tooltip>
          <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
            <Button
              className={cn(
                "justify-start text-default-500 data-[hover=true]:text-foreground",
                {
                  "justify-center": isCompact,
                },
              )}
              isIconOnly={isCompact}
              onPress={handleLogout}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="flex-none rotate-180 text-default-500"
                    icon="solar:minus-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCompact ? (
                <Icon
                  className="rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              ) : (
                "Log Out"
              )}
            </Button>
          </Tooltip>
        </div>
      </div>

      <div
        className={cn("flex-1 min-h-screen bg-[#dbe1f0] ", {
          "ml-72": !isCompact,
          "ml-16": isCompact,
        })}
      >
        <header className="sticky top-0 z-10  flex items-center justify-between rounded-medium border-small border-divider p-4 m-4 bg-white-500 shadow-sm">
          <div className="flex items-center gap-3">
            <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
              <Icon
                className="text-default-500"
                height={24}
                icon="solar:sidebar-minimalistic-outline"
                width={24}
                color="#01BCB4"
              />
            </Button>
            <h2 className="text-medium font-medium text-black-500 hidden sm:block">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center">
              <Icon
                className="text-blue-500 mr-2"
                icon="solar:clock-circle-outline"
                width={20}
                color="white"
              />
              <span className="text-sm text-black-500 hidden sm:block">
                แพ็คเกจเหลือ 29 วัน
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium">{userName}</div>
              </div>
              <Avatar
                src={userImage}
                name={userName}
                className="cursor-pointer"
                onClick={() => router.push("/profile")}
              />
            </div>
          </div>
        </header>

        <main className="p-4 bg-[#dbe1f0]">{children}</main>
      </div>
    </div>
  );
}
