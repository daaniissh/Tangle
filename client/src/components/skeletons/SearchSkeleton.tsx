import { Skeleton } from "@/components/ui/Skeleton"

export function SearchSkelton() {
  return (
    <div className="flex items-center p-4 mt-5 space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
