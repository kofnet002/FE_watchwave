import { cn } from "@/app/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva(
    "active:scale-95 flex w-full items-center justify-center rounded-full text-lg font-medium transition-color focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:bg-disabled",
    {
        variants: {
            variant: {
                default: "bg-primary text-white font-bold w-full",
                ghost:
                    "bg-transparent border border-black",
            },
            size: {
                default: "h-10 py-2 px-4 ",
                sm: "py-[16px] px-[32px] w-[106px]",
                lg: "py-[16px] px-[32px] w-[366px] rounded-[100px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
}

const Button: FC<ButtonProps> = ({
    className,
    children,
    variant,
    loading,
    size,
    ...props
}) => {
    return (
        <div>
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={loading}
                {...props}
            >
                {loading ? (
                    <span className="loading loading-spinner loading-md bg-white"></span>
                ) : children}
            </button>
        </div>
    );
};
export default Button;