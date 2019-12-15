# Blocks Structure

In order for the library to work and register blocks dynamically, a specific folder structure and naming must be followed. 

Your folder structure should like this:

```
theme-name
|____ src
| |____blocks
| | |____assets
| | |____components
| | |____custom
| | |____layout
| | |____wrapper
| | |____manifest.json
```

In the case you need to override the default way styles and scripts are enqueued, you'd extend the `class-enqueue.php`, and in the case you need to override or extend the default way blocks are behaving, you'd extend the `class-blocks.php` inside your theme/plugin.

### Blocks folder
This folder contains all the Gutenberg blocks defined in your project. Each block is located in the `custom` folder, and every component is located in the `components` folder. Gutenberg blocks are comprised of one or more smaller components.

### assets
This folder contains all the additional javascript, images, fonts and style functionality for the blocks that you only need to use on the frontend and in the editor (admin).

### components
This folder contains all the components that are shared across blocks. Components are not registered as blocks. 

### custom
This folder contains all the custom Gutenberg blocks defined and used in your project.

### layout
This folder contains all other layout elements such as header or footer. Each layout part goes in its own folder, and they contain PHP, JS and SCSS files.

### wrapper
This folder contains a wrapper component that wraps all blocks with shared variables and gives blocks the ability to behave as a section.

### manifest.json
This file contains global settings for the project. It must contain `namespace` and `background` keys. Everything else is optional. You can store data here that you intend to share across toolbars, components and blocks.

Example:
```json
{
  "namespace": "eightshift-boilerplate", // Required.
  "background": "#52368C", // Required.
  "maxCols": 12 // Optional.
}
```

### class-blocks.php
This class is used to extend Eightshift Blocks abstract `class-blocks.php` class and default functionality.  
_This file is optional_. 

### class-enqueue.php
This class is used to extend Eightshift Enqueue abstract `class-enqueue.php` default functionality.   
_This file is optional_.
