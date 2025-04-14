import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProfileImageDisplay from "./ProfileImageDisplay";
import Buttons from "./settingsAndFollowButton";
import Image from "next/image";

type UserProps = {
  params: Promise<{
    username: string;
  }>;
};

const Profile = async ({ params }: UserProps) => {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
    include: { recipes: true, followers: true, following: true },
  });
  if (!user) throw new Error("user doesn't exist");
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Top Profile Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Profile Pic with Upload Hover */}
          <ProfileImageDisplay
            username={username}
            image={user?.image ?? "/images/profile.png"}
          />

          <div>
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>
        <Buttons currentUserId={user.id} />
      </div>

      {/* Stats Row */}
      <div className="flex justify-around text-center border-y py-4">
        <div>
          <div className="font-bold">{user.recipes.length}</div>
          <div className="text-sm text-gray-600">Recipes</div>
        </div>
        <div>
          <Link href={`/profile/${username}/followers`}>
            <div className="font-bold">{user.followers.length}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </Link>
        </div>
        <div>
          <Link href={`/profile/${username}/following`}>
            <div className="font-bold">{user.following.length}</div>
            <div className="text-sm text-gray-600">Following</div>
          </Link>
        </div>
      </div>

      {/* Recipe Grid */}
      {user.recipes.length > 0 && (
        <div className="grid grid-cols-3 gap-1">
          {user.recipes.map((recipe, idx) => (
            <Link href={`/recipe/${recipe.id}`} key={idx}>
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={recipe.image}
                  alt="recipe"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
      {user.recipes.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <Image
            src="/images/recipe.png" // placeholder or coming soon image
            alt="No recipes yet"
            width={200}
            height={200}
            className="object-contain opacity-60"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
