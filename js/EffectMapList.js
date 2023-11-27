const effectMapList = new Map([
  [
    'original',
    {
      connect: true,
      start: [0, 1],
      step: 0.1,
      range: {
        min: 0,
        max: 1
      }
    }
  ],
  [
    'grayscale',
    {
      connect: true,
      start: [0, 1],
      step: 0.1,
      range: {
        min: 0,
        max: 1
      }
    }
  ],
  [
    'sepia',
    {
      connect: true,
      start: [0, 1],
      step: 0.1,
      range: {
        min: 0,
        max: 1
      }
    }
  ],
  [
    'invert',
    {
      connect: true,
      start: [0, 100],
      step: 1,
      range: {
        min: 0,
        max: 100
      }
    }
  ],
  [
    'blur',
    {
      connect: true,
      start: [0, 3],
      step: 0.1,
      range: {
        min: 0,
        max: 3
      }
    }
  ],
  [
    'brightness',
    {
      connect: true,
      start: [1, 3],
      step: 0.10,
      range: {
        min: 1,
        max: 3
      }
    }
  ]
]);

export default effectMapList;
