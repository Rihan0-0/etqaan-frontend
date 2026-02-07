/**
 * Avatar Generator - Creates unique avatars for students
 * Supports unlimited students with unique combinations
 */

// Large pool of animal emojis (30 animals)
const ANIMAL_EMOJIS = [
  "🦁", "🐻", "🦉", "🐰", "🐱", "🐶", "🐼", "🐯", "🐨", "🦊",
  "🐸", "🐧", "🦄", "🐵", "🐮", "🐷", "🦋", "🐝", "🐢", "🦆",
  "🦅", "🦈", "🐙", "🦀", "🐘", "🦒", "🦘", "🦎", "🦩", "🦔",
];

/**
 * Generate a unique HSL color based on a number
 * This creates infinite color variations
 */
function generateColor(seed: number, saturation = 70, lightness = 55): string {
  // Use seed to generate hue (0-360)
  const hue = (seed * 137.508) % 360; // Golden angle for even distribution
  return `hsl(${Math.floor(hue)}, ${saturation}%, ${lightness}%)`;
}

/**
 * Generate gradient colors for avatar background
 */
function generateGradientColors(id: number): { from: string; to: string } {
  const color1 = generateColor(id, 70, 55);
  const color2 = generateColor(id * 2 + 100, 70, 45);
  return { from: color1, to: color2 };
}

/**
 * Get avatar for a student
 * @param id - Student ID
 * @param avatarIndex - Optional fixed avatar index (for manually set avatars)
 */
export function getStudentAvatar(
  id: number,
  avatarIndex?: number,
): { emoji: string; bgStyle: string } {
  // Select emoji (cycles through 30 animals)
  const emojiIndex = avatarIndex !== undefined 
    ? avatarIndex % ANIMAL_EMOJIS.length 
    : id % ANIMAL_EMOJIS.length;
  const emoji = ANIMAL_EMOJIS[emojiIndex];

  // Generate unique gradient colors based on ID
  const { from, to } = generateGradientColors(avatarIndex ?? id);
  const bgStyle = `linear-gradient(135deg, ${from}, ${to})`;

  return { emoji, bgStyle };
}

/**
 * Get avatar with Tailwind classes (for backward compatibility)
 * Note: This uses predefined Tailwind classes, limited to 12 variants
 */
const TAILWIND_GRADIENTS = [
  "from-amber-400 to-orange-500",
  "from-amber-600 to-amber-800",
  "from-purple-400 to-purple-600",
  "from-pink-300 to-pink-500",
  "from-orange-300 to-orange-500",
  "from-yellow-400 to-amber-500",
  "from-gray-400 to-gray-600",
  "from-orange-400 to-orange-600",
  "from-gray-300 to-gray-500",
  "from-orange-500 to-red-500",
  "from-green-400 to-green-600",
  "from-gray-700 to-gray-900",
];

export function getStudentAvatarTailwind(
  id: number,
  avatarIndex?: number,
): { emoji: string; bg: string } {
  const emojiIndex = avatarIndex !== undefined 
    ? avatarIndex % ANIMAL_EMOJIS.length 
    : id % ANIMAL_EMOJIS.length;
  const bgIndex = avatarIndex !== undefined
    ? avatarIndex % TAILWIND_GRADIENTS.length
    : id % TAILWIND_GRADIENTS.length;

  return {
    emoji: ANIMAL_EMOJIS[emojiIndex],
    bg: TAILWIND_GRADIENTS[bgIndex],
  };
}
