import { useDroppable } from '@dnd-kit/core'
import TextComponent from '../TextComponent/TextComponent'
import ImageComponent from '../ImageComponent/ImageComponent'

function Canvas({ components, selectedComponent, onSelectComponent, onDeleteComponent, isPreview }) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'canvas',
    })

    const handleComponentClick = (component) => {
        if (!isPreview) {
            onSelectComponent(component)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Delete' && selectedComponent && !isPreview) {
            onDeleteComponent(selectedComponent.id)
        }
    }

    return (
        <div
            ref={setNodeRef}
            className={`flex-1 p-6 overflow-y-auto focus:outline-none transition-colors ${isOver ? 'bg-blue-50 border-blue-300 border-2 border-dashed' : ''
                }`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className={`max-w-4xl mx-auto ${isPreview ? '' : 'min-h-96'}`}>
                {components.length === 0 && !isPreview && (
                    <div className="text-center py-12 text-gray-500">
                        <div className="text-4xl mb-4">+</div>
                        <h3 className="text-xl font-medium mb-2">Start building your page</h3>
                        <p>Drag components from the sidebar or click to add them</p>
                    </div>
                )}
                {/*Here we specify the grid system we can add more cols to the grid as bonus but controlling it in properties would be harder as user gonna specify how much of the grid the component should take */}
                <div className="grid grid-cols-2 gap-4">
                    {components.map((component) => {
                        const isSelected = selectedComponent?.id === component.id
                        const ComponentToRender = component.type === 'text' ? TextComponent : ImageComponent

                        return (
                            <div
                                key={component.id}
                                className={`relative group ${component.width === 'full' ? 'col-span-2' : 'col-span-1'}`}
                            >
                                <ComponentToRender
                                    content={component.content}
                                    isSelected={isSelected}
                                    onClick={() => handleComponentClick(component)}
                                    isPreview={isPreview}
                                />

                                {isSelected && !isPreview && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDeleteComponent(component.id)
                                        }}
                                        className="absolute top-2 left-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs hover:bg-red-600 z-10"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Canvas