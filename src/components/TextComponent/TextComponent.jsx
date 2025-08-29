import ReactMarkdown from 'react-markdown'

function TextComponent({ content, isSelected, onClick, isPreview }) {
    //this is just simple component for text with markupdown but we can have more rich text editors in future
    return (
        <div
            className={`w-full p-4 cursor-pointer transition-all relative ${isSelected && !isPreview ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
            onClick={onClick}
        >
            <div className="prose max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>

            {isSelected && !isPreview && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Text
                </div>
            )}
        </div>
    )
}

export default TextComponent