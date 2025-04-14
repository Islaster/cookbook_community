"use client";

import { followUser, unfollowUser, checkFollowing } from "./FollowUser";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUserContext } from "@/contexts/userContext";

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useUserContext();
  const { username } = useParams();

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!username || !user?.id) return;
      const res = await checkFollowing({
        userId: user.id,
        targetId: username as string,
      });
      setIsFollowing(res);
    };

    fetchFollowing();
  }, [user?.id, username]);
  const handleToggleFollow = async () => {
    if (!username || !user?.id) return;

    if (isFollowing) {
      await unfollowUser({ userId: user.id, targetId: username as string });
      setIsFollowing(false);
    } else {
      await followUser({ userId: user.id, targetId: username as string });
      setIsFollowing(true);
    }
  };
  return (
    <button
      className="text-sm sm:text-base text-blue-600 hover:underline"
      onClick={handleToggleFollow}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
