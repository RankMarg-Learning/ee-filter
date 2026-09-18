export const timeConvertor = (time?: string) => {
  if (!time) return "";
  const now = new Date();
  const past = new Date(time);
  const diff = now.getTime() - past.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / 604800000);
  const months = Math.floor(diff / 2592000000);
  const years = Math.floor(diff / 31536000000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

export const timeDiff = (time: string): string => {
  if (!time) return "";
  const diff = new Date(time).getTime() - new Date().getTime();
  if (diff <= 0) return "";

  const mins = Math.floor((diff / 1000) / 60);
  if (mins < 60) return `${mins}m`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) {
    const rMins = mins % 60;
    return rMins > 0 ? `${hrs}h ${rMins}m` : `${hrs}h`;
  }

  const days = Math.floor(hrs / 24);
  const rHrs = hrs % 24;
  return rHrs > 0 ? `${days}d ${rHrs}h` : `${days}d`;
}

export const isSpoilerMatch = (match: { status: string; scheduledAt: string; completedAt?: string | null }) => {
  if (match.status === 'LIVE') return true;
  if (match.status === 'COMPLETED' || match.status === 'FINISHED') {
    const timeToUse = match.completedAt || match.scheduledAt;
    if (!timeToUse) return false;
    const diffHours = (new Date().getTime() - new Date(timeToUse).getTime()) / (1000 * 60 * 60);
    return diffHours <= 12;
  }
  return false;
}

function getOptimalEnglishLocale() {
  if (typeof Intl === 'undefined') return 'en-US';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'en-IN';
    if (tz.startsWith('Europe/')) return 'en-GB';
    if (tz.startsWith('Australia/')) return 'en-AU';
    if (tz.startsWith('America/')) return 'en-US';
    return 'en-GB';
  } catch (e) {
    return 'en-US';
  }
}

export const formatLocalTime = (time: string) => {
  if (!time) return "";
  try {
    return new Intl.DateTimeFormat(getOptimalEnglishLocale(), {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    }).format(new Date(time));
  } catch (e) {
    return "";
  }
}

export const formatLocalTimeShort = (time: string) => {
  if (!time) return "";
  try {
    return new Intl.DateTimeFormat(getOptimalEnglishLocale(), {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    }).format(new Date(time));
  } catch (e) {
    return "";
  }
}

export const formatLocalDate = (time: string) => {
  if (!time) return "";
  try {
    return new Intl.DateTimeFormat(getOptimalEnglishLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(time));
  } catch (e) {
    return "";
  }
}