import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { useAuth } from "./AuthProvider";

import { assignAvatarKey, resolveAvatarValue } from "../utils/avatarUtils";

export default function Profile() {
  const { getProfileId, getUserName } = useAuth();
  const profileId = getProfileId();
  const userName = getUserName() || "Guest User";

  const [avatarSrc, setAvatarSrc] = useState(null);

  useEffect(() => {
    if (!profileId) return;

    const avatarKey = assignAvatarKey(profileId);
    const avatarImage = resolveAvatarValue(avatarKey);
    setAvatarSrc(avatarImage);
      setUserAvatar(avatarImage); 

  }, [profileId, setUserAvatar]);

  return (
    <div className="flex flex-col items-center gap-4">
      {avatarSrc ? (
        <Avatar src={avatarSrc} size={100} />
      ) : (
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "#ccc",
          }}
        />
      )}
      <h2 className="text-xl font-semibold">{userName}</h2>
    </div>
  );
}
