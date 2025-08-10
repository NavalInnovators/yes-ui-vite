import avatar1 from "../assets/avatars/avatar1.svg";
import avatar2 from "../assets/avatars/avatar2.svg";
import avatar3 from "../assets/avatars/avatar3.svg";
import avatar4 from "../assets/avatars/avatar4.svg";
import avatar5 from "../assets/avatars/avatar5.svg";
import avatar8 from "../assets/avatars/avatar8.svg";

export const avatarMap = {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar8,
};


export function resolveAvatarValue(value) {
  if (!value) return null;
  if (value.startsWith("data:") || value.startsWith("http")) {
    return value;
  }
  return avatarMap[value] || null;
}
export function getRandomAvatarKey() {
  const keys = Object.keys(avatarMap);
  return keys[Math.floor(Math.random() * keys.length)];
}
export function saveAvatarKeyForUser(userId, avatarKey) {
  if (!userId || !avatarKey) return;
  localStorage.setItem(`avatarKey_${userId}`, avatarKey);
}
export function getAvatarKeyForUser(userId) {
  if (!userId) return null;
  return localStorage.getItem(`avatarKey_${userId}`);
}
export function assignAvatarKey(userId) {
  if (!userId) return null;
  let avatarKey = getAvatarKeyForUser(userId);
  if (!avatarKey) {
    avatarKey = getRandomAvatarKey();
    saveAvatarKeyForUser(userId, avatarKey);
  }
  return avatarKey;
}
