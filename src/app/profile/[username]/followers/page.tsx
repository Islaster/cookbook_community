import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FollowButton from "../FollowButton";
import BackButton from "@/components/shared/backButton";
import { User } from "@prisma/client";
import Image from "next/image";

type FollowersProps = {
  params: Promise<{
    username: string;
  }>;
};

const FollwersPage = async ({ params }: FollowersProps) => {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
    include: { followers: true },
  });

  if (!user) throw new Error("User not found");

  const followers = user.followers;
  const followerArr: (User | null)[] = await Promise.all(
    followers.map((follower) =>
      prisma.user.findUnique({
        where: { id: follower.followerId },
      })
    )
  );
  console.log(followerArr);

  return (
    <div className="max-w-2xl relative pt-12 mx-auto py-8 px-4">
      <BackButton />
      <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
        Followers
      </h2>
      {followerArr.length === 0 ? (
        <p className="text-gray-500 text-center">No followers yet.</p>
      ) : (
        <ul className="space-y-4">
          {followerArr.map((follower: User | null, idx: number) => (
            <li
              key={idx}
              className="flex flex-wrap items-center justify-between gap-2 sm:gap-4"
            >
              <Link
                href={`/profile/${follower?.username}`}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                  <Image
                    src={follower?.image || "/profile.png"}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {follower?.username}
                  </p>
                </div>
              </Link>

              <FollowButton />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollwersPage;
