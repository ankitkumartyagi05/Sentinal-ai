import React from 'react';

type MotionProps = React.HTMLAttributes<HTMLElement> & {
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
    whileHover?: unknown;
    whileTap?: unknown;
    whileInView?: unknown;
    viewport?: unknown;
};

const motionFactory = new Proxy(
    {},
    {
        get: (_target, tag: string) => {
            const MotionComponent = ({ children, ...rest }: MotionProps) =>
                React.createElement(tag, rest, children);
            MotionComponent.displayName = `motion.${tag}`;
            return MotionComponent;
        },
    },
);

export const motion = motionFactory as Record<string, React.FC<MotionProps>>;

export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export const useScroll = () => ({
    scrollYProgress: 0,
});

export const useTransform = <T,>(_value: unknown, _input: unknown, output: T): T => output;
