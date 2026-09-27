import type { StudyKit } from '../types/study';

export const mockStudyKit: StudyKit = {
  id: 'kit-mock-01',
  topic: 'JavaScript Event Loop & Asynchronous Architecture',
  difficulty: 'Intermediate',
  createdAt: new Date().toISOString(),
  summary: {
    overview:
      'The JavaScript runtime environment uses a single-threaded event loop model combined with the Call Stack, Web APIs, Task Queue (Macrotasks), and Microtask Queue to coordinate non-blocking asynchronous operations.',
    keyTakeaways: [
      'Microtasks (Promises, queueMicrotask, MutationObserver) always run immediately after the current call stack clears, before any Macrotasks.',
      'Macrotasks (setTimeout, setInterval, setImmediate, I/O) are processed one at a time per event loop tick.',
      'The call stack must completely empty before the event loop pulls any task from queues to execute.',
      'Long-running synchronous computation blocks the main thread, freezing the UI and preventing render updates.'
    ],
    coreConcepts: [
      {
        term: 'Call Stack',
        definition: 'A LIFO (Last In, First Out) data structure that tracks function execution contexts in the V8 engine.'
      },
      {
        term: 'Microtask Queue',
        definition: 'High-priority task queue that is completely drained after each execution context and before rendering.'
      },
      {
        term: 'Task Queue (Macrotasks)',
        definition: 'Holds callbacks from browser Web APIs like setTimeout or DOM events, processed one item per tick.'
      },
      {
        term: 'Event Loop',
        definition: 'The continuous background coordinator checking if the stack is clear and pushing queued callbacks onto it.'
      }
    ],
    suggestedNextTopics: [
      'Web Workers & Off-main-thread Computation',
      'Async/Await Desugaring & Generator Functions',
      'V8 Garbage Collection Generational Hypothesis'
    ]
  },
  flashcards: [
    {
      id: 'fc-1',
      front: 'What is the priority difference between the Microtask Queue and the Macrotask Queue?',
      back: 'The Microtask Queue has higher priority. Once the call stack is empty, ALL microtasks are flushed to completion before the event loop picks up the next macrotask.',
      hint: 'Think about Promise.then vs setTimeout(..., 0)',
      tag: 'Core Mechanics'
    },
    {
      id: 'fc-2',
      front: 'What happens when a microtask schedules another microtask recursively?',
      back: 'It creates microtask starvation. The microtask queue will continuously process without returning control to the event loop, starving I/O and UI renders.',
      hint: 'Similar to an infinite loop in the microtask layer',
      tag: 'Edge Cases'
    },
    {
      id: 'fc-3',
      front: 'Are DOM layout and paint tasks considered microtasks or scheduled between ticks?',
      back: 'Browser rendering (rAF, style calculation, layout, paint) runs in the rendering pipeline between macrotasks, after all microtasks have resolved.',
      hint: 'Where does requestAnimationFrame fit?',
      tag: 'Browser Internals'
    },
    {
      id: 'fc-4',
      front: 'In what order will this execute: `console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);`?',
      back: 'Output: 1, 4, 3, 2. Synchronous code logs 1 and 4 first. Microtask (Promise) logs 3. Macrotask (setTimeout) logs 2.',
      hint: 'Sync execution -> Microtask queue -> Macrotask queue',
      tag: 'Code Tracing'
    }
  ],
  quiz: [
    {
      id: 'q-1',
      question: 'Which of the following operations enqueues a callback into the Microtask Queue?',
      options: [
        'setTimeout(callback, 0)',
        'Promise.resolve().then(callback)',
        'requestAnimationFrame(callback)',
        'setImmediate(callback)'
      ],
      correctIndex: 1,
      explanation: 'Promise resolution callbacks (.then, .catch, .finally) and queueMicrotask are queued into the microtask queue.'
    },
    {
      id: 'q-2',
      question: 'What happens if a synchronous function executes a heavy while-loop for 5 seconds?',
      options: [
        'Web APIs offload the loop to a background thread automatically',
        'Microtasks run concurrently in parallel',
        'The call stack remains blocked, freezing the UI and postponing all queued callbacks',
        'The browser converts the while-loop into a series of macrotasks'
      ],
      correctIndex: 2,
      explanation: 'JavaScript is single-threaded on the main execution thread. Heavy synchronous loops monopolize the call stack, halting UI rendering and event dispatching.'
    },
    {
      id: 'q-3',
      question: 'When does `requestAnimationFrame` callback execute relative to the event loop tick?',
      options: [
        'Immediately before the browser calculates styles, layout, and repaints the display',
        'After all setTimeout(..., 0) macrotasks in the queue have completed',
        'Inside the V8 garbage collector cycle',
        'Before any microtasks from the current execution context can run'
      ],
      correctIndex: 0,
      explanation: '`requestAnimationFrame` is invoked right before the browser performs layout and repaint, aligning animations with the display refresh rate.'
    }
  ]
};

export const sampleTopics = [
  'JavaScript Event Loop & Microtasks',
  'HTTP/2 vs HTTP/3 & QUIC Protocol',
  'React Reconciliation & Virtual DOM',
  'CSS Grid vs Flexbox Deep Dive'
];
