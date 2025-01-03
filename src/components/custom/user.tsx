'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

interface TagProps {
  label?: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 's' | 'm' | 'l';
  empty?: boolean;
  loading?: boolean;
  className?: string;
}

interface UserProps {
  name?: string;
  subline?: React.ReactNode;
  avatarProps?: AvatarProps;
  tag?: string;
  tagProps?: TagProps;
  className?: string;
}

const Tag = ({ label, variant = 'info', className }: TagProps) => {
  const baseClass = 'px-2 py-1 rounded text-xs font-semibold';
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={classNames(baseClass, variantClasses[variant], className)}>
      {label}
    </span>
  );
};

const Avatar = ({ src, alt, size = 'm', className }: AvatarProps) => {
  const sizes = {
    s: 'w-8 h-8',
    m: 'w-12 h-12',
    l: 'w-16 h-16',
  };

  return (
    <img
      src={src || '/default-avatar.png'}
      alt={alt || 'Avatar'}
      className={classNames('rounded-full', sizes[size], className)}
    />
  );
};

const User = forwardRef<HTMLDivElement, UserProps>(
  ({ name, subline, avatarProps = {}, tag, tagProps = {}, className }, ref) => {
    const { src, alt, ...restAvatarProps } = avatarProps;

    return (
      <Link href="/dashboard/settings" passHref>
        <div
          ref={ref}
          className={classNames(
            'flex items-center gap-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition',
            className
          )}
        >
          <Avatar src={src} alt={alt || name} {...restAvatarProps} />
          <div className="flex flex-col">
            {name && (
              <span className="font-medium text-gray-800 text-sm dark:text-gray-200">
                {name}
              </span>
            )}
            {subline && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {subline}
              </span>
            )}
          </div>
          {tag && <Tag label={tag} {...tagProps} />}
        </div>
      </Link>
    );
  }
);

User.displayName = 'User';

export { User };
export type { UserProps };
