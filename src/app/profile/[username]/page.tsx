import { prisma } from "@/lib/prisma";
import { FC } from "react";
import Link from "next/link";
import ProfileImageDisplay from "./ProfileImageDisplay";
import Buttons from "./settingsAndFollowButton";

type ProfilelProps = {
  params: {
    username: string;
  };
};

const Profile: FC<ProfilelProps> = async ({ params }) => {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
    include: { recipes: true, followers: true, following: true },
  });
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Top Profile Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Profile Pic with Upload Hover */}
          <ProfileImageDisplay
            username={username}
            image={user?.image ?? "./profile.png"}
          />

          <div>
            <h2 className="text-2xl font-semibold">{user?.username}</h2>
            <p className="text-gray-600">{user?.bio}</p>
          </div>
        </div>
        <Buttons id={user?.id ?? 0} />
      </div>

      {/* Stats Row */}
      <div className="flex justify-around text-center border-y py-4">
        <div>
          <div className="font-bold">{user?.recipes.length}</div>
          <div className="text-sm text-gray-600">Posts</div>
        </div>
        <div>
          <div className="font-bold">{user?.followers.length}</div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div>
          <div className="font-bold">{user?.following.length}</div>
          <div className="text-sm text-gray-600">Following</div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-3 gap-1">
        {user?.recipes.map((recipe, idx) => (
          <img
            key={idx}
            src={recipe.image}
            alt="recipe"
            className="aspect-square object-cover w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
