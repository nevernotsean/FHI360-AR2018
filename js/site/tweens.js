import { TweenMax } from 'gsap';

function drawLines(selector, t = 0.25) {
  return TweenMax.fromTo(selector, t, { drawSVG: '0%' }, { drawSVG: '100%', immediateRender: true });
}

function staggerDraw(selector, stagger = 0.1, t = 0.25) {
  return TweenMax.staggerFromTo(selector, t, { drawSVG: '0%' }, { drawSVG: '100%', immediateRender: true }, stagger);
}

function fadeIn(selector, stagger = 0.1, t = 0.25) {
  return TweenMax.staggerFromTo(selector, t, { opacity: 0 }, { opacity: 1, immediateRender: true }, stagger);
}

export default {
  hl1: () => {
    var circlesIn = TweenMax.staggerFromTo(
      'svg #circles > *',
      0.1,
      {
        scale: 0,
        transformOrigin: 'center',
        easing: 'Power4.easeInOut'
      },
      {
        scale: 1
      },
      0.005
    );

    var lineIn = TweenMax.fromTo('svg #curve', 0.5, { drawSVG: '0%' }, { drawSVG: '100%', immediateRender: true });

    var tl = new TimelineLite({
      delay: 1,
      paused: true
    });

    tl.add(lineIn);
    tl.add(circlesIn);

    return tl;
  },
  hl2: () => {
    var tl = new TimelineLite({
      delay: 1,
      paused: true
    });

    tl.add(staggerDraw('svg .tree'));
    tl.add(staggerDraw('svg .building'), 0.2);
    tl.add(staggerDraw('svg .window'), 0.05);
    tl.add(drawLines('svg .bell'));
    tl.add(drawLines('svg .tower, svg .tower-2, svg .tower-3'));

    return tl;
  },
  hl3: () => {
    var drawIcons = TweenMax.staggerFromTo(
      'svg #icon1, svg #icon3, svg #icon2',
      0.25,
      { scale: 0, transformOrigin: 'center' },
      { scale: 1, immediateRender: true },
      0.1
    );

    var tl = new TimelineLite({
      delay: 1,
      paused: true
    });

    tl.add(fadeIn('svg #fadein'));
    tl.add(staggerDraw('svg #circle1, svg #circle3, svg #circle2'));
    tl.add(drawIcons);

    return tl;
  },
  hl4: () => {
    var fadeLinesOut = TweenMax.fromTo(
      'svg rect, svg #road, svg #motorcyle',
      1,
      { opacity: 1, transformOrigin: 'center' },
      { opacity: 0, immediateRender: true }
    );

    var tl = new TimelineLite({
      delay: 1,
      paused: true
    });

    tl.add(staggerDraw('svg #road > *'), 0.1, 0.5);
    tl.add(drawLines('svg #motorcyle > *'), 0.1, 0.5);

    tl.add(fadeLinesOut, '+=0.5');

    return tl;
  }
};
