import React, { useState } from "react";
import { PlusIcon } from "./icons/PlusIcon";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut, Menu as MenuIcon, X as XIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetOverlay,
  SheetTitle,
  SheetDescription
} from "./ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const Header = ({ user, onAddNew, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-gray-100 px-4 sm:px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-600">
          <span className="sm:hidden">Job Tracker</span>
          <span className="hidden sm:inline">Job Application Tracker</span>
        </h1>

        {/* Desktop: Right-aligned items */}
        <div className="hidden sm:flex items-center gap-4 ml-auto">
          {user && (
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full shadow hover:shadow-lg transition-all">
              <Avatar className="w-8 h-8">
                {user.picture ? (
                  <AvatarImage src={user.picture || "./avatar.png"} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                )}
              </Avatar>
              <span className="font-medium">{user.name}</span>
            </div>
          )}

          <Button
            onClick={onAddNew}
            className="flex items-center gap-2 rounded-2xl px-4 py-2 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all text-white bg-gray-700 font-semibold"
            variant="secondary"
          >
            <PlusIcon />
            Add New
          </Button>

          {user && (
            <Button
              variant="ghost"
              onClick={() => onLogout("You have successfully logged out")}
              className="p-2 hover:bg-red-600 hover:text-white hover:scale-110 transition-colors"
            >
              <LogOut size={18} />
            </Button>
          )}
        </div>

        {/* Mobile Hamburger + Sheet */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTitle>
            <VisuallyHidden>Mobile menu</VisuallyHidden>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden>
              Contains profile, add new job, and logout options
            </VisuallyHidden>
          </SheetDescription>

          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="sm:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </Button>
          </SheetTrigger>

          <SheetOverlay className="backdrop-blur-sm bg-black/50" />

          <SheetContent
            side="left"
            className="w-64 bg-gray-900 p-6 gap-6 flex flex-col border-none"
          >
            {/* Profile */}
            {user && (
              <div className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-lg shadow">
                <Avatar className="w-10 h-10">
                  {user.picture ? (
                    <AvatarImage src={user.picture || "./avatar.png"} alt={user.name} />
                  ) : (
                    <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                  )}
                </Avatar>
                <span className="font-medium text-amber-50">{user.name}</span>
              </div>
            )}

            {/* Add New */}
            <Button
              onClick={onAddNew}
              className="flex items-center gap-2 rounded-lg px-4 py-2 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all text-white bg-gray-700 font-semibold"
              variant="secondary"
            >
              <PlusIcon />
              Add New
            </Button>

            {/* Logout */}
            {user && (
              <Button
                onClick={() => onLogout("You have successfully logged out")}
                className="flex items-center gap-2 rounded-lg w-full justify-start hover:bg-red-600 hover:text-white text-amber-50"
                variant="ghost"
              >
                <LogOut />
                Logout
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
