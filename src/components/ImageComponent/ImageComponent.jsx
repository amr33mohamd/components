function ImageComponent({ content, isSelected, onClick, isPreview }) {
    //simple component for task purpose in future we can add more properties like controlling css from the user side ... etc
    return (
        <div
            className={`w-full p-4 cursor-pointer transition-all relative ${isSelected && !isPreview ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
            onClick={onClick}
        >
            <img
                src={content || 'https://placehold.co/600x400'}
                alt="Component"
                className="w-full h-auto rounded"
                onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/cccccc/666666?text=Image+Not+Found'
                }}
            />

            {isSelected && !isPreview && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Image
                </div>
            )}
        </div>
    )
}

export default ImageComponent