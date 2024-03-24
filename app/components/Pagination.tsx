import { FC, useState } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    // itemsPerPage: number
    onPageChange: (data: any, page_size: number) => void;
}

const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    // Calculate the range of page numbers to display
    const pageRange = 1; // Adjust this to change the number of visible pages
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);
    const [pageSize, setPageSize] = useState<number>(10);

    // Generate an array of page numbers to display
    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    return (
        <div className="w-full flex justify-center items-center">
            <div className="h-6 justify-center items-center flex">
                <div className="join grid grid-cols-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1, pageSize)}
                        disabled={currentPage === 1}
                        className={`${currentPage === 1 ? 'hidden' : ''} join-item btn btn-outline`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                        </svg>

                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1, pageSize)}
                        disabled={currentPage === totalPages}
                        className={`${currentPage === totalPages ? 'hidden' : ''} join-item btn btn-outline`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;