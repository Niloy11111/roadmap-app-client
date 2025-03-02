import { ShoppingBagIcon } from "lucide-react";
import { Badge } from "../../../reusable/badge";
import { Button } from "../../../reusable/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../reusable/sheet";

export const SidebarFilter = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="relative">
          <ShoppingBagIcon className="h-6 w-6" />
          <Badge className="absolute right-0 top-0  text-white rounded-full text-xs p-1"></Badge>
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        <SheetFooter className="border-t pt-4">
          <SheetClose asChild>
            <Button className="w-full">Place Order</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
