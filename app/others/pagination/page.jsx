function Pagination({ currentPage, totalPages, handlePageChange }) {

    const handlePrev = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePage = (page) => {
        handlePageChange(page);
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#3462B5] text-white rounded-md opacity-60 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePage(page)}
                    className={`px-4 py-2 rounded-md ${page === currentPage ? 'bg-[#3462B5] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#3462B5] text-white rounded-md opacity-60 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
