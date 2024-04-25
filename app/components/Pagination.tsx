import { FC, useState } from "react";

interface PaginationProps {
    currentPage: number;
    isNextPage: any;
    totalPages: number;

    // onPageChange: (data: any) => void;
    onPageChange: (data: any, page_size: number) => void;
}

const Pagination: FC<PaginationProps> = ({
    currentPage,
    isNextPage,
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

    const handleOnChange = (currentPage: number, page_size: any) => {
        // const { name, value} = e.target;
        onPageChange(currentPage, page_size);
        setPageSize(page_size);
    };

    return (
        // <div className="w-full flex justify-center items-center">
        //     <div className="h-5 justify-center items-center flex">
        //         <div className="join grid gap-5 grid-cols-2">
        //             <button
        //                 onClick={() => onPageChange(currentPage - 1)}
        //                 disabled={currentPage === 1}
        //                 className={`${currentPage === 1 ? 'hidden' : ''} join-item btn border-none`}>

        //                 <svg className="w-8 h-8"
        //                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
        //                 </svg>
        //             </button>
        //             <button
        //                 onClick={() => onPageChange(currentPage + 1)}
        //                 disabled={isNextPage === null}
        //                 className={`${isNextPage === null ? 'hidden' : ''} join-item btn border-none`}>
        //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
        //                 </svg>
        //             </button>
        //         </div>
        //     </div>
        // </div>

        <div>
            <div className="w-full h-6 justify-between items-center inline-flex">
                <div className="justify-start items-center gap-2 flex">
                    <div className="text-white text-xs font-normal leading-normal">Rows</div>
                    <div className="px-2 py-1 bg-primary rounded-lg flex-col justify-start items-center gap-2.5 inline-flex">
                        <div className="justify-start items-center gap-2 inline-flex bg-primary">
                            <select name="page_size"
                                onChange={(e) => handleOnChange(currentPage, e.target.value)}
                                className="text-white text-xs font-normal leading-normal bg-transparent border-none outline-none">
                                <option className="bg-primary text-white border-none hover:bg-black outline-none" value={10}>10</option>
                                <option className="bg-primary text-white border-none hover:bg-black outline-none" value={25}>25</option>
                                <option className="bg-primary text-white border-none hover:bg-black outline-none" value={50}>50</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                    <button
                        onClick={() => onPageChange(currentPage - 1, pageSize)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 bg-cyan-950 rounded-lg flex-col justify-start items-center gap-2.5 inline-flex ${currentPage === 1
                            ? "cursor-not-allowed text-gray-400 bg-[#91afb9] hidden"
                            : "cursor-pointer hover:bg-primary"
                            }`}>
                        <div className="justify-start items-center gap-2 inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.86031 3.963C10.028 4.10677 10.0475 4.35929 9.9037 4.52702L6.92682 8.00004L9.9037 11.4731C10.0475 11.6408 10.028 11.8933 9.86031 12.0371C9.69258 12.1808 9.44006 12.1614 9.29629 11.9937L6.09629 8.26036C5.96789 8.11056 5.96789 7.88952 6.09629 7.73972L9.29629 4.00639C9.44006 3.83866 9.69258 3.81924 9.86031 3.963Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </button>

                    {pageNumbers.map((page, index) => {
                        return (
                            <div key={index} className="p-2 rounded-lg flex-col justify-start items-center gap-2.5 inline-flex">
                                <button
                                    onClick={() => onPageChange(page, pageSize)}
                                    // disabled={currentPage === totalPages}
                                    className={`text-white text-xs font-semibold leading-normal ${currentPage === page && "pointer-events-none bg-primary px-2 py-1 rounded-md text-white"
                                        }`}>{page}</button>
                            </div>

                        )
                    })}
                    <button
                        onClick={() => onPageChange(currentPage + 1, pageSize)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 bg-cyan-950 rounded-lg flex-col justify-start items-center gap-2.5 inline-flex ${currentPage === totalPages
                            ? "cursor-not-allowed text-gray-400 bg-[#91afb9] hidden"
                            : "cursor-pointer hover:bg-primary"
                            }`}>
                        <div className="justify-start items-center gap-2 inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.13969 12.037C5.97196 11.8932 5.95254 11.6407 6.0963 11.473L9.07318 7.99996L6.0963 4.52694C5.95254 4.35921 5.97196 4.10669 6.13969 3.96292C6.30742 3.81915 6.55994 3.83858 6.70371 4.00631L9.90371 7.73964C10.0321 7.88944 10.0321 8.11048 9.90371 8.26028L6.70371 11.9936C6.55994 12.1613 6.30742 12.1808 6.13969 12.037Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;