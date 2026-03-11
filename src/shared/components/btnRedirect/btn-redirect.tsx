import { useRouter } from 'next/navigation';
import {ButtonBase} from "@/shared/components/btn/btn.component";
import {BtnRedirectProps} from "@/shared/components/btnRedirect/btn-redirect.interface";

export const BtnRedirect = ({ className, icon, text, to, children, ...props }: BtnRedirectProps) => {
    const router = useRouter();

    const handleNavigation = () => {
        router.push(to);
    };

    return (
        <ButtonBase
            onClick={handleNavigation}
            {...props}
            className={className}
        >
            {children}
            {text}
            {icon}
        </ButtonBase>
    );
};