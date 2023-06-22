// types/all.ts
export interface ProfileProps {
  userId: string; // Update the type to 'string | null'
  images: string[];
  shuffle?: boolean;
  username: string;
  displayName: string;
  avatarSrc: string;
  weblinks: {
    linkUrl?: string | undefined;
    linkTitle?: string | undefined;
  };
  socials: {
    instagram?: string | undefined;
    twitter?: string | undefined;
  };
}

export interface ProfileSocialsProps {
  socials: {
    instagram?: string | undefined;
    twitter?: string | undefined;
    twitch?: string | undefined;
  };
}

export interface FormHeaderProps {
  formTitle: string;
  isSubmitting: boolean;
  pushURL: string | URL;
}

export interface ProfileCreateFormHeaderProps {
  formTitle: string;
  isSubmitting: boolean;
  pushURL: string | URL;
}

export interface ProfileHeaderProps {
  displayName: string;
  username: string;
  avatarSrc: string; // Add the `avatarSrc` prop
}
