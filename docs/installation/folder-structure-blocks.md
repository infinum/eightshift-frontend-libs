# Blocks Folder Structure

In order for the library to work and register blocks dynamically, a specific folder structure and naming must be applied. 

Your folder structure should like this:

```
theme-name
|____ src
| |____blocks
| | |____manifest.json
| | |____assets
| | |____custom
| | |____components
| | |____wrapper
```

### blocks
This folder contains all Gutenberg blocks defined in your project.

### class-blocks.php
This class is used to extend Eightshift Blocks abstract `class-blocks.php` functionality.

### class-enqueue.php
This class is used to extend Eightshift Enqueue abstract `class-enqueue.php` functionality.

### manifest.json
This file contains some global settings for the project. It must contain `namespace` and `background` keys. Everything else is optional. You can store data here that you intend to share across toolbars, components, blocks.

Example:
```json
{
  "namespace": "eightshift-boilerplate",
  "background": "#52368C",
}
```

### assets
This folder contains all additional javascript and style functionality for the block that you only need to use on the frontend and editor.

### custom
This folder contains all Custom Gutenberg blocks defined and used in your project.

### components
This folder contains all components that are shared across blocks. Components are not registered as blocks.

### toolbars
This folder contains all components that are shared across blocks. These are generally JavaScript components for toolbar.

### wrapper
This folder contains a wrapper component that wraps all blocks with shared variables and gives block ability to behave as a section.
