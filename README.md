# Page Builder

Simple drag and drop page builder inspired by Retool. Built this as a quick prototype to see how hard it would be to recreate something like their component system.

## What it does

- Drag components from the sidebar onto the canvas
- Text components support markdown (headings, bold, lists etc)
- Images just need a URL 
- Click on stuff to edit it in the sidebar
- Toggle between edit and preview modes
- Works on mobile too (kinda)

## Running it

```bash
npm install
npm run dev
```

Then go to http://localhost:5173

## How to use

Just drag the Text or Image buttons from the left sidebar onto the canvas. Click on components to select them and edit properties on the right. 

Hit Preview to see what it looks like without all the editing UI. Delete key removes selected components.

On mobile there's a + button since the sidebar doesn't fit.

## Tech stuff

React + Vite + Tailwind. Used @dnd-kit for the drag and drop since the HTML5 API is kinda annoying. react-markdown handles the text component rendering.

## File structure

```
src/
  components/
    Canvas/           # where components get rendered
    ComponentPalette/ # left sidebar with draggable items  
    PropertiesPanel/  # right sidebar for editing
    TextComponent/    # renders markdown
    ImageComponent/   # shows images
  pages/
    PageBuilder.jsx   # main container, handles all the state
```

## Notes

- Built for a coding challenge, not production ready
- The state management could probably be cleaner
- Would be cool to add more component types later
- Responsive but not perfect on all screen sizes

## Future ideas

This could easily be converted into a proper npm package with some improvements:

- Add way more component types (buttons, forms, cards, etc)
- Better state management with context or zustand
- The output would be a clean JSON schema with all components and their properties
- That JSON could be saved to a backend and loaded later
- Add themes and styling options
- Maybe some kind of plugin system for custom components

The JSON output would look something like:
```json
{
  "components": [
    {
      "id": "123",
      "type": "text", 
      "content": "# Hello world",
      "width": "full",
      "position": 0
    },
    {
      "id": "456",
      "type": "image",
      "content": "https://example.com/img.jpg", 
      "width": "half",
      "position": 1
    }
  ]
}
```

## Other commands

```bash
npm run build    # build for production
npm run preview  # preview the build
npm run lint     # check for issues
```