# Footer Component

A component used for setting the site's footer. Should be used (only once) in `footer.php`

## Dependencies

None.

_Default usage in Eightshift Boilerplate's `footer.php` is dependant on the following components:_
```
components/copyright
components/menu
```

## Attributes

* _@param_ **blockClass** | `string` | default: `"footer"` | Component's class. If modifying make sure the provide the default class as well (see an example call).
* _@param_ **leftComponent** | `string|array` | Component (html string or array of html strings) to render on the **left** side of the footer.
* _@param_ **centerComponent** | `string|array` | Component (html string or array of html strings) to render in the **center** of the footer.
* _@param_ **rightComponent** | `string|array` | Component (html string or array of html strings) to render on the **right** side of the footer.

## Example

```php
use Eightshift_Libs\Blocks\Helpers\Components;

Components::render( 'footer', [
  'leftComponent' => Components::render( 'copyright' ),
  'centerComponent' => '',
  'rightComponent' => Components::render( 'menu', [ 'variation' => 'horizontal' ] ),
] );
```

## Implementation

1. Copy/Paste component folder in your project (if it's not already there)
2. Rename `Eightshift_Boilerplate` namespace to your project's namespace..
3. Add or remove features you are going to use.
4. Implement project specific styles.
5. Implement in your block(s) by providing necessary attributes.