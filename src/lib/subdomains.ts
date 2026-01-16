export function isValidIcon(str: string) {
  if (str.length > 10) {
    return false;
  }

  try {
    const emojiPattern = /[\p{Emoji}]/u;
    if (emojiPattern.test(str)) {
      return true;
    }
  } catch (error) {
    console.warn(
      "Emoji regex validation failed, using fallback validation",
      error
    );
  }

  return str.length >= 1 && str.length <= 10;
}

type SubdomainData = {
  emoji: string;
  createdAt: number;
};

// MOCK DATA implementation
export async function getSubdomainData(
  subdomain: string
): Promise<SubdomainData | null> {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");

  // Mock response for 'demo' subdomain
  if (sanitizedSubdomain === "demo" || sanitizedSubdomain === "test") {
    return {
      emoji: "🚀",
      createdAt: Date.now(),
    };
  }

  // Fallback: return null for unknown subdomains to trigger 404
  return null;
}

export async function getAllSubdomains() {
  return [
    {
      subdomain: "demo",
      emoji: "🚀",
      createdAt: Date.now(),
    },
    {
      subdomain: "test",
      emoji: "🧪",
      createdAt: Date.now(),
    },
  ];
}
