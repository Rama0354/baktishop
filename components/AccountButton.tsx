import Link from "next/link";
import AuthenticationhButton from "./AuthenticationButton";
import { getProfie } from "@/lib/utils/action/profileAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";

const AccountButton = async () => {
  const session = await auth();
  const userData = session && (await getProfie());
  return (
    <div className="flex relative">
      {userData ? (
        userData.profile && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-full">
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
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full min-w-56">
              <DropdownMenuLabel>
                <div className="flex gap-3">
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
              <AuthenticationhButton type="logout" />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      ) : (
        <AuthenticationhButton type="" />
      )}
    </div>
  );
};

export default AccountButton;
