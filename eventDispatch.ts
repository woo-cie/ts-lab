import * as three from 'three';

class C extends three.EventDispatcher {
  f() {
    console.log('a');
    this.dispatchEvent({ type: 'hoge' });
    console.log('b');
  }
}

const t = new C();
t.addEventListener('hoge', () => {
  console.log('c');
});

t.f();
