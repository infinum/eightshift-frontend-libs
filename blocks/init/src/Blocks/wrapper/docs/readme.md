# Wrapper Component

The wrapper is a parent component that you can use inside your block. When you register a block in the `manifest.json` file you can specify if you want to use the wrapper or not by setting `wrapperUse` key to true/false option (default is true).

When creating your website layout you should think of every block as a specific section that spans from one end of the screen to another. When you structure your mindset like that you can use a wrapper to provide layout-specific styles to your block without having to add them manually to every block. With that in mind your block can now have the option to set a background image, top/bottom spacing, container width, container spacing, anchor tag, and all that inside multiple responsive braking points out of the box. It's automatically injected inside of your block with all its attributes.

## Implementation

Open a terminal and type in this command inside your projects root:

```shell
wp boilerplate use_wrapper
```
