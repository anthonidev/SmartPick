import { Session } from "next-auth/core/types";
import ButtonSidebar from "../client/button-sidebar";
import SearchBar from "../client/search-bar";
import UserDrop from "../client/user-drop";

type Props = {
  session: Session | null;
};

const Navbar = ({ session }: Props) => {
  return (
    <div className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 rounded-lg bg-white dark:bg-osc-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <ButtonSidebar />

      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex justify-between w-full gap-x-4 self-stretch lg:gap-x-6">
        <SearchBar />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            aria-hidden="true"
          />

          <UserDrop session={session} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
