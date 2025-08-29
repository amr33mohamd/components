import { useState } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import ComponentPalette from '../components/ComponentPalette/ComponentPalette'
import Canvas from '../components/Canvas/Canvas'
import PropertiesPanel from '../components/PropertiesPanel/PropertiesPanel'

function PageBuilder() {
    //page builder component could be an npm library that we maintain and used by the website
    const [components, setComponents] = useState([])
    const [selectedComponent, setSelectedComponent] = useState(null)
    const [isPreview, setIsPreview] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [activeId, setActiveId] = useState(null)

    const addComponent = (type) => {
        const newComponent = {
            id: Date.now(),
            type,
            content: type === 'text' ? '# Hello World\nThis is some text content.' : 'https://placehold.co/600x400',
            width: 'full'
        }
        setComponents([...components, newComponent])
        setShowMobileMenu(false)
    }

    const updateComponent = (id, updates) => {
        setComponents(components.map(comp =>
            comp.id === id ? { ...comp, ...updates } : comp
        ))
        // Update selectedComponent if it's the one being updated
        if (selectedComponent?.id === id) {
            setSelectedComponent({ ...selectedComponent, ...updates })
        }
    }

    const deleteComponent = (id) => {
        setComponents(components.filter(comp => comp.id !== id))
        if (selectedComponent?.id === id) {
            setSelectedComponent(null)
        }
    }

    const handleDragStart = (event) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (over && over.id === 'canvas') {
            addComponent(active.id)
        }

        setActiveId(null)
    }

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="h-screen flex bg-gray-50">
                {!isPreview && (
                    <div className="hidden md:block">
                        <ComponentPalette onAddComponent={addComponent} />
                    </div>
                )}

                <div className="flex-1 flex flex-col">
                    <header className="bg-white border-b px-4 py-2 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold">Page Builder</h1>
                            {!isPreview && (
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="md:hidden bg-gray-100 p-2 rounded hover:bg-gray-200"
                                >
                                    +
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {isPreview ? 'Edit' : 'Preview'}
                        </button>
                    </header>

                    {showMobileMenu && !isPreview && (
                        <div className="md:hidden bg-white border-b p-4">
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => addComponent('text')}
                                    className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    <span>Text</span>
                                </button>
                                <button
                                    onClick={() => addComponent('image')}
                                    className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    <span>Image</span>
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 flex">
                        <Canvas
                            components={components}
                            selectedComponent={selectedComponent}
                            onSelectComponent={setSelectedComponent}
                            onDeleteComponent={deleteComponent}
                            isPreview={isPreview}
                        />

                        {!isPreview && selectedComponent && (
                            <div className="hidden md:block">
                                <PropertiesPanel
                                    component={selectedComponent}
                                    onUpdateComponent={updateComponent}
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* Mobile Properties Panel */}
                    {!isPreview && selectedComponent && (
                        <div className="md:hidden bg-white border-t p-4">
                            <PropertiesPanel
                                component={selectedComponent}
                                onUpdateComponent={updateComponent}
                            />
                        </div>
                    )}
                </div>
            </div>

            <DragOverlay>
                {activeId ? (
                    <div className="bg-blue-500 text-white px-3 py-2 rounded shadow-lg">
                        {activeId === 'text' ? 'Text' : 'Image'}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

export default PageBuilder