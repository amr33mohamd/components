import { useState } from 'react'

function PropertiesPanel({ component, onUpdateComponent }) {
    const [content, setContent] = useState(component.content)

    const handleContentChange = (e) => {
        const newContent = e.target.value
        setContent(newContent)
        onUpdateComponent(component.id, { content: newContent })
    }

    const handleWidthChange = (newWidth) => {
        onUpdateComponent(component.id, { width: newWidth })
    }

    return (
        <div className="w-full md:w-80 bg-white md:border-l p-4">
            <h2 className="text-lg font-semibold mb-4">Properties</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Component Type
                    </label>
                    <div className="px-3 py-2 bg-gray-50 rounded text-sm capitalize">
                        {component.type}
                    </div>
                </div>
                {/*As we made the grid just two coulmns we gonna use just full width and half width */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Width
                    </label>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleWidthChange('full')}
                            className={`px-3 py-1 text-sm rounded ${component.width === 'full'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            Full Width
                        </button>
                        <button
                            onClick={() => handleWidthChange('half')}
                            className={`px-3 py-1 text-sm rounded ${component.width === 'half'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            Half Width
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        {component.type === 'text' ? 'Content (Markdown)' : 'Image URL'}
                    </label>

                    {component.type === 'text' ? (
                        <textarea
                            value={content}
                            onChange={handleContentChange}
                            className="w-full h-32 p-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter markdown text..."
                        />
                    ) : (
                        <input
                            type="url"
                            value={content}
                            onChange={handleContentChange}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                        />
                    )}
                </div>

                {component.type === 'text' && (
                    <div className="text-xs text-gray-500 space-y-1">
                        <div className="font-medium">Markdown tips:</div>
                        <div># Heading</div>
                        <div>**bold** *italic*</div>
                        <div>- List item</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PropertiesPanel