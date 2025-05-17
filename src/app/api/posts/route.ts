import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const userProfileId = searchParams.get("user");
  const page = searchParams.get("cursor");
  const { userId } = await auth();
  const LIMIT = 3;

  if (!userId) return;

  const whereCondition =
    userProfileId !== "undefined"
      ? { parentPostId: null, userId: userProfileId as string }
      : {
          parentPostId: null,
          userId: {
            in: [
              userId,
              ...(
                await prisma.follow.findMany({
                  where: { followerId: userId },
                  select: { followingId: true },
                })
              ).map((follow) => follow.followingId),
            ],
          },
        };

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      user: { select: { displayName: true, img: true, username: true } },
      rePost: {
        include: {
          user: { select: { displayName: true, img: true, username: true } },
          _count: { select: { likes: true, rePosts: true, comments: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
        },
      },
      _count: { select: { likes: true, rePosts: true, comments: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
      saves: { where: { userId: userId }, select: { id: true } },
    },
    take: LIMIT,
    skip: (Number(page) - 1) * LIMIT,
  });

  const totalPosts = await prisma.post.count({ where: whereCondition });

  const hasMore = Number(page) * LIMIT < totalPosts;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return Response.json({ posts, hasMore });
}
