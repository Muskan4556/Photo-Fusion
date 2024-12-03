import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./ModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between gap-4 md:pr-8 px-6 pt-6 pb-4">
        <SidebarTrigger />
        <div className="text-xl md:text-2xl font-bold tracking-tight text-blue-600">
          Photo Fusion
        </div>
        <ModeToggle />
      </div>
      <Separator />
    </div>
  );
};

export default Header;
