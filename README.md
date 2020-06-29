# error-tailor-ionic-demo
An Ionic Angular app that demonstrates how to use [error-tailor](https://github.com/ngneat/error-tailor) library to handle form validation errors with a simple directive.

# How to use
- clone the repository
- cd into `error-tailor-ionic-demo` and issue `npm install`
- `ionic serve`

# Notes
Making error-tailor work with ionic forms requires a few steps.

1. The default `blurPredicate` function has to be replaced with a custom implementation that would add custom error
   components to ionic fields. The sample implementation recognizes `ion-input` & `ion-select`.

2. The default error component is replaced with a custom error component (`IonControlErrorComponent`) via the
   `controlErrorComponent` configuration. This component wraps each error message in an `ion-item`. This is to fit
   in with Ionic's default form layout which wraps each form field in an `ion-item`.

3. The error components HTML fragment is repositioned in the DOM such that each error message `ion-item` is
   poisitioned as a sibling of the field `ion-item`, which yields the best visual experience. This is achieved by
   providing a custom function to the `controlErrorComponentAnchorFn` error-tailor global config. This custom
   function places the error HTML fragment in the desired location via direct DOM manipulation. Finally, pay
   attention to the return value from this function -- it's yet another function that will be called when the
   error component is destroyed and can be used to remove the HTML element that was inserted earlier.
