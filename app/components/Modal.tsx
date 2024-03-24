interface ModalProps {
    setIsModalOpen: (open: boolean) => boolean | void;
    isModalOpen: boolean;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    children,
    setIsModalOpen,
    isModalOpen,
    title,
}) => {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-10">
            <div className="w-[350px] rounded-[16px] bg-gray-900 p-[20px]">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button
                        className="btn btn-square outline-none border-none btn-sm bg-gray-800 p-2"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                        <span className="sr-only">Close panel</span>
                        <svg
                            // className="text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="white"
                        >
                            <path
                                d="M1 1L12.9965 12.9965"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M1 13.0173L12.9965 1.02081"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                <hr />
                {children}
            </div>
        </div>
    );
};

export default Modal;