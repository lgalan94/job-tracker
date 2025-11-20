import React from "react";
import { PlusIcon } from "./icons/PlusIcon";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const Header = ({ user, onAddNew, onLogout }) => {
  return (
    <header className="bg-gray-900 text-gray-100 px-4 sm:px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-600">
          Job Application Tracker
        </h1>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Avatar */}
          {user && (
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full shadow hover:shadow-lg transition-all">
              <Avatar className="w-8 h-8">
                {user.picture ? (
                  <AvatarImage src={user.picture} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                )}
              </Avatar>
              <span className="font-medium">{user.name}</span>
            </div>
          )}

          {/* Add New Button */}
          <Button
            onClick={onAddNew}
            className="flex items-center gap-2 rounded-2xl hover:scale-110"
            variant="secondary"
          >
            <PlusIcon />
            Add New
          </Button>

          {/* Logout Icon Button */}
          {user && (
            <Button
              variant="ghost"
              onClick={onLogout}
              className="p-2 hover:bg-red-600 hover:text-white hover:scale-110 transition-colors"
            >
              <LogOut size={18} />
            </Button>
          )}
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex items-center gap-2">
          <Button onClick={onAddNew} size="sm" className="flex items-center gap-1">
            <PlusIcon />
            Add
          </Button>

          {/* Logout Icon Button */}
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="p-2 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut size={16} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
