import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: true,
      },
    });

    const isPublishedChapter = course?.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course ||
      !isPublishedChapter ||
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !course.price
    ) {
      return new NextResponse("Requirements are not complete", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("Publish Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
