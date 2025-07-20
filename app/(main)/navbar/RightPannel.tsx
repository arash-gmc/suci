import DarkModeToggler from "@/app/_components/DarkModeToggler";
import Logo from "@/app/_components/Logo";
import ProfilePicture from "@/app/_components/ProfilePicture";
import Search from "@/app/_components/Search";
import { Flex, Link } from "@radix-ui/themes";
import router from "next/router";
import { useRouter } from "next/navigation";
import MessageMenu from "../messages/MessageMenue";
import NotificationsMenu from "../notifications/NotificationMenu";
import UserMenu from "./UserMenu";
import { ViewerContext } from "../../_providers/ViewerContext";
import { useContext, useState } from "react";
import useTheme from "next-theme";

const RightPannel = () => {
  const { viewer } = useContext(ViewerContext);
  const [userMenu, setUserMenu] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Flex gap="5" align="center">
      <Search
        onUserClick={(user) => router.push("/profile/" + user.username)}
        searchPosts={true}
      />
      {viewer && <NotificationsMenu userId={viewer.id} />}
      {viewer && <MessageMenu userId={viewer.id} />}

      <DarkModeToggler />

      {viewer && (
        <Flex
          onClick={() => setUserMenu((prev) => !prev)}
          className="relative cursor-pointer"
        >
          <ProfilePicture size="sm" user={viewer} />

          {userMenu ? <UserMenu /> : null}
        </Flex>
      )}
      {viewer === null && (
        <Flex align="center" gap="5">
          <Link href="/register" className="font-bold text-inherit">
            Register
          </Link>
          <Link href="/api/auth/signin" className="font-bold text-inherit">
            LogIn
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default RightPannel;
