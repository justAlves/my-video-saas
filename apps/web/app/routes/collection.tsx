import Component from "@/components/comp-570"
import type { Route } from "./+types/collection"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Collection({ params }: Readonly<Route.ComponentProps>) {
  return (
    <div className="space-y-6 px-8 py-8 md:py-32">
      <div className="flex gap-32">
        <Component/>
        <div className="w-full">
          <h1 className="text-xl font-bold">My Uploads</h1>
          <Table className="mt-8">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded At</TableHead>
                <TableHead>Uploaded By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>My Uploaded Video</TableCell>
                <TableCell>30:00</TableCell>
                <TableCell>5Gb</TableCell>
                <TableCell>3 days ago</TableCell>
                <TableCell>Guilherme Alves</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
