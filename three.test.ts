import { Matrix4, Vector3, Quaternion } from 'three';

import { performance, PerformanceObserver } from 'perf_hooks';

const m = new Matrix4();
const t = new Vector3(0, 0, 0);
const r = new Quaternion(1, 0, 0, 0);
const s = new Vector3(1, 1, 1);
const vecs: Vector3[] = [];
const N = 100000;
const durs: number[] = [];

const obs = new PerformanceObserver(items => {
  const entries = items.getEntriesByName('dur');
  if (entries[0]) {
    durs.push(entries[0].duration);
  }
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

beforeEach(() => {
  for (let i = 0; i < N; i++) {
    vecs[i] = new Vector3(1, 2, 3);
  }
});
afterEach(() => {
  const ave = durs.reduce((p, c) => c + p, 0) / N;
  console.log(ave);
  durs.length = 0;
});

test('apply directly', () => {
  vecs.forEach(v => {
    performance.mark('start');
    v.applyQuaternion(r);
    performance.mark('end');
    performance.measure('dur', 'start', 'end');
  });
  expect(durs).toHaveLength(N);
});

test('apply matrix', () => {
  vecs.forEach(v => {
    performance.mark('start');
    m.compose(t, r, s);
    v.applyMatrix4(m);
    performance.mark('end');
    performance.measure('dur', 'start', 'end');
    m.makeTranslation(0, 0, 0);
  });
  expect(durs).toHaveLength(N);
});
