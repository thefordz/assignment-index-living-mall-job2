import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center h-full w-full">
      <div className="flex gap-3 items-center">
        <Loader2 className="animate-spin" />
        Loading...
      </div>
    </div>
  );
}
