import {FooterProps} from "@/shared/components/footer/footer.props";

export default function Footer({ children, logo }: FooterProps) {
    return (
        <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <span className="text-sm text-white/70">
                    © {new Date().getFullYear()} {logo}
                </span>

                <div className="flex gap-4 text-white/70 text-sm">
                    <a href="#" className="hover:text-white transition">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Terms
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Contact
                    </a>
                </div>

            </div>
        </footer>
    );
}