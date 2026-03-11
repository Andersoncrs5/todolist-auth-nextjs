import {PaginationProps} from "@/shared/components/pagination/pagination.props";

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8 pb-10">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="p-2 border rounded disabled:opacity-30 hover:bg-white/10 transition text-white"
            >
                Previous
            </button>

            <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 border rounded transition ${
                            currentPage === page
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-transparent text-gray-400 hover:bg-white/5"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="p-2 border rounded disabled:opacity-30 hover:bg-white/10 transition text-white"
            >
                Next
            </button>
        </div>
    );
}