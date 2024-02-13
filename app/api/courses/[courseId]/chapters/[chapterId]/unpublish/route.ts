import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const isOwner = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const checkChapter = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (checkChapter.length === 0) {
      await db.course.update({
        where: { id: params.courseId, userId },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("Publish Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
