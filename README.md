# error-tailor-ionic-demo
An Ionic Angular app that demonstrates how to use [error-tailor](https://github.com/ngneat/error-tailor) library to handle form validation errors with a simple directive.

# How to use
- clone the repository
- cd into `error-tailor-ionic-demo` and issue `npm install`
- `ionic serve`

Look at `app.module.ts` to see how `error-tailor` is initialized to use `IonControlErrorComponent` - a custom control error component that replaces the `DefaultControlErrorComponent`. This component wraps error messages in `ion-item` and places them as sibling of the form field `ion-item` element using DOM manipulation. This is achieved by providing a custom function to the `controlErrorComponentAnchorFn` error-tailor global config. Pay attention to the return value from this function -- it's yet another function that will be called when the error component is destroyed and can be used to remove the HTML element that was inserted earlier.

Note that this layout is based on Ionic's form sample layouts where each a form field is placed in an `ion-item` all of which are wrapped in an `ion-list`.
