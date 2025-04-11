import { prisma } from "@/lib/prisma";
import { FC } from "react";

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
  console.log(user);
  //user recipes
  //user followers
  //user following
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Top Profile Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/profile.png"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user?.username}</h2>
            <p className="text-gray-600">{user?.bio}</p>
          </div>
        </div>

        <button className="bg-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-300">
          Edit Profile
        </button>
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
