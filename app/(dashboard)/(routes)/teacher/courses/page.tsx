import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { columns } from "./_component/columns";
import { DataTable } from "./_component/data-table";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CoursePage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button className="text-white">New Course</Button>
      </Link> */}

      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursePage;
