import type { ButtonProps } from 'antd';
import { Button, Tooltip } from 'antd';
import React from 'react';

interface IconButtonProps extends Omit<ButtonProps, 'shape' | 'type' | 'size'> {
    icon: React.ReactNode;
    rightIcon?: React.ReactNode;
    size?: 'small' | 'middle' | 'large';
    tooltip?: string;
    className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    rightIcon,
    onClick,
    size = 'middle',
    tooltip,
    className = '',
    ...rest
}) => {
    const sizeClasses = {
        small: 'text-sm',
        middle: 'text-md',
        large: 'text-lg',
    };

    const content = (
        <Button
            type="text"
            size={size}
            onClick={onClick}
            className={`group relative flex items-center justify-center 
                bg-transparent text-white border-none 
                hover:!bg-transparent
                transition-all rounded 
                p-0 ${sizeClasses[size]} ${className}`}
            {...rest}
        >
            <span>{icon}</span>
            {rightIcon && (
                <span className="absolute right-1 bottom-1 text-[10px] text-white/60 group-hover:text-white">
                    {rightIcon}
                </span>
            )}
        </Button>
    );

    return tooltip ? <Tooltip title={tooltip}>{content}</Tooltip> : content;
};
