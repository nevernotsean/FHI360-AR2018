import { TweenMax } from 'gsap';
import isIEcheck from '../isIE';

var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var is_Edge = window.navigator.userAgent.indexOf('Edge') > -1;
var isIE = isIEcheck();

function drawLines(selector, t = 0.25) {
  return TweenMax.fromTo(selector, t, { drawSVG: '0%' }, { drawSVG: '100%', immediateRender: true });
}

function staggerDraw(selector, stagger = 0.1, t = 0.25) {
  return TweenMax.staggerFromTo(selector, t, { drawSVG: '0%' }, { drawSVG: '100%', immediateRender: true }, stagger);
}

function fadeIn(selector, stagger = 0.1, t = 0.25) {
  return TweenMax.staggerFromTo(selector, t, { opacity: 0 }, { opacity: 1, immediateRender: true }, stagger);
}

export const hl1 = () => {
  var lineIn = TweenMax.fromTo(
    '[data-anim="hl1"]  svg #curve',
    0.5,
    { drawSVG: '0%' },
    { drawSVG: '100%', immediateRender: true }
  );

  var tl = new TimelineLite({
    delay: 1,
    paused: true,
    easing: Power4.easeInOut,
    onUpdate: () => console.log('running')
  });

  tl.add(lineIn);

  if (window.innerWidth > 1024 && !is_safari && !is_Edge && !isIE) {
    tl.add(
      TweenMax.staggerFromTo(
        '[data-anim="hl1"] svg #circles > path, [data-anim="hl1"] svg #circles > circle',
        0.1,
        {
          scale: 0,
          transformOrigin: 'center'
        },
        {
          scale: 1
        },
        0.005
      )
    );
  } else {
    tl.add(
      TweenMax.from('[data-anim="hl1"] svg #circles', 0.5, {
        opacity: 0,
        transformOrigin: 'center'
      })
    );
  }

  return tl;
};
export const hl2 = () => {
  var tl = new TimelineLite({
    delay: 1,
    paused: true
  });

  tl.add(staggerDraw('[data-anim="hl2"] svg .tree'));
  tl.add(staggerDraw('[data-anim="hl2"] svg .building'), 0.2);
  tl.add(staggerDraw('[data-anim="hl2"] svg .window'), 0.05);
  tl.add(drawLines('[data-anim="hl2"] svg .bell'));
  tl.add(drawLines('[data-anim="hl2"] svg .tower, svg .tower-2, svg .tower-3'));

  return tl;
};
export const hl3 = () => {
  var drawIcons = TweenMax.staggerFromTo(
    '[data-anim="hl3"] svg #icon1, [data-anim="hl3"] svg #icon3, [data-anim="hl3"] svg #icon2',
    0.25,
    { scale: 0, transformOrigin: 'center' },
    { scale: 1, immediateRender: true },
    0.1
  );

  var tl = new TimelineLite({
    delay: 1,
    paused: true
  });

  tl.add(fadeIn('[data-anim="hl3"] svg #fadein'));
  tl.add(staggerDraw('[data-anim="hl3"] svg #circle1, [data-anim="hl3"] svg #circle3, [data-anim="hl3"] svg #circle2'));
  tl.add(drawIcons);

  return tl;
};
export const hl4 = () => {
  var fadeLinesOut = TweenMax.fromTo(
    '[data-anim="hl4"] svg rect, svg #road, [data-anim="hl4"] svg #motorcyle',
    1,
    { opacity: 1, transformOrigin: 'center' },
    { opacity: 0, immediateRender: true }
  );

  var fadeGradientOut = TweenMax.fromTo(
    '[data-anim="hl4"] .inner-grandient',
    1,
    { opacity: 1, transformOrigin: 'center' },
    { opacity: 0.5, immediateRender: true }
  );

  var playVideo = () => {
    $('[data-anim="hl4"] video')[0].play();
    $('[data-anim="hl4"] video')[0].onended = () =>
      TweenMax.to('[data-anim="hl4"] .inner-grandient', 1, { opacity: 1, immediateRender: true });
  };

  var tl = new TimelineLite({
    delay: 1,
    paused: true
  });

  $('[data-anim="hl4"] video')[0].currentTime = 0;

  tl.add(staggerDraw('[data-anim="hl4"] svg #road > *'), 0.1, 0.5);
  tl.add(drawLines('[data-anim="hl4"] svg #motorcyle > *'), 0.1, 0.5);

  tl.add(fadeLinesOut, '+=0.5');
  tl.add(fadeGradientOut, '-=1');
  tl.call(playVideo, null, null, '-=0.5');

  return tl;
};
