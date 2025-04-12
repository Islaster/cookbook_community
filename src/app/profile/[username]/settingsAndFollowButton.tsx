"use client";

import { useUserContext } from "@/contexts/userContext";
import Link from "next/link";
import { followUser, checkFollowing, unfollowUser } from "./FollowUser";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
  currentUserId: number;
};

const Buttons = ({ currentUserId }: Props) => {
  const { username } = useParams();
  const targetId = username;
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useUserContext();
  const userId = currentUserId === user?.id;
  useEffect(() => {
    const fetchFollowing = async () => {
      if (!username || !user?.id) return;
      const res = await checkFollowing({ userId: user.id, targetId: username });
      setIsFollowing(res);
    };

    fetchFollowing();
  }, [user?.id, username]);

  const handleToggleFollow = async () => {
    if (!username || !user?.id) return;

    if (isFollowing) {
      await unfollowUser({ userId: user.id, targetId: username });
      setIsFollowing(false);
    } else {
      await followUser({ userId: user.id, targetId: username });
      setIsFollowing(true);
    }
  };

  return (
    <>
      {userId && (
        <Link href="/profile/settings">
          <button className="bg-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-300">
            settings
          </button>
        </Link>
      )}
      {!userId && (
        <button
          className="bg-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-300"
          onClick={handleToggleFollow}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </>
  );
};
export default Buttons;
