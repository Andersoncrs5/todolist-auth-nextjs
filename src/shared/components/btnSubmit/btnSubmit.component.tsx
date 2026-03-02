import { ButtonBase } from "@/shared/components/btn/btn.component";
import { BtnSubmitProps } from "@/shared/components/btnSubmit/btnSubmit.props";

export const BtnSubmit = ({
  icon,
  text,
  children,
  className = "",
  isSubmiting,
  ...props
}: BtnSubmitProps): React.JSX.Element => {

    if (isSubmiting) {
        return (
            <button
                type="button"
                disabled
                className="flex items-center justify-center gap-2
                   bg-indigo-600 text-white px-4 py-2 rounded-lg
                   opacity-80 cursor-not-allowed"
            >
                <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
                Processing...
            </button>
        );
    }

    return (
        <ButtonBase
            {...props}
            type="submit"
            className={`flex items-center justify-center gap-2 
                  px-4 py-2 rounded-lg 
                  bg-blue-600 hover:bg-blue-700 
                  transition duration-300 ${className}`}
        >
            {icon}
            {text}
            {children}
        </ButtonBase>
    );
};