import { createAvatar } from '@dicebear/core';
import { personas } from '@dicebear/collection';

export interface AvatarUser {
  email?: string;
  id?: number | string;
  avatar_url?: string;
}

/**
 * Avatar helper.
 * Generates deterministic fallback SVG via @dicebear/personas.
 */
export const useAvatar = () => {
  const generateFallbackAvatar = (user: AvatarUser): string => {
    if (!user) return '';

    // Use personas style for gender-neutral people avatars
    const avatar = createAvatar(personas as any, {
      seed: user.email || user.id?.toString() || 'fallback',
      backgroundColor: [
        'b6e3f4',
        'c4b5fd',
        'a78bfa',
        'fb7185',
        'fdba74',
        'fde047',
        'a7f3d0',
        'fbb6ce',
        '93c5fd'
      ],
      // Gender-neutral styling
      beard: [],
      body: ['squared', 'rounded'],
      face: ['circle', 'square'],
      hair: ['shortHair', 'mediumHair', 'curlyHair', 'straightHair'],
      shirt: ['collared', 'crew', 'open']
    });

    return avatar.toDataUri();
  };

  const getAvatarUrl = (user: AvatarUser): string => {
    return user?.avatar_url || generateFallbackAvatar(user);
  };

  return {
    generateFallbackAvatar,
    getAvatarUrl
  };
};
