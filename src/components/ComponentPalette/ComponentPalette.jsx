import { useDraggable } from '@dnd-kit/core'

function DraggableComponent({ id, icon, label, description, onAddComponent }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined

    const handleClick = () => {
        if (!isDragging) {
            onAddComponent(id)
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`w-full p-3 text-left border rounded-lg transition-colors cursor-pointer ${isDragging ? 'opacity-50 scale-105' : 'hover:bg-gray-50 hover:border-blue-300'
                }`}
            onClick={handleClick}
        >
            <div
                {...listeners}
                {...attributes}
                className="flex items-center space-x-3"
            >
                <span className="text-lg">{icon}</span>
                <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                </div>
            </div>
        </div>
    )
}

function ComponentPalette({ onAddComponent }) {
    //TO DO : we can have these components in a separate object when they are so many in the future but for now it's just simple task not to over complicate things
    const components = [
        {
            type: 'text',
            label: 'Text',
            icon: 'T',
            description: 'Add text with markdown'
        },
        {
            type: 'image',
            label: 'Image',
            icon: 'IMG',
            description: 'Add image from URL'
        }
    ]

    return (
        <div className="w-64 bg-white border-r p-4">
            <h2 className="text-lg font-semibold mb-4">Components</h2>

            <div className="space-y-2">
                {components.map((component) => (
                    <DraggableComponent
                        key={component.type}
                        id={component.type}
                        icon={component.icon}
                        label={component.label}
                        description={component.description}
                        onAddComponent={onAddComponent}
                    />
                ))}
            </div>
            {/* in future we can use intro.js for showing people how they do it (walk trough tutorial) */}
            <div className="mt-8 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                <div className="font-medium mb-2">Tips:</div>
                <ul className="space-y-1 text-xs">
                    <li>- Drag and drop to canvas</li>
                    <li>- Click to add quickly</li>
                    <li>- Select to edit properties</li>
                    <li>- Use full-width for wide layouts</li>
                </ul>
            </div>
        </div>
    )
}

export default ComponentPalette