# error-tailor-ionic-demo
An Ionic Angular app that demonstrates how to use [error-tailor](https://github.com/ngneat/error-tailor) library to handle form validation errors with a simple directive.

# How to use
- Clone the repository. `$ git clone https://github.com/harikvpy/error-tailor-ionic-demo.git`
- Install depedencies. `$ cd error-tailor-ionic-demo && npm i`
- Start the ionic dev server. `$ ionic serve`

# Notes
Making error-tailor work with ionic forms requires a few steps.

1. The default `blurPredicate` function has to be replaced with a custom implementation that would add custom error
   components to ionic fields. The sample implementation recognizes `ion-input` & `ion-select`. The tag names are
   in upper case. So if you create a custom input component, make sure you add it to this list and specify it's
   tag name in uppercase.

2. The default error component is replaced with a custom error component (`IonControlErrorComponent`) via the
   `controlErrorComponent` configuration. This component wraps each error message in an `ion-item`. This is to fit
   in with Ionic's default form layout which wraps each form field in an `ion-item`.

3. The error components HTML fragment is repositioned in the DOM such that each error message `ion-item` is
   poisitioned as a sibling of the field `ion-item`, which yields the best visual experience. This is achieved by
   providing a custom function to the `controlErrorComponentAnchorFn` error-tailor global config. This custom
   function places the error HTML fragment in the desired location via direct DOM manipulation. Finally, pay
   attention to the return value from this function -- it's yet another function that will be called when the
   error component is destroyed and can be used to remove the HTML element that was inserted earlier.

# Additional Stuff
The sampe code also shows how to write unit tests to verify that the error component is created when the relevant
form field detects a validation error. This is implemeted in `about.page.spec.ts`. Notably, this spec file relies
on [spectator](https://github.com/ngneat/spectator) package to implement the unit test.

The test looks like this:

```
  it('should set required error', fakeAsync(() => {
    const telephone = spectator.query<HTMLElement>('ion-input')
    typeInIonicInputAndFocusOut(telephone, '');
    spectator.tick();
    expect(getControlErrorIonItemText(telephone)).toEqual('This field is required');
  }));
```

The functions `typeInIonicInputAndFocusOut` and `getControlErrorIonItemText` are implemented in 
`src/testing/utils.spec.ts` which in turn use a few utility functions from `spectator`. The utility function
handles an input field, but the same model can be extended to manipulate other types of ionic input components.

As should be obvious from the script above, the test case deliberately enters an invalid value into a
field and then verifies that the error feedback element is created.
