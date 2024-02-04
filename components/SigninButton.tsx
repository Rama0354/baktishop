import Link from "next/link";
import Image from "next/image";
import AuthenticationhButton from "./AuthenticationButton";
import { getProfie } from "@/lib/utils/action/profileAction";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { MdPerson } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineUser } from "react-icons/ai";
import { Button } from "./ui/button";

const SigninButton = async () => {
  const session = await getServerSession(options);
  const userData = session && (await getProfie());
  return (
    <div className="flex relative">
      {userData ? (
        userData.profile && (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <Avatar>
                {userData.profile.avatar_url !== null ? (
                  <AvatarImage
                    src={userData.profile.avatar_url}
                    alt={userData.username}
                  />
                ) : (
                  <AvatarFallback>
                    {userData.profile.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full min-w-56">
              <DropdownMenuLabel className="flex gap-3">
                <Avatar>
                  {userData.profile.avatar_url !== null ? (
                    <AvatarImage
                      src={userData.profile.avatar_url}
                      alt={userData.username}
                    />
                  ) : (
                    <AvatarFallback>
                      {userData.profile.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">
                    {userData.profile.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Link className="w-full" href={"/users"}>
                  Transaction
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="w-full" href={"/users/wishlist"}>
                  Wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="w-full" href={"/users/address"}>
                  Address
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="w-full" href={"/users/account"}>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <AuthenticationhButton type="logout" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      ) : (
        <AuthenticationhButton type="" />
      )}
    </div>
  );
};

export default SigninButton;
