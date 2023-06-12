---
name: Bug report
about: Create a report to help us improve
title: "Higher calculations failure"
labels: "Application failure, incorrect output, syntax error"
assignees: "Alex Quan"
---

**Describe the bug**
The application is failing whenever a value of 1000 or greater is used in the calculation. The calculation will either calculate incorrectly or throw a syntax error.\_

Error Message:
Uncaught SyntaxError: Octal literals are not allowed in strict mode.
at evaluateExpression (CalculatorProvider.tsx:90:22)
at handleKeyPress (CalculatorProvider.tsx:108:9)
at onClick (Keyboard.tsx:40:22)
at HTMLUnknownElement.callCallback (react-dom.development.js:4164:1)
at Object.invokeGuardedCallbackDev (react-dom.development.js:4213:1)
at invokeGuardedCallback (react-dom.development.js:4277:1)
at invokeGuardedCallbackAndCatchFirstError (react-dom.development.js:4291:1)
at executeDispatch (react-dom.development.js:9041:1)
at processDispatchQueueItemsInOrder (react-dom.development.js:9073:1)
at processDispatchQueue (react-dom.development.js:9086:1)
at dispatchEventsForPlugins (react-dom.development.js:9097:1)
at eval (react-dom.development.js:9288:1)
at batchedUpdates$1 (react-dom.development.js:26140:1)
at batchedUpdates (react-dom.development.js:3991:1)
at dispatchEventForPluginEventSystem (react-dom.development.js:9287:1)
at dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay (react-dom.development.js:6465:1)
at dispatchEvent (react-dom.development.js:6457:1)
at dispatchDiscreteEvent (react-dom.development.js:6430:1)

Example Issues:
example: (1 \* 1000) throws error and does not attempt calculation.
example: (1500 + 2 = 502) - (incorrect and does not throw error).
example: 1000 / 2 throws error and does not attempt calculation.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to 'DOM'
2. Click on 'calculate using values higher than 1000'
3. Check console log for error or view incorrect calculation displayed.
4. See error

**Expected behavior**
Expected calculation of 1500 + 2 to equal 1502 and instead received 502 as the output.
Expected calculation of 1000 / 2 to equal 500 and instead received a syntax error and no output.

**Screenshots**
If applicable, add screenshots to help explain your problem.
![](.github\ISSUE_TEMPLATE\Calculator_error-2023_06_12.png)

**Desktop (please complete the following information):**

- OS: [windows]
- Browser [chrome]
- Version [12]

**Smartphone (please complete the following information):**

- Device: [e.g. iPhone6]
- OS: [e.g. iOS8.1]
- Browser [e.g. stock browser, safari]
- Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
